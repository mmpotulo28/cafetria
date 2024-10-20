import { Pool } from "pg";

const pool = new Pool({
	connectionString: process.env.POSTGRES_STRING,
});

pool.on("error", (err) => {
	console.error("Unexpected error on idle client", err);
	process.exit(-1);
});

export default pool;

export const connectToDatabase = async () => {
	return pool.connect();
};
