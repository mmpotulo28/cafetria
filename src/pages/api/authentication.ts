import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import pool from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		// Registration
		const {
			email,
			username,
			name,
			phone_number,
			address,
			city,
			state,
			zip,
			country,
			facebook,
			twitter,
			instagram,
			linkedin,
			github,
			login_provider,
			avatar_url,
			user_type,
		} = req.body;

		if (!email || !name || !login_provider) {
			return res.status(400).json({ message: "Required fields are missing" });
		}

		const [first_name, last_name] = name.split(" ");

		if (!first_name || !last_name) {
			return res.status(400).json({ message: "Both first name and last name are required" });
		}

		let client = null;
		try {
			client = await pool.connect();
			const result = await client.query("SELECT * FROM users WHERE email = $1", [email]);

			if (result.rows.length > 0) {
				return res.status(409).json({ message: "User already exists" });
			}

			await client.query(
				`INSERT INTO users (
					email, username, first_name, last_name, phone_number, address, city, state, zip, country,
					facebook, twitter, instagram, linkedin, github, login_provider, avatar_url, user_type, created_at
				) VALUES (
					$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, NOW()
				)`,
				[
					email,
					username || null,
					first_name,
					last_name,
					phone_number || null,
					address || null,
					city || null,
					state || null,
					zip || null,
					country || null,
					facebook || null,
					twitter || null,
					instagram || null,
					linkedin || null,
					github || null,
					login_provider,
					avatar_url || null,
					user_type || "customer",
				],
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
	} else if (req.method === "GET") {
		// Login
		const { email, password } = req.query;
		console.log("email:", email);
		console.log("password:", password);

		if (!email || !password) {
			return res.status(400).json({ message: "Email and password are required" });
		}

		try {
			const client = await pool.connect();
			const result = await client.query("SELECT * FROM users WHERE email = $1", [email]);

			if (result.rows.length === 0) {
				return res.status(401).json({ message: "Invalid email or password" });
			}

			const user = result.rows[0];
			const isPasswordValid = await bcrypt.compare(
				typeof password === "string" ? password : password[0],
				user.password,
			);

			if (!isPasswordValid) {
				return res.status(401).json({ message: "Invalid email or password" });
			}

			// Authentication successful
			return res.status(200).json({
				message: "Login successful",
				user: {
					id: user.id,
					name: user.first_name + " " + user.last_name,
					email: user.email,
					image: "/images/placeholder-image.webp",
				},
			});
		} catch (error) {
			console.error("Error authenticating user:", error);
			return res.status(500).json({ message: "Internal server error" });
		}
	} else {
		return res.status(405).json({ message: "Method not allowed" });
	}
}
