import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { body, validationResult } from "express-validator";

const secretKey = process.env.JWT_SECRET_KEY || "default_secret_key"; // Use environment variable for secret key

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	if (req.method !== "POST") {
		res.status(405).json({ message: "Method Not Allowed" });
		return;
	}

	// Validate request body
	await body("name").isString().notEmpty().run(req);
	await body("email").isEmail().run(req);

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({ errors: errors.array() });
		return;
	}

	const { name, email } = req.body;

	const payload = {
		name,
		email,
	};

	const expiresIn = "5m";
 try {
  const token = jwt.sign(payload, secretKey, { expiresIn });

  res.setHeader(
   "Set-Cookie",
   `token=${token}; HttpOnly; Secure=${
    process.env.NODE_ENV === "production"
   }; Max-Age=300; Path=/`,
  );

  res.status(200).json({
   message: "Token generated and saved in cookie",
   token,
   expiresIn,
  });
 } catch (error) {
  console.error("Error generating token:", error);
  res.status(500).json({ message: "Internal Server Error" });
 }
}
