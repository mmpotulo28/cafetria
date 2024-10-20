import { compare } from "bcryptjs";

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
