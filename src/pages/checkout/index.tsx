import React, { useState, useEffect, useCallback } from "react";
import SimilarItems from "../item/components/SimilarItems";
import { scrollNext, scrollPrev } from "@/components/ItemsBlock";
import { items } from "@/lib/data";
import Sponsors from "@/components/Sponsors";
import PersonalInfoForm from "./components/PersonalInfoForm";
import OrderSummary from "./components/OrderSummary";
import PaymentOptionsForm from "./components/PaymentOptionsForm";
import { iCartItem, iOrder } from "@/lib/Type";

const CheckoutPage: React.FC = () => {
	const [paymentStatus, setPaymentStatus] = useState<"pending" | "successful" | "failed">(
		"successful",
	);
	const [cart, setCart] = useState<iCartItem[]>([]);

	useEffect(() => {
		const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
		setCart(storedCart);
	}, []);

	const createOrder = useCallback((): iOrder => {
		let orderNum;
		if (typeof window !== "undefined" && window.crypto) {
			const array = new Uint32Array(1);
			window.crypto.getRandomValues(array);
			orderNum = array[0];
		} else {
			orderNum = 1000000;
		}
		return {
			id: orderNum,
			username: "exampleUser",
			noofitems: cart.length,
			total: cart
				.reduce((acc, item) => acc + Number(item.total) * Number(item.quantity), 0)
				.toString(),
			date: new Date().toISOString().split("T")[0],
			status: "pending",
			items: cart.map((item) => ({
				id: item.id,
				order_id: orderNum,
				item_id: item.id,
				name: item.name,
				quantity: item.quantity,
				price: item.total,
				image: item.image,
			})),
		};
	}, [cart]);

	const handleProceed = async () => {
		try {
			const newOrder = createOrder();
			const response = await fetch("/api/orders", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newOrder),
			});

			if (response.ok) {
				setPaymentStatus("successful");
			} else {
				setPaymentStatus("failed");
			}
		} catch (error) {
			console.error("Error adding order:", error);
			setPaymentStatus("failed");
		}
	};

	return (
		<>
			<section className="checkout-sec">
				<PersonalInfoForm />
				<OrderSummary />
				<PaymentOptionsForm />
			</section>

			<section className="payment-status-sec">
				{paymentStatus === "successful" ? (
					<button onClick={handleProceed}>Proceed</button>
				) : (
					<p>Payment {paymentStatus}</p>
				)}
			</section>

			<SimilarItems item={items[0]} scrollNext={scrollNext} scrollPrev={scrollPrev} />
			<Sponsors />
		</>
	);
};

export default CheckoutPage;
