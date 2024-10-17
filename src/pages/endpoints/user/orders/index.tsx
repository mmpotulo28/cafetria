import UserDashStats from "@/components/UserDashStats";
import UserLayout from "../UserLayout";
import styles from "../styles.module.css";
import orderStyles from "./styles.module.css";
import UserDashOrderCard from "@/components/UserDashOrderCard";
import { useState, useEffect, useCallback } from "react";
import OrderView from "@/components/OrderView";
import { iOrder } from "@/lib/Type";

const OrdersPage: React.FC = () => {
	const [showViewOrder, setShowViewOrder] = useState<boolean>(false);
	const [currentOrder, setCurrentOrder] = useState<iOrder | null>(null);
	const [orders, setOrders] = useState<iOrder[]>([]);

	const fetchOrders = useCallback(async () => {
		try {
			const response = await fetch("/api/orders");
			const data = await response.json();
			setOrders(data);
		} catch (error) {
			console.error("Error fetching orders:", error);
		}
	}, []);

	useEffect(() => {
		fetchOrders();
	}, [fetchOrders]);

	return (
		<UserLayout>
			{showViewOrder && currentOrder && (
				<OrderView
					orderStyles={orderStyles}
					order={currentOrder}
					setShowViewOrder={setShowViewOrder}
				/>
			)}
			<div className={styles.welcomeMessage}>
				<h1>Welcome, [User Name]!</h1>
				<p>Here&apos;s a quick overview of your account and recent activities.</p>
			</div>

			<div className={styles.dashboardCards}>
				<div className={orderStyles.orders}>
					<h3>Orders</h3>
					<div className={orderStyles.ordersGrid}>
						{orders.map((order) => (
							<UserDashOrderCard
								key={order.id}
								styles={styles}
								orderStyles={orderStyles}
								order={order}
								setShowViewOrder={setShowViewOrder}
								setCurrentOrder={setCurrentOrder}
							/>
						))}
					</div>
				</div>
				<UserDashStats styles={styles} />
			</div>
		</UserLayout>
	);
};

export default OrdersPage;
