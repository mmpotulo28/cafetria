import { Pool } from "pg";

const pool = new Pool({
	connectionString: process.env.POSTGRES_STRING,
});

export default pool;
