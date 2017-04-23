DROP DATABASE IF EXISTS usersdb;
CREATE DATABASE usersdb;

\c usersdb;

-- Define a schema
CREATE TABLE users(
  ID SERIAL PRIMARY KEY,
  username VARCHAR,
  password VARCHAR,
  email VARCHAR
);

INSERT INTO users (username, password, email)
  VALUES ('cjhong6', '5537','aa@sfsu.edu');
