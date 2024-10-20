import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import pool from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const { email, password, username, first_name, last_name, phone_number } = req.body;
	console.log("email:", email);
	console.log("password:", password);
	console.log("username:", username);
	console.log("first_name:", first_name);
	console.log("last_name:", last_name);
	console.log("phone_number:", phone_number);

	if (!email || !password || !username || !first_name || !last_name || !phone_number) {
		return res.status(400).json({ message: "All fields are required" });
	}

	let client = null;
	try {
		client = await pool.connect();
		const result = await client.query("SELECT * FROM users WHERE email = $1", [email]);

		if (result.rows.length > 0) {
			return res.status(409).json({ message: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		await client.query(
			"INSERT INTO users (email, password, username, first_name, last_name, phone_number, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW())",
			[email, hashedPassword, username, first_name, last_name, phone_number],
		);

		// Registration successful
		return res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		console.error("Error registering user:", error);
		return res.status(500).json({ message: "Internal server error" });
	} finally {
		if (client) {
			client.release();
		}
	}
}
