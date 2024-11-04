import { Session } from "next-auth";
import { compare } from "bcryptjs";
import Cookies from "js-cookie";

/**
 * Verifies if the provided password matches the hashed password stored in the database.
 *
 * @param {string} password - The plain text password provided by the user.
 * @param {string} hashedPassword - The hashed password stored in the database.
 * @returns {Promise<boolean>} - Returns true if the password matches, otherwise false.
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
	const isValid = await compare(password, hashedPassword);
	return isValid;
}

/**
 * The function `fetchAccessToken` retrieves an access token either from cookies or by making a POST
 * request to an API endpoint and handles token expiration.
 * @param  - The `fetchAccessToken` function is responsible for fetching an access token either from
 * cookies or by making a request to the `/api/secure/token` endpoint. Here's a breakdown of the
 * parameters and functionality of the function:
 * @returns The `fetchAccessToken` function returns an object with the following properties:
 * - `token`: The access token fetched from cookies or the API response.
 * - `status`: The HTTP status code of the response (200 if token fetched from cookies, otherwise from
 * API response).
 * - `message`: A message indicating the status of the token retrieval process ("Token Fetched from
 * cookies" if token fetched from cookies,
 */
export const fetchAccessToken = async ({ session }: { session: Session | null }) => {
	const token = Cookies.get("token");
	const tokenExpiry = Cookies.get("tokenExpiry");

	if (token && tokenExpiry && new Date(tokenExpiry) > new Date()) {
		return { token, status: 200, message: "Token Fetched from cookies" };
	}

	try {
		const response = await fetch("/api/secure/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: session?.user?.name || "not logged in",
				email: session?.user?.email || "not logged in",
			}),
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch access token: ${response.statusText}`);
		}

		const data = await response.json();
		const token = data.token;
		if (!token) {
			throw new Error("Token not found in response ");
		}

		const expiryDate = new Date(Date.now() + 3 * 60 * 1000).toString();
		Cookies.set("token", token, { expires: 1 / 480 }); // 3 minutes = 1/480 of a day
		Cookies.set("tokenExpiry", expiryDate, { expires: 1 / 480 });

		return { token, status: response.status, message: "Token fetched from API" };
	} catch (error) {
		console.error("Error fetching access token:", error);
		return { status: 500, message: (error as Error).message };
	}
};
