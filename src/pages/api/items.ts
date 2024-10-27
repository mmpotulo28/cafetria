import type { NextApiRequest, NextApiResponse } from "next";
import pool from "../../lib/db";
import { iItem } from "@/lib/Type";

const createItemsTable = async () => {
	const createTableQuery = `
	CREATE TABLE IF NOT EXISTS items (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL UNIQUE,
	price DECIMAL(10, 2) NOT NULL,
	status VARCHAR(50) NOT NULL,
	img VARCHAR(255) NOT NULL,
	recommended BOOLEAN NOT NULL,
	category VARCHAR(100) NOT NULL,
	description TEXT NOT NULL,
	options JSON NOT NULL
);
		`;

	await pool.query(createTableQuery);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		const items: iItem[] = req.body;

		try {
			// Step 1: Create the items table if it does not exist
			await createItemsTable();

			// Step 2: Fetch existing item names from the database
			const existingItemsResult = await pool.query("SELECT name FROM items");
			const existingItemNames = new Set(
				existingItemsResult.rows.map((item: { name: string }) => item.name),
			);

			// Step 3: Filter out items that already exist in the database
			const newItems = items.filter((item) => !existingItemNames.has(item.name));

			if (newItems.length === 0) {
				return res.status(400).json({ message: "No new items to add" });
			}

			// Step 4: Insert new items into the database
			const promises = newItems.map((item) =>
				pool.query(
					"INSERT INTO items (name, price, status, img, recommended, category, description, options) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
					[
						item.name,
						item.price,
						item.status,
						item.img,
						item.recommended,
						item.category,
						item.description,
						item.options,
					],
				),
			);

			await Promise.all(promises); // Wait for all insertions to complete
			res.status(201).json({ message: "New items added successfully" });
		} catch (error) {
			console.error("Error inserting items:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	} else if (req.method === "GET") {
		try {
			// Fetch all items from the database
			const result = await pool.query("SELECT * FROM items");
			const items = result.rows;
			res.status(200).json(items);
		} catch (error) {
			console.error("Error fetching items:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	} else if (req.method === "PUT") {
		const item: iItem = req.body;
		const id = req.query.id;

		try {
			// Update the item in the database
			const updateQuery = `
				UPDATE items
				SET price = $1, status = $2, img = $3, recommended = $4, category = $5, description = $6, options = $7
				WHERE id = $8
			`;
			const values = [
				item.price,
				item.status,
				item.img,
				item.recommended,
				item.category,
				item.description,
				item.options,
				id,
			];

			const result = await pool.query(updateQuery, values);

			if (result.rowCount === 0) {
				return res.status(404).json({ message: "Item not found" });
			}

			res.status(200).json({ message: "Item updated successfully" });
		} catch (error) {
			console.error("Error updating item:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	} else if (req.method === "DELETE") {
		const id = req.query.id;

		try {
			// Delete the item from the database
			const deleteQuery = "DELETE FROM items WHERE id = $1";
			const result = await pool.query(deleteQuery, [id]);

			if (result.rowCount === 0) {
				return res.status(404).json({ message: "Item not found" });
			}

			res.status(200).json({ message: "Item deleted successfully" });
		} catch (error) {
			console.error("Error deleting item:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	} else {
		res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
