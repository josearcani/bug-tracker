require('dotenv').config();

// eslint-disable-next-line no-undef
module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "xqxymkrjqkzara",
    "password": "4f23f23da8bbeb21c61df4341a848e6ba4a4f8e6d174e948bb05f50931fc848d",
    "database": "db2g3dbbkc6qtc",
    "host": "ec2-52-73-155-171.compute-1.amazonaws.com",
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
          "require": true,
          "rejectUnauthorized": false
      }
    }
  }
}
