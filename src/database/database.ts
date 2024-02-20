import pg, { Pool } from "pg";

let pool: Pool;

// if (process.env.NODE_ENV === "test") {
//   console.log("entrou aqui");
//   pool = new pg.Pool({
//     host: process.env.TEST_POSTGRE_HOST,
//     port: 5432,
//     user: process.env.TEST_POSTGRE_USER,
//     password: process.env.TEST_POSTGRE_PASSWORD,
//     database: process.env.TEST_POSTGRE_DATABASE,
//   });
// } else {
//   console.log("aaa");
//   pool = new pg.Pool({
//     host: process.env.POSTGRE_HOST,
//     port: 5432,
//     user: process.env.POSTGRE_USER,
//     password: process.env.POSTGRE_PASSWORD,
//     database: process.env.POSTGRE_DATABASE,
//   });
// }
pool = new pg.Pool({
  host: process.env.TEST_POSTGRE_HOST || process.env.POSTGRE_HOST,
  port: 5432,
  user: process.env.TEST_POSTGRE_USER || process.env.POSTGRE_USER,
  password: process.env.TEST_POSTGRE_PASSWORD || process.env.POSTGRE_PASSWORD,
  database: process.env.TEST_POSTGRE_DATABASE || process.env.POSTGRE_DATABASE,
});
const createUsersTable = async () => {
  try {
    const createTableUsers = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        fristName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        document VARCHAR(14) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        balance INT,
        userType VARCHAR(7) NOT NULL
    )`;
    await pool.query(createTableUsers);
    console.log("Tabela users criada com sucesso");
  } catch (error) {
    console.log("Problema ao criar a tabela users");
    console.error(error);
  }
};
const createTransactionsTable = async () => {
  try {
    const createTableTransactions = `
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        payer INT NOT NULL,
        payee INT NOT NULL,
        amount NUMERIC(10, 2) NOT NULL,
        date_transaction TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (payer) REFERENCES users(id),
        FOREIGN KEY (payee) REFERENCES users(id)
      )`;
    await pool.query(createTableTransactions);
    console.log("Tabela transactions criada com sucesso");
  } catch (error) {
    console.log("Problema ao criar a tabela transactions");
    console.error(error);
  }
};

createUsersTable();
createTransactionsTable();

export { pool };
