import React, { useState } from "react";
import {
	PayPalScriptProvider,
	PayPalButtons,
	PayPalCardFieldsProvider,
	PayPalCardFieldsForm,
	usePayPalCardFields,
} from "@paypal/react-paypal-js";
import { iOrder } from "../lib/Type";

interface Name {
	givenName: string;
	surname: string;
}

interface Address {
	addressLine1?: string;
	adminArea2?: string;
	adminArea1?: string;
	postalCode?: string;
	countryCode: string;
}

interface PayPal {
	emailAddress: string;
	accountId: string;
	accountStatus: string;
	name: Name;
	address: Address;
}

interface PaymentSource {
	paypal: PayPal;
}

interface Payer {
	emailAddress: string;
	payerId: string;
	name: Name;
	address: Address;
}

interface Amount {
	currencyCode: string;
	value: string;
}

interface SellerProtection {
	status: string;
	disputeCategories: string[];
}

interface SellerReceivableBreakdown {
	grossAmount: Amount;
	paypalFee: Amount;
	netAmount: Amount;
}

interface Link {
	href: string;
	rel: string;
	method: string;
}

interface Capture {
	status: string;
	id: string;
	amount: Amount;
	sellerProtection: SellerProtection;
	finalCapture: boolean;
	sellerReceivableBreakdown: SellerReceivableBreakdown;
	links: Link[];
	createTime: string;
	updateTime: string;
}

interface Payments {
	captures: Capture[];
}

interface Shipping {
	name: {
		fullName: string;
	};
	address: Address;
}

interface PurchaseUnit {
	referenceId: string;
	shipping: Shipping;
	payments: Payments;
}

interface OrderData {
	id: string;
	status: string;
	paymentSource: PaymentSource;
	payer: Payer;
	purchaseUnits: PurchaseUnit[];
	links: Link[];
}

interface SubmitPaymentProps {
	isPaying: boolean;
	setIsPaying: React.Dispatch<React.SetStateAction<boolean>>;
	billingAddress: {
		addressLine1: string;
		addressLine2: string;
		adminArea1: string;
		adminArea2: string;
		countryCode: string;
		postalCode: string;
	};
}

const PaypalButton: React.FC<{ cart: iOrder }> = ({ cart }) => {
	const [isPaying, setIsPaying] = useState(false);
	const [message, setMessage] = useState("");
	const initialOptions = {
		clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb",
		"client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb",
		"enable-funding": "venmo,paylater,card",
		enableFunding: "venmo,paylater,card",
		"buyer-country": "SA",
		buyerCountry: "SA",
		currency: "USD",
		components: "buttons,hosted-fields,card-fields",
	};

	const [billingAddress, setBillingAddress] = useState({
		addressLine1: "",
		addressLine2: "",
		adminArea1: "",
		adminArea2: "",
		countryCode: "",
		postalCode: "",
	});

	function handleBillingAddressChange(field: string, value: string) {
		setBillingAddress((prev) => ({
			...prev,
			[field]: value,
		}));
	}

	async function createOrder() {
		try {
			const response = await fetch("/api/orders", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(
					cart || {
						items: [
							{
								item_id: 121,
								name: "Item Name",
								quantity: 1,
								price: 10.0 / 18.0,
							},
						],
						total: 10.0 / 18.0,
					},
				),
			});

			const orderData = await response.json();
			console.log("Order data:", orderData);

			console.log("FrontENd Order Data ID:", orderData.orderData);

			return orderData.orderData.result.id;
		} catch (error) {
			console.error("Error creating order:", error);
			throw new Error(`Could not initiate PayPal Checkout.: ${error}`);
		}
	}

	async function onApprove(data: { orderID: unknown }) {
		try {
			const response = await fetch(`/api/orders/${data.orderID}/capture`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const orderData: { result: OrderData } = await response.json();
			console.log("Capture result:", orderData);
			const transaction: Capture = orderData.result.purchaseUnits[0].payments.captures[0];
			console.log("Transaction: ", transaction);

			if (!transaction || transaction.status === "DECLINED") {
				console.log("Failed Transaction details:", orderData.result);
				setMessage("Transaction was not successful.");
			} else {
				setMessage(`Transaction ${transaction.status}: ${transaction.id}`);
			}
		} catch (error) {
			console.error("Error capturing order:", error);
			setMessage((error as Error).message);
		}
	}

	function onError(error: unknown) {
		console.error("PayPal Checkout onError", error);
		if (error instanceof Error) {
			setMessage(error.message);
		} else {
			setMessage(String(error));
		}
	}

	return (
		<div className="card_container">
			<PayPalScriptProvider options={initialOptions}>
				<PayPalButtons
					createOrder={createOrder}
					onApprove={onApprove}
					onError={onError}
					style={{
						shape: "sharp",
						layout: "horizontal",
						color: "silver",
						label: "paypal",
					}}
				/>

				<PayPalCardFieldsProvider
					onError={(error) => console.error("PayPal Card Fields onError", error)}
					createOrder={createOrder}
					onApprove={onApprove}>
					<PayPalCardFieldsForm />

					{/* Billing Address Inputs */}
					<input
						type="text"
						placeholder="Address line 1"
						onChange={(e) => handleBillingAddressChange("addressLine1", e.target.value)}
					/>
					<input
						type="text"
						placeholder="Address line 2"
						onChange={(e) => handleBillingAddressChange("addressLine2", e.target.value)}
					/>
					<input
						type="text"
						placeholder="Admin area line 1"
						onChange={(e) => handleBillingAddressChange("adminArea1", e.target.value)}
					/>
					<input
						type="text"
						placeholder="Admin area line 2"
						onChange={(e) => handleBillingAddressChange("adminArea2", e.target.value)}
					/>
					<input
						type="text"
						placeholder="Country code"
						onChange={(e) => handleBillingAddressChange("countryCode", e.target.value)}
					/>
					<input
						type="text"
						placeholder="Postal/zip code"
						onChange={(e) => handleBillingAddressChange("postalCode", e.target.value)}
					/>

					<SubmitPayment
						isPaying={isPaying}
						setIsPaying={setIsPaying}
						billingAddress={billingAddress}
					/>
				</PayPalCardFieldsProvider>
			</PayPalScriptProvider>
			{message && <Message content={message} />}
		</div>
	);
};

const SubmitPayment: React.FC<SubmitPaymentProps> = ({ isPaying, setIsPaying }) => {
	const { cardFieldsForm } = usePayPalCardFields();

	const handleClick = async () => {
		if (!cardFieldsForm) {
			throw new Error(
				"Unable to find any child components in the <PayPalCardFieldsProvider />",
			);
		}

		const formState = await cardFieldsForm.getState();

		if (!formState.isFormValid) {
			return alert("The payment form is invalid");
		}

		setIsPaying(true);

		cardFieldsForm.submit().finally(() => {
			setIsPaying(false);
		});
	};

	return (
		<button className={isPaying ? "btn" : "btn btn-primary"} onClick={handleClick}>
			{isPaying ? <div className="spinner tiny" /> : "Pay"}
		</button>
	);
};

const Message: React.FC<{ content: string }> = ({ content }) => {
	return <p>{content}</p>;
};

export default PaypalButton;
