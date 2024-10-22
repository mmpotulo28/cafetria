import type { NextApiRequest, NextApiResponse } from "next";
import { OrdersController } from "@paypal/paypal-server-sdk";
import client from "../../../../lib/paypalClient";

const ordersController = new OrdersController(client);

const captureOrder = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		const { orderID } = req.query;
		try {
			const captureData = await ordersController.ordersCapture({ id: String(orderID) });
			res.status(200).json(captureData);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "An unknown error occurred";
			res.status(500).json({ error: errorMessage });
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
};

export default captureOrder;
