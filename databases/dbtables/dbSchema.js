const dbSchema = `CREATE TABLE IF NOT EXISTS users (
    id integer NOT NULL PRIMARY KEY,
    username text NOT NULL UNIQUE,
    password text NOT NULL,
    email text NOT NULL UNIQUE,
    firstname text NOT NULL,
    lastname text NOT NULL
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

`

module.exports = dbSchema