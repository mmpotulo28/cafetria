import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";
import SimilarItems from "../item/components/SimilarItems";
import { scrollNext, scrollPrev } from "@/components/ItemsBlock";
import { items } from "@/lib/data";
import Sponsors from "@/components/Sponsors";
import PersonalInfoForm from "./components/PersonalInfoForm";
import OrderSummary from "./components/OrderSummary";
import PaymentOptionsForm from "./components/PaymentOptionsForm";
import { iCartItem } from "@/lib/Type";

const CheckoutPage: React.FC = () => {
	const { data: session } = useSession();
	const [paymentStatus] = useState<"pending" | "successful" | "failed">("successful");
	const [, setCart] = useState<iCartItem[]>([]);
	const [, setUserData] = useState({
		name: "",
		email: "",
		full_address: "",
		phone: "",
	});

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

	function handleProceed(): void {
		throw new Error("Function not implemented.");
	}

	return (
		<>
			<section className="checkout-sec">
				<PersonalInfoForm />
				<OrderSummary />
				<PaymentOptionsForm />

				<section className="payment-status-sec">
					{paymentStatus === "successful" ? (
						<button onClick={handleProceed}>Proceed</button>
					) : (
						<p>Payment {paymentStatus}</p>
					)}
				</section>
			</section>

			<SimilarItems item={items[0]} scrollNext={scrollNext} scrollPrev={scrollPrev} />
			<Sponsors />
		</>
	);
};

export default CheckoutPage;
