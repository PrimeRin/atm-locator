// const ATM_DATA = require("./atm_data");
// const dzongkhag = require("./dzongkhag");
// const bank = require("./bank");

// const creator_id = {
//   BOB: "32a3bad2-4a7c-4647-8ba9-b8a89e4fb502",
//   BNB: "f0a37b53-8790-40c7-b1ee-c7e849916d53",
//   TB: "a0acc5c7-2c67-4f9c-89f0-4beb5cb6ffb0",
//   DK: "cfb8fba1-aff6-4d6c-b997-fe09b868d462",
//   BDBL: "8f9273e6-2f77-4db0-9c04-bd0955108815",
//   DPNB: "fec446f7-b6b0-47c9-8d6b-96a0957a7f35",
// };

// var currentMaxId = 1000

// router.get("/seed-atm", async (req, res) => {
//   ATM_DATA.features.forEach(async (atm) => {
//     currentMaxId = currentMaxId + 1;
//     const customPrefix = "ATM_";
//     const nextAutoIncrementedId = parseInt(currentMaxId) + 1;
//     const customId = `${customPrefix}${nextAutoIncrementedId}`;
//     const bankCategory = bank[Math.floor(Math.random() * bank.length)];
//     const dzong = dzongkhag[Math.floor(Math.random() * dzongkhag.length)];
//     await db.query(
//       "INSERT INTO atm_details (id, name, gewog, dzongkhag, bank_category, email, website, phone, latitude, longitude, service_status, creator_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
//       [
//         customId,
//         atm.properties.name,
//         dzong,
//         dzong,
//         bankCategory,
//         "BOB@gmail.com",
//         atm.properties.website,
//         atm.properties.phone,
//         atm.geometry.coordinates[1],
//         atm.geometry.coordinates[0],
//         atm.properties.hours,
//         creator_id[bankCategory],
//       ]
//     );

//     console.log(`Inserted ATM with ID: ${customId}`);
//   });

//   res.send("Seeding complete.");
// });


// router.post("/register", async (req, res, next) => {
//   const userId = uuidv4();
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const { username, bank } = req.body;

//     const result = await db.query(
//       "INSERT INTO users (id,username, password, bank) VALUES (?,?,?,?)",
//       [userId,username, hashedPassword, bank]
//     );

//     if (result.affectedRows > 0) {
//       res.status(201).json({ message: "User registered successfully" });
//     } else {
//       res.status(400).json({ message: "Registration failed" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An error occurred during registration" });
//   }
// });