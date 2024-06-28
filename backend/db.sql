CREATE DATABASE taskapp;

CREATE TABLE task (
    id VARCHAR(255) PRIMARY KEY,
    u_email VARCHAR(255),
    title VARCHAR(30),
    completeness INT,
    date VARCHAR(300),
    description VARCHAR(300)
);

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255),
    username VARCHAR(255)
);