import DashboardCard from "@/components/DashboardCard";
import styles from "../styles.module.css";
import UserLayout from "../UserLayout";
import { items } from "@/lib/data";
import UserDashStats from "@/components/UserDashStats";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
import { iOrder } from "@/lib/Type";

export default function UserDashboardPage() {
	const { data: session } = useSession();
	const userData = {
		profile: {
			name: "John Doe",
			email: "someone@gmail.com",
			age: 30,
			address: "123 Main St",
		},
		orders: [
			{ id: 1234, status: "loading..." },
			{ id: 1235, status: "loading..." },
			{ id: 1236, status: "loading..." },
			{ id: 1237, status: "loading..." },
			{ id: 1238, status: "loading..." },
		],
		notifications: [
			{ message: "New order received", type: "info" },
			{ message: "Payment processed successfully", type: "success" },
			{ message: "Error processing order", type: "error" },
			{ message: "Low stock alert", type: "warning" },
		],
		favorites: items.slice(0, 4),
	};

	const [orders, setOrders] = useState(userData.orders);

	const fetchOrders = useCallback(async () => {
		if (!session?.user?.name) return;

		try {
			const response = await fetch(`/api/orders?username=${session.user.name}`);
			const data = await response.json();
			const sortedOrders = data.sort(
				(a: iOrder, b: iOrder) => new Date(b.date).getTime() - new Date(a.date).getTime(),
			);
			const limitedOrders: iOrder[] = sortedOrders.slice(0, 6);
			setOrders(limitedOrders);
			Cookies.set("orders", JSON.stringify(limitedOrders), { expires: 1 / 480 }); // 3 minutes
		} catch (error) {
			console.error("Error fetching orders:", error);
		}
	}, [session?.user?.name]);

	useEffect(() => {
		if (!session?.user?.email) return;

		const cachedOrders = Cookies.get("orders");
		if (cachedOrders) {
			try {
				const parsedOrders = JSON.parse(cachedOrders);
				if (
					Array.isArray(parsedOrders) &&
					parsedOrders.every((order) => "id" in order && "date" in order)
				) {
					setOrders(parsedOrders);
				} else {
					throw new Error("Invalid order format");
				}
			} catch (error) {
				console.error("Error parsing cached orders:", error);
				fetchOrders();
			}
		} else {
			fetchOrders();
		}
	}, [fetchOrders, session?.user?.email]);

	return (
		<UserLayout>
			<div className={styles.dashboardCards}>
				<DashboardCard styles={styles} heading="Recent Orders">
					{orders?.map((order) => (
						<li key={order.id}>
							Order #{order.id} - {order.status}
						</li>
					))}
				</DashboardCard>

				<DashboardCard styles={styles} heading="Favorite Items">
					{userData.favorites.map((item) => (
						<li key={item.id}>
							{item.name} - ${item.price}
						</li>
					))}
				</DashboardCard>

				<DashboardCard styles={styles} heading="Notifications">
					{userData.notifications.map((notification, index) => (
						<li key={index} className={styles[notification.type]}>
							{notification.message}
						</li>
					))}
				</DashboardCard>

				{/* Stats and Insights */}
				<UserDashStats styles={styles} />
			</div>
		</UserLayout>
	);
}
