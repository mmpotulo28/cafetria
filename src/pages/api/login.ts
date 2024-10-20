import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import pool from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const { email, password } = req.body;
	console.log("email:", email);
	console.log("password", password);

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
		const isPasswordValid = await bcrypt.compare(password, user.password);

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
				image: "/images/placeholder-image.webp", // Assuming you have a profile image URL in your database
			},
		});
	} catch (error) {
		console.error("Error authenticating user:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}
