import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";

const fetchUserProfile = async (email: string) => {
	const query = `
  SELECT * FROM users WHERE email = $1
 `;
	const result = await pool.query(query, [email]);
	return result.rows[0];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		const { email } = req.query;

		if (!email || typeof email !== "string") {
			return res.status(400).json({ error: "Invalid or missing email parameter" });
		}

		try {
			const userProfile = await fetchUserProfile(email);

			if (!userProfile) {
				return res.status(404).json({ error: "User not found" });
			}

			res.status(200).json(userProfile);
		} catch (error) {
			console.error("Error fetching user profile:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	} else {
		res.setHeader("Allow", ["GET"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
