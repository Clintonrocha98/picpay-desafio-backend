BEGIN;

CREATE TABLE users (
  id_user SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  cpf VARCHAR(14),
  cnpj VARCHAR(18),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE roles (
  id_role SERIAL PRIMARY KEY,
  name_role VARCHAR(100) NOT NULL
);

INSERT INTO
  roles (name_role)
VALUES
  ("comum");

INSERT INTO
  roles (name_role)
VALUES
  ("lojista");

CREATE TABLE users_roles (
  id_user INTEGER REFERENCES users(id_user) DEFERRABLE INITIALLY DEFERRED,
  id_role INTEGER REFERENCES roles(id_role) DEFERRABLE INITIALLY DEFERRED,
  PRIMARY KEY (id_user, id_role)
);

COMMIT;