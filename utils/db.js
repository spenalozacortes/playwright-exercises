import mysql from 'mysql2/promise';
import 'dotenv/config';

export const connectToDB = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 2250,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  return connection;
};
