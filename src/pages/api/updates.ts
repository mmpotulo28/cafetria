import type { NextApiRequest, NextApiResponse } from "next";
import pool from "../../lib/db";

interface Update {
	id?: number;
	text: string;
	date: string;
	author: string;
}

const createUpdatesTable = async () => {
	const createTableQuery = `
  CREATE TABLE IF NOT EXISTS updates (
   id SERIAL PRIMARY KEY,
   text TEXT NOT NULL,
   date TIMESTAMP NOT NULL,
   author VARCHAR(255) NOT NULL
  );
 `;
	await pool.query(createTableQuery);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		const updates: Update[] = [req.body];

		try {
			await createUpdatesTable();

			const promises = updates.map((update) => {
				return pool.query("INSERT INTO updates (text, date, author) VALUES ($1, $2, $3)", [
					update.text,
					update.date,
					update.author,
				]);
			});
			await Promise.all(promises);
			res.status(201).json({ message: "New updates added successfully" });
		} catch (error) {
			console.error("Error inserting updates:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	} else if (req.method === "GET") {
		try {
			const result = await pool.query("SELECT * FROM updates");
			const updates = result.rows;
			res.status(200).json(updates);
		} catch (error) {
			console.error("Error fetching updates:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	} else if (req.method === "PUT") {
		const { id, text, date, author }: Update = req.body;

		try {
			await pool.query("UPDATE updates SET text = $1, date = $2, author = $3 WHERE id = $4", [
				text,
				date,
				author,
				id,
			]);
			res.status(200).json({ message: "Update edited successfully" });
		} catch (error) {
			console.error("Error editing update:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	} else if (req.method === "DELETE") {
		const { id } = req.query;

		try {
			await pool.query("DELETE FROM updates WHERE id = $1", [id]);
			res.status(200).json({ message: "Update deleted successfully" });
		} catch (error) {
			console.error("Error deleting update:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	} else {
		res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
