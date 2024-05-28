const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
const ATM_DATA = require('./atm_data');
const dzongkhag = require('./dzongkhag');
const bank = require('./bank');

dotenv.config();

const creator_id = {
  BOB: '32a3bad2-4a7c-4647-8ba9-b8a89e4fb502',
  BNB: 'f0a37b53-8790-40c7-b1ee-c7e849916d53',
  TB: 'a0acc5c7-2c67-4f9c-89f0-4beb5cb6ffb0',
  DK: 'cfb8fba1-aff6-4d6c-b997-fe09b868d462',
  BDBL: '8f9273e6-2f77-4db0-9c04-bd0955108815',
  DPNB: 'fec446f7-b6b0-47c9-8d6b-96a0957a7f35',
};

let currentMaxId = 1000;

const seedAtmData = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    for (const atm of ATM_DATA.features) {
      currentMaxId += 1;
      const customPrefix = 'ATM_';
      const nextAutoIncrementedId = currentMaxId;
      const customId = `${customPrefix}${nextAutoIncrementedId}`;
      const bankCategory = bank[Math.floor(Math.random() * bank.length)];
      const dzong = dzongkhag[Math.floor(Math.random() * dzongkhag.length)];

      await connection.query(
        'INSERT INTO atm_details (id, location_name, name, gewog, dzongkhag, bank_category, email, website, phone, latitude, longitude, service_status, custom_time, creator_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [
          customId,
          'Thimphu Babesa',
          atm.properties.name,
          dzong,
          dzong,
          bankCategory,
          'example@gmail.com', // Replace with your actual email
          atm.properties.website,
          atm.properties.phone,
          atm.geometry.coordinates[1],
          atm.geometry.coordinates[0],
          atm.properties.hours,
          null,
          creator_id[bankCategory],
        ]
      );

      console.log(`Inserted ATM with ID: ${customId}`);
    }

    console.log('Seeding complete.');
  } catch (error) {
    console.error('Error seeding ATM data:', error);
  } finally {
    await connection.end();
  }
};

seedAtmData();
