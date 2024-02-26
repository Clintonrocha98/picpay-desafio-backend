import pg from "pg";

const pool = new pg.Pool({
  host: process.env.TEST_POSTGRE_HOST || process.env.POSTGRE_HOST,
  port: 5432,
  user: process.env.TEST_POSTGRE_USER || process.env.POSTGRE_USER,
  password: process.env.TEST_POSTGRE_PASSWORD || process.env.POSTGRE_PASSWORD,
  database: process.env.TEST_POSTGRE_DATABASE || process.env.POSTGRE_DATABASE,
});
const createTables = async () => {
  try {
    const tables = `
    BEGIN;
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
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
        amount INT NOT NULL,
        date_transaction TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (payer) REFERENCES users(id),
        FOREIGN KEY (payee) REFERENCES users(id)
      );
    COMMIT;
    `;
    await pool.query(tables);
    console.log("Tabelas criadas com sucesso");
  } catch (error) {
    console.log("Problema ao criar as tabelas");
    console.error(error);
  }
};

await createTables();

export { pool };
