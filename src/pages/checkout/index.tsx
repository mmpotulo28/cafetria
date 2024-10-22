import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";
import SimilarItems from "../item/components/SimilarItems";
import { scrollNext, scrollPrev } from "@/components/ItemsBlock";
import { items } from "@/lib/data";
import Sponsors from "@/components/Sponsors";
import PersonalInfoForm from "./components/PersonalInfoForm";
import OrderSummary from "./components/OrderSummary";
// import PaymentOptionsForm from "./components/PaymentOptionsForm";
import { iCartItem, iOrder } from "@/lib/Type";
import PaypalButton from "@/components/PaypalButton";

const CheckoutPage: React.FC = () => {
	const { data: session } = useSession();
	const [cart, setCart] = useState<iCartItem[]>([]);
	const [, setUserData] = useState({
		name: "",
		email: "",
		full_address: "",
		phone: "",
	});
	const [formattedCart, setFormattedCart] = useState<iOrder>();

	useEffect(() => {
		const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
		setCart(storedCart);
	}, []);

	useEffect(() => {
		const fetchUserData = async () => {
			if (session?.user?.email) {
				try {
					const cachedData = Cookies.get("userData");
					if (cachedData) {
						setUserData(JSON.parse(cachedData));
					} else {
						const response = await fetch(
							`/api/user/profile?email=${session.user.email}`,
						);
						const data = await response.json();
						const userData = {
							name: `${data.first_name} ${data.last_name}`,
							email: data.email,
							full_address: `${data.address}, ${data.city}, ${data.state}, ${data.zip}, ${data.country}`,
							phone: data.phone_number,
						};
						setUserData(userData);
						Cookies.set("userData", JSON.stringify(userData), { expires: 1 / 480 }); // 3 minutes
					}
				} catch (error) {
					console.error("Error fetching user data:", error);
				}
			}
		};

		fetchUserData();
	}, [session]);

	useEffect(() => {
		if (session?.user?.name && cart.length > 0) {
			const formatted: iOrder = {
				id: new Date().getTime(), // or any unique identifier
				username: session.user.name,
				items: cart.map((item, index) => ({
					id: index + 1, // or any unique identifier for the item
					order_id: new Date().getTime(), // or any unique identifier for the order
					item_id: item.id,
					name: item.name,
					quantity: item.quantity,
					price: item.total,
				})),
				noofitems: cart.length,
				total: cart.reduce((acc, item) => acc + Number(item.total), 0).toString(),
				date: new Date().toISOString(),
				status: "pending", // or any default status
			};
			setFormattedCart(formatted);
		}
	}, [session, cart]);

	return (
		<>
			<section className="checkout-sec">
				<PersonalInfoForm />
				<OrderSummary />
				{/* <PaymentOptionsForm /> */}
				{formattedCart && <PaypalButton cart={formattedCart} />}

				<section className="payment-status-sec"></section>
			</section>

			<SimilarItems item={items[0]} scrollNext={scrollNext} scrollPrev={scrollPrev} />
			<Sponsors />
		</>
	);
};

export default CheckoutPage;
