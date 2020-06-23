const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(
  "./resumedb.sqlite",
  (err) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log("Connected to resumedb SQlite database");
  },
);
//create database tables/execute dbSchema

const dbSchema = `CREATE TABLE IF NOT EXISTS users (
    id integer NOT NULL PRIMARY KEY,
    username text NOT NULL UNIQUE,
    password text NOT NULL,
    email text NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS projects (
    id integer NOT NULL PRIMARY KEY,
    title text NOT NULL,
    description text NOT NULL
);

CREATE TABLE IF NOT EXISTS blogs (
    id integer NOT NULL PRIMARY KEY,
    title text NOT NULL,
    author text NOT NULL,
    content text NOT NULL,
    posted_on datetime default current_timestamp
);

`;
db.exec(dbSchema, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("tables are created");
});
//close database

db.close((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Database is closed.");
});
module.exports = dbSchema;
