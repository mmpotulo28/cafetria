import React, { useState } from "react";
import {
	PayPalScriptProvider,
	PayPalButtons,
	PayPalCardFieldsProvider,
	PayPalCardFieldsForm,
	usePayPalCardFields,
} from "@paypal/react-paypal-js";
import { iOrder } from "../lib/Type";
import { useRouter } from "next/router";

interface Address {
	addressLine1?: string;
	addressLine2?: string;
	adminArea2?: string;
	adminArea1?: string;
	postalCode?: string;
	countryCode: string;
}

interface Name {
	givenName: string;
	surname: string;
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
	billingAddress?: Address;
}

const PaypalButton: React.FC<{ cart: iOrder }> = ({ cart }) => {
	const router = useRouter();
	const [isPaying, setIsPaying] = useState(false);
	const [message, setMessage] = useState("");
	// const [billingAddress] = useState<Address>({
	// 	addressLine1: "",
	// 	adminArea1: "",
	// 	adminArea2: "",
	// 	countryCode: "",
	// 	postalCode: "",
	// });

	const initialOptions = {
		clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb",
		"enable-funding": "venmo,paylater,card",
		"buyer-country": "SA",
		currency: "USD",
		components: "buttons,hosted-fields,card-fields",
	};

	// const handleBillingAddressChange = (field: keyof Address, value: string) => {
	// 	setBillingAddress((prev) => ({
	// 		...prev,
	// 		[field]: value,
	// 	}));
	// };

	const createOrder = async () => {
		try {
			const response = await fetch("/api/orders", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(cart),
			});

			const orderData = await response.json();
			return orderData.orderData.result.id;
		} catch (error) {
			console.error("Error creating order:", error);
			throw new Error(`Could not initiate PayPal Checkout.: ${error}`);
		}
	};

	const onApprove = async (data: { orderID: string }) => {
		try {
			const response = await fetch(`/api/orders/${data.orderID}/capture`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const orderData: { result: OrderData } = await response.json();
			const transaction = orderData.result.purchaseUnits[0].payments.captures[0];

			if (!transaction || transaction.status === "DECLINED") {
				setMessage("Transaction was not successful.");
			} else {
				setMessage(`Transaction ${transaction.status}: ${transaction.id}`);
				clearCart();
				setTimeout(() => {
					router.push("/endpoints/user/orders");
				}, 2000);
			}
		} catch (error) {
			console.error("Error capturing order:", error);
			setMessage((error as Error).message);
		}
	};

	const onError = (error: unknown) => {
		console.error("PayPal Checkout onError", error);
		setMessage(error instanceof Error ? error.message : String(error));
	};

	const clearCart = () => {
		localStorage.removeItem("cart");
	};

	return (
		<div className="card_container">
			<PayPalScriptProvider options={initialOptions}>
				<PayPalButtons
					createOrder={createOrder}
					onApprove={onApprove}
					onError={onError}
					style={{
						shape: "sharp",
						layout: "vertical",
						color: "silver",
						label: "checkout",
					}}
				/>

				<PayPalCardFieldsProvider
					createOrder={createOrder}
					onApprove={onApprove}
					onError={onError}
					style={{
						input: {
							color: "black",
						},
						label: {
							color: "black",
							"font-size": "16px",
						},
						fields: {},
					}}>
					<PayPalCardFieldsForm />
					{/* <input
						type="text"
						id="card-billing-address-line-2"
						name="card-billing-address-line-2"
						placeholder="Address line 1"
						onChange={(e) => handleBillingAddressChange("addressLine1", e.target.value)}
					/>
					<input
						type="text"
						id="card-billing-address-line-2"
						name="card-billing-address-line-2"
						placeholder="Address line 2"
						onChange={(e) => handleBillingAddressChange("addressLine2", e.target.value)}
					/>
					<input
						type="text"
						id="card-billing-address-admin-area-line-1"
						name="card-billing-address-admin-area-line-1"
						placeholder="Admin area line 1"
						onChange={(e) => handleBillingAddressChange("adminArea1", e.target.value)}
					/>
					<input
						type="text"
						id="card-billing-address-admin-area-line-2"
						name="card-billing-address-admin-area-line-2"
						placeholder="Admin area line 2"
						onChange={(e) => handleBillingAddressChange("adminArea2", e.target.value)}
					/>
					<input
						type="text"
						id="card-billing-address-country-code"
						name="card-billing-address-country-code"
						placeholder="Country code"
						onChange={(e) => handleBillingAddressChange("countryCode", e.target.value)}
					/>
					<input
						type="text"
						id="card-billing-address-postal-code"
						name="card-billing-address-postal-code"
						placeholder="Postal/zip code"
						onChange={(e) => handleBillingAddressChange("postalCode", e.target.value)}
					/> */}
					{/* Custom client component to handle card fields submission */}
					<SubmitPayment isPaying={isPaying} setIsPaying={setIsPaying} />
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
