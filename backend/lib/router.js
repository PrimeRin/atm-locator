const express = require("express");
const router = express.Router();
const db = require("./database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

async function authenticateUser(username, password) {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE username =?", [username]);
    if (rows.length === 0) {
      throw new Error("No user found");
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    return match;
  } catch (error) {
    throw error; 
  }
}

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const isValid = await authenticateUser(username, password);
    if (!isValid) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username: username }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    res.status(200).json({ success: true, message: "success", token: token });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

router.get("/atm_count", authenticateJWT, async (req, res) => {
  const type = req.query.type;

  let sql;

  if (type === "bank") {
    sql = `SELECT bank_category, COUNT(*) AS count
            FROM atm_details
            GROUP BY bank_category`;
  } else if (type === "dzongkhag") {
    sql = `SELECT dzongkhag, COUNT(*) AS count
            FROM atm_details
            GROUP BY dzongkhag`;
  } else {
    return res.status(400).json({ error: "Invalid type!!!" });
  }

  try {
    const [results] = await db.query(sql);
    return res.json(results);
  } catch (err) {
    console.error(err);
    return res
     .status(500)
     .json({ error: "An error occurred while fetching ATM information" });
  }
});
 
router.get("/query_atm", authenticateJWT, async (req, res) => {
  const { search, filter, dzongkhag, page = 1, pageSize = 10 } = req.query;

  const pageNum = parseInt(page, 10);
  const size = parseInt(pageSize, 10);
  const offset = (pageNum - 1) * size;
  const filterList = filter ? filter.split(",").map((item) => item.trim()) : [];

  try {
    let sqlQuery = "SELECT * FROM atm_details WHERE 1=1";
    let queryParams = [];

    if (search) {
      sqlQuery += " AND id LIKE ?";
      queryParams.push(`%${search}%`);
    }

    if (dzongkhag) {
      sqlQuery += " AND dzongkhag = ?";
      queryParams.push(dzongkhag);
    }

    if (filterList.length > 0) {
      const placeholders = filterList.map(() => '?').join(',');
      sqlQuery += ` AND dzongkhag IN (${placeholders})`;
      queryParams.push(...filterList);
    }

    sqlQuery += " LIMIT ? OFFSET ?";
    queryParams.push(size, offset);

    console.log(sqlQuery, queryParams);

    const [result] = await db.query(sqlQuery, queryParams);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: "An error occurred during the search." });
  }
});

router.get("/admin-atm-list/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    const [results] = await db.query("SELECT * FROM atm_details WHERE id =?", [id]);
    return res.json(results[0]);
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while fetching ATM information" });
  }
});

router.get("/atm_list", async (req, res) => {
  const { dzongkhag, page, limit = 10 } = req.query;
  let offset = (parseInt(page) - 1) * parseInt(limit);
  let sql = "SELECT * FROM atm_details";

  if (dzongkhag) {
    sql += " WHERE dzongkhag =?"; 
  }
  sql += ` LIMIT ${offset}, ${limit}`;

  try {
    const [rows] = await db.query(sql, [dzongkhag]);
    const hasMore = rows.length === 10;
    return res.json({data: rows, hasMore: hasMore});
  } catch (err) {
    return res.status(500).json({ error: "An error occurred while fetching ATM information" });
  }
});

async function generateAtmId() {
  try {
    const result = await db.query("SELECT max(id) AS max_id FROM atm_details;");

    if (result[0].length > 0) {
      const maxId = result[0][0].max_id;
      const numericPart = parseInt(maxId.slice(4), 10);
      const newNumericPart = numericPart + 1;
      const newAtmId = `ATM_${newNumericPart.toString().padStart(3, '0')}`;

      return newAtmId;
    } else {
      return 'ATM_001';
    }
  } catch (error) {
    return null;
  }
}

router.post("/create-atm", authenticateJWT, async (req, res) => {
  try {
    const { name, location_name, dzongkhag, gewog, website, phone, email, service_status, custom_time, latitude, longitude } = req.body;

    if (!name ||!dzongkhag ||!gewog ||!website ||!phone ||!email ||!service_status ||!latitude ||!longitude ||!location_name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const username = req.user.username;
    const id = await generateAtmId();

    const creatorResult = await db.query("SELECT id, bank FROM users WHERE username=?", [username]);

    if (creatorResult.length === 0) {
      return res.status(404).json({ message: "Creator not found" });
    }
    const creator = creatorResult[0];

    const insertResult = await db.execute(
      "INSERT INTO atm_details (id, name, dzongkhag, gewog, bank_category, website, phone, email, service_status, latitude, longitude, location_name, custom_time, creator_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [id, name, dzongkhag, gewog, creator[0].bank, website, phone, email, service_status, latitude, longitude, location_name, custom_time, creator[0].id]
    );

    if (insertResult[0].affectedRows > 0) {
      res.status(200).json({ message: "ATM created successfully" });
    } else {
      res.status(400).json({ message: "ATM creation failed" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred during creation" });
  }
});

router.put("/update-atm/:id", authenticateJWT, async (req, res) => {
  try {
    const atmId = req.params.id;
    const {
      name,
      location_name,
      dzongkhag,
      gewog,
      website,
      phone,
      email,
      service_status,
      custom_time,
      latitude,
      longitude,
    } = req.body;

    if (
      !name ||
      !dzongkhag ||
      !gewog ||
      !website ||
      !phone ||
      !email ||
      !service_status ||
      !latitude ||
      !longitude ||
      !location_name
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const username = req.user.username;

    const creatorResult = await db.query("SELECT id, bank FROM users WHERE username=?", [username]);

    if (creatorResult.length === 0) {
      return res.status(404).json({ message: "Creator not found" });
    }
    const creator = creatorResult[0];

    const updateResult = await db.execute(
      "UPDATE atm_details SET name=?, dzongkhag=?, gewog=?, bank_category=?, website=?, phone=?, email=?, service_status=?, latitude=?, longitude=?, location_name=?, custom_time=?, creator_id=? WHERE id=?",
      [
        name,
        dzongkhag,
        gewog,
        creator[0].bank,
        website,
        phone,
        email,
        service_status,
        latitude,
        longitude,
        location_name,
        custom_time,
        creator[0].id,
        atmId,
      ]
    );

    if (updateResult[0].affectedRows > 0) {
      res.status(200).json({ message: "ATM updated successfully" });
    } else {
      res.status(400).json({ message: "ATM update failed" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred during the update" });
  }
});

router.delete('/atms/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAtm = await db.query('DELETE FROM atm_details WHERE id =?', [id]);

    if (deletedAtm.affectedRows > 0) {
      res.status(200).json({ message: 'ATM deleted successfully' });
    } else {
      res.status(404).json({ message: 'ATM not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
