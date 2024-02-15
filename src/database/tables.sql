BEGIN;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  fristName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  document VARCHAR(14) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  balance INT,
  userType VARCHAR(7) NOT NULL
);

CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  payer INT NOT NULL,
  payee INT NOT NULL,
  transfer_value NUMERIC(10, 2) NOT NULL,
  data_transacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (payer) REFERENCES users(id),
  FOREIGN KEY (payee) REFERENCES users(id)
);

COMMIT;