import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";
import { iUserProfile, iUserUpdateData } from "@/lib/Type";

// Define the interface for the returned data

const fetchAllUserProfiles = async (): Promise<iUserProfile[]> => {
	const query = `
		SELECT username, first_name, last_name, city, country, avatar_url, phone_number, email, user_type FROM users
	`;
	const result = await pool.query(query);
	return result.rows;
};

const updateUserProfile = async (email: string, data: iUserUpdateData) => {
	const {
		username,
		first_name,
		last_name,
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
	}: iUserUpdateData = data;

	const query = `
		UPDATE users
		SET
			username = COALESCE($1, username),
			first_name = COALESCE($2, first_name),
			last_name = COALESCE($3, last_name),
			phone_number = COALESCE($4, phone_number),
			address = COALESCE($5, address),
			city = COALESCE($6, city),
			state = COALESCE($7, state),
			zip = COALESCE($8, zip),
			country = COALESCE($9, country),
			facebook = COALESCE($10, facebook),
			twitter = COALESCE($11, twitter),
			instagram = COALESCE($12, instagram),
			linkedin = COALESCE($13, linkedin),
			github = COALESCE($14, github),
			login_provider = COALESCE($15, login_provider),
			avatar_url = COALESCE($16, avatar_url),
			user_type = COALESCE($17, user_type)
		WHERE email = $18
		RETURNING *;
	`;

	const result = await pool.query(query, [
		username,
		first_name,
		last_name,
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
		email,
	]);

	return result.rows[0];
};

const deleteUserProfile = async (email: string) => {
	const query = `
		DELETE FROM users
		WHERE email = $1
		RETURNING *;
	`;

	const result = await pool.query(query, [email]);
	return result.rows[0];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		try {
			const userProfiles: iUserProfile[] = await fetchAllUserProfiles();
			res.status(200).json(userProfiles);
		} catch (error) {
			console.error("Error fetching user profiles:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	} else if (req.method === "PUT") {
		const { email } = req.query;
		const {
			username,
			first_name,
			last_name,
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
		}: iUserUpdateData = req.body;

		if (!email || typeof email !== "string") {
			return res.status(400).json({ error: "Invalid or missing email parameter" });
		}

		const missingFields = [];
		if (!username) missingFields.push("username");
		if (!first_name) missingFields.push("first_name");
		if (!last_name) missingFields.push("last_name");
		if (!phone_number) missingFields.push("phone_number");
		if (!address) missingFields.push("address");
		if (!city) missingFields.push("city");
		if (!state) missingFields.push("state");
		if (!zip) missingFields.push("zip");
		if (!country) missingFields.push("country");
		if (!facebook) missingFields.push("facebook");
		if (!twitter) missingFields.push("twitter");
		if (!instagram) missingFields.push("instagram");
		if (!linkedin) missingFields.push("linkedin");
		if (!github) missingFields.push("github");
		if (!login_provider) missingFields.push("login_provider");
		if (!avatar_url) missingFields.push("avatar_url");
		if (!user_type) missingFields.push("user_type");

		if (missingFields.length > 0) {
			return res
				.status(400)
				.json({ error: "Missing required fields", fields: missingFields });
		}

		try {
			const updatedUserProfile: iUserUpdateData = await updateUserProfile(email, {
				username,
				first_name,
				last_name,
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
			});

			if (!updatedUserProfile) {
				return res.status(404).json({ error: "User not found" });
			}

			res.status(200).json(updatedUserProfile);
		} catch (error) {
			console.error("Error updating user profile:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	} else if (req.method === "DELETE") {
		const { email } = req.query;

		if (!email || typeof email !== "string") {
			return res.status(400).json({ error: "Invalid or missing email parameter" });
		}

		try {
			const deletedUserProfile = await deleteUserProfile(email as string);

			if (!deletedUserProfile) {
				return res.status(404).json({ error: "User not found" });
			}

			res.status(200).json(deletedUserProfile);
		} catch (error) {
			console.error("Error deleting user profile:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	} else {
		res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
