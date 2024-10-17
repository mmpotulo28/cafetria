import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../lib/db";
import { iOrder, iOrderItem } from "@/lib/Type";

const createOrdersTable = async () => {
	const createTableQuery = `
  CREATE TABLE IF NOT EXISTS orders (
   id SERIAL PRIMARY KEY,
   username VARCHAR(255) NOT NULL,
   NoOfItems INT NOT NULL,
   total DECIMAL(10, 2) NOT NULL,
   date DATE NOT NULL,
   status VARCHAR(50) NOT NULL
  );
 `;
	await pool.query(createTableQuery);
};

const createOrderItemsTable = async () => {
	const createTableQuery = `
  CREATE TABLE IF NOT EXISTS order_items (
   id SERIAL PRIMARY KEY,
   order_id INT NOT NULL,
   item_id INT NOT NULL,
   name VARCHAR(255) NOT NULL,
   quantity INT NOT NULL,
   price DECIMAL(10, 2) NOT NULL,
   image VARCHAR(255),
   FOREIGN KEY (order_id) REFERENCES orders(id)
  );
 `;
	await pool.query(createTableQuery);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	console.log("API endpoint called");

	switch (req.method) {
		case "GET":
			return getOrders(req, res);
		case "POST":
			return addOrder(req, res);
		case "PUT":
			return updateOrder(req, res);
		default:
			res.setHeader("Allow", ["GET", "POST", "PUT"]);
			res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}

async function getOrders(req: NextApiRequest, res: NextApiResponse) {
	try {
		const result = await pool.query("SELECT * FROM orders");
		const orders = result.rows;

		for (const order of orders) {
			const itemsResult = await pool.query("SELECT * FROM order_items WHERE order_id = $1", [
				order.id,
			]);
			order.items = itemsResult.rows;
		}

		res.status(200).json(orders);
	} catch (error) {
		console.error("Error fetching orders:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

async function addOrder(req: NextApiRequest, res: NextApiResponse) {
	const newOrder: iOrder = req.body;

	try {
		await createOrdersTable();
		await createOrderItemsTable();

		const insertOrderQuery = `
   INSERT INTO orders (username, NoOfItems, total, date, status)
   VALUES ($1, $2, $3, $4, $5)
   RETURNING *;
  `;
		const orderValues = [
			newOrder.username,
			newOrder.noofitems,
			newOrder.total,
			newOrder.date,
			newOrder.status,
		];
		const orderResult = await pool.query(insertOrderQuery, orderValues);
		const addedOrder = orderResult.rows[0];

		const insertOrderItemsQuery = `
   INSERT INTO order_items (order_id, item_id, name, quantity, price, image)
   VALUES ($1, $2, $3, $4, $5, $6)
   RETURNING *;
  `;
		const orderItemsValues = newOrder.items.map((item: iOrderItem) => [
			addedOrder.id,
			item.item_id,
			item.name,
			item.quantity,
			item.price,
			item.image,
		]);

		for (const values of orderItemsValues) {
			await pool.query(insertOrderItemsQuery, values);
		}

		const itemsResult = await pool.query("SELECT * FROM order_items WHERE order_id = $1", [
			addedOrder.id,
		]);
		addedOrder.items = itemsResult.rows;

		res.status(201).json(addedOrder);
	} catch (error) {
		console.error("Error adding order:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

async function updateOrder(req: NextApiRequest, res: NextApiResponse) {
	const { id, ...updateData } = req.body;

	try {
		const updateQuery = `
   UPDATE orders
   SET ${Object.keys(updateData)
		.map((key, index) => `${key} = $${index + 2}`)
		.join(", ")}
   WHERE id = $1
   RETURNING *;
  `;
		const values = [id, ...Object.values(updateData)];
		const result = await pool.query(updateQuery, values);

		if (result.rows.length === 0) {
			return res.status(404).json({ message: "Order not found" });
		}

		const updatedOrder = result.rows[0];
		const itemsResult = await pool.query("SELECT * FROM order_items WHERE order_id = $1", [
			updatedOrder.id,
		]);
		updatedOrder.items = itemsResult.rows;

		res.status(200).json(updatedOrder);
	} catch (error) {
		console.error("Error updating order:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
