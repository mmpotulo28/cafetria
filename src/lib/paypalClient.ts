import { Client, Environment } from "@paypal/paypal-server-sdk";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
	clientCredentialsAuthCredentials: {
		oAuthClientId: process.env.PAYPAL_CLIENT_ID!,
		oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET!,
	},
	environment: Environment.Sandbox, // Change to Environment.Production for live transactions
});

export default client;
