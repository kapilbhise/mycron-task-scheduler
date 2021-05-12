-- CREATE DATABASE perntodo;

--\c perntodo

CREATE TABLE task(
  task_id SERIAL PRIMARY KEY,
  description VARCHAR(255),
  schedule VARCHAR(255)
); 