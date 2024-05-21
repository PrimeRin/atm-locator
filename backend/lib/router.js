const express = require("express");
const router = express.Router();
const db = require("./database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

async function authenticateUser(username, password) {
  return new Promise(async (resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE username =?",
      [username],
      async (error, results) => {
        if (error) reject(error);

        if (results.length === 0) {
          reject(new Error("No user found"));
          return;
        }

        const user = results[0];

        try {
          const match = await bcrypt.compare(password, user.password);
          resolve(match);
        } catch (hashError) {
          reject(hashError);
        }
      }
    );
  });
}

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  debugger;
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
    console.error(error);
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

router.get("/atm_count", authenticateJWT, (req, res) => {
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

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching ATM information" });
    }
    return res.json(results);
  });
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
      sqlQuery += " AND (name LIKE?)";
      queryParams.push(`%${search}%`);
    }

    if (filterList.length > 0) {
      sqlQuery +=
        " AND dzongkhag IN (" + filterList.map((_, i) => "?").join(",") + ")";
      queryParams.push(...filterList);
    }

    // Correctly separate LIMIT and OFFSET with spaces
    sqlQuery += " LIMIT ? OFFSET ?";
    queryParams.push(size, offset);

    console.log(sqlQuery, queryParams);

    db.query(sqlQuery, queryParams, (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "An error occurred while fetching ATM information" });
      }
      return res.json(result[0]);
    });
  } catch (error) {
    res.status(500).send("An error occurred during the search.");
  }
});

router.get("/admin-atm-list/:id", async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM atm_details WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching ATM information" });
    }
    return res.json(results[0]);
  });
});

router.get("/atm_list", (req, res) => {
  const { dzongkhag, page, limit = 10 } = req.query;
  let offset = 0;

  if (!page) {
    let sql = `SELECT * FROM atm_details`;
    let params = [];

    if (dzongkhag) {
      sql += ` WHERE dzongkhag = ?`;
      params = [dzongkhag];
    }

    db.query(sql, params, (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "An error occurred while fetching ATM information" });
      }
      return res.json(result);
    });
  } else {
    offset = (parseInt(page) - 1) * limit;
    let sql = `SELECT * FROM atm_details LIMIT ? OFFSET ?`;
    let params = [limit, offset];

    if (dzongkhag) {
      sql = `SELECT * FROM atm_details WHERE dzongkhag = ? LIMIT ? OFFSET ?`;
      params = [dzongkhag, limit, offset];
    }

    db.query(sql, params, (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "An error occurred while fetching ATM information" });
      }

      const hasMore = result.length === parseInt(limit);
      return res.json({
        data: result,
        hasMore: hasMore,
      });
    });
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
    console.error("Error generating ATM ID:", error); 
    return null;
  }
}

router.post("/create-atm", authenticateJWT, async (req, res) => {
  try {
    const { name, location_name, dzongkhag, gewog, website, phone, email, service_status, custom_time, latitude, longitude } = req.body;

    if (!name ||!dzongkhag ||!gewog ||!website ||!phone ||!email ||!service_status ||!latitude ||!longitude) {
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
      "INSERT INTO atm_details (id, name, dzongkhag, gewog, bank_category, website, phone, email, service_status, latitude, longitude, creator_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
      [id, name, dzongkhag, gewog, creator[0].bank, website, phone, email, service_status, latitude, longitude, creator[0].id]
    );

    if (insertResult[0].affectedRows > 0) {
      res.status(201).json({ message: "ATM created successfully" });
    } else {
      res.status(400).json({ message: "ATM creation failed" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred during creation" });
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
    console.error('Error deleting ATM:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
