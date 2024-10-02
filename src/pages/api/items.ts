import type { NextApiRequest, NextApiResponse } from "next";
import pool from "../../lib/db";
import { iItem } from "@/lib/Type";

const createItemsTable = async () => {
	const createTableQuery = `
    CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      status VARCHAR(50) NOT NULL,
      img VARCHAR(255) NOT NULL,
      recommended BOOLEAN NOT NULL,
      category VARCHAR(100) NOT NULL,
      description TEXT NOT NULL
    );
  `;

	await pool.query(createTableQuery);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	console.log("api endpoint called");
	if (req.method === "POST") {
		const items: iItem[] = req.body;

		try {
			// Step 1: Create the items table if it does not exist
			await createItemsTable();

			// Step 2: Fetch existing item IDs from the database
			const existingItemsResult = await pool.query("SELECT id FROM items");
			const existingItemIds = new Set(
				existingItemsResult.rows.map((item: { id: number }) => item.id),
			);

			// Step 3: Filter out items that already exist in the database
			const newItems = items.filter((item) => !existingItemIds.has(item.id));

			if (newItems.length === 0) {
				return res.status(400).json({ message: "No new items to add" });
			}

			// Step 4: Insert new items into the database
			const promises = newItems.map((item) =>
				pool.query(
					"INSERT INTO items (id, name, price, status, img, recommended, category, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
					[
						item.id,
						item.name,
						item.price,
						item.status,
						item.img,
						item.recommended,
						item.category,
						item.description,
					],
				),
			);

			await Promise.all(promises); // Wait for all insertions to complete
			res.status(201).json({ message: "New items added successfully" });
		} catch (error) {
			console.error("Error inserting items:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
