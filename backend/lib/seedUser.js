const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const seedData = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const seedUsers = [
    {
      id: uuidv4(),
      username: 'user1',
      password: 'password1', 
      bank: 'BOB',
      created_at: new Date(),
    },
    {
      id: uuidv4(),
      username: 'user2',
      password: 'password2', 
      bank: 'BNB',
      created_at: new Date(),
    },
  ];

  // Hash passwords
  for (let user of seedUsers) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  try {
    // Insert users
    await connection.query('INSERT INTO users (id, username, password, bank, created_at) VALUES ?', [seedUsers.map(user => [user.id, user.username, user.password, user.bank, user.created_at])]);
    
    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await connection.end();
  }
};

seedData();
