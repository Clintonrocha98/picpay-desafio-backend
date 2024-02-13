import pg from "pg";
import fs from "fs";

const pool = new pg.Pool({
  host: process.env.POSTGRE_HOST,
  port: 5432,
  user: process.env.POSTGRE_USER,
  password: process.env.POSTGRE_PASSWORD,
  database: process.env.POSTGRE_DATABASE,
});

const createTables = async () => {
  try {
    const sqlScript = fs.readFileSync("./src/database/tables.sql").toString();

    await pool.query(sqlScript);
    console.log("Tabelas criadas com sucesso");
  } catch (error) {
    console.log("Problema ao criar as tabelas");
    console.error(error);
  }
};

createTables();

export { pool };
