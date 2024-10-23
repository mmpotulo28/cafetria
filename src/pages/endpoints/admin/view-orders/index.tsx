import UserDashOrderCard from "@/components/UserDashOrderCard";
import { useState, useEffect, useCallback } from "react";
import OrderView from "@/components/OrderView";
import { iOrder } from "@/lib/Type";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
import AdminLayout from "@/components/AdminLayout";
import styles from "../admin.module.css";
import orderStyles from "./orders.module.css";

const OrdersPage: React.FC = () => {
	const { data: session } = useSession();
	const [showViewOrder, setShowViewOrder] = useState<boolean>(false);
	const [currentOrder, setCurrentOrder] = useState<iOrder | null>(null);
	const [orders, setOrders] = useState<iOrder[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const ordersPerPage = 9;

	const fetchOrders = useCallback(async () => {
		if (!session?.user?.name) return;

		try {
			const token = "adminauthtest";
			const response = await fetch(`/api/orders?username=${session.user.name}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();
			const sortedOrders = data.sort(
				(a: iOrder, b: iOrder) => new Date(b.date).getTime() - new Date(a.date).getTime(),
			);
			console.log("sortedOrders", sortedOrders);
			setOrders(sortedOrders);
			Cookies.set("orders", JSON.stringify(sortedOrders), { expires: 1 / 480 }); // 3 minutes
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
					console.log("cachedOrders", parsedOrders);
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

	const indexOfLastOrder = currentPage * ordersPerPage;
	const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
	const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	return (
		<AdminLayout>
			{showViewOrder && currentOrder && (
				<OrderView
					orderStyles={orderStyles}
					order={currentOrder}
					setShowViewOrder={setShowViewOrder}
				/>
			)}

			<div className={styles.dashboardCards}>
				<div className={orderStyles.orders}>
					<h3>Orders</h3>
					<div className={orderStyles.ordersGrid}>
						{currentOrders?.map((order) => (
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
					<div className={orderStyles.pagination}>
						{Array.from(
							{ length: Math.ceil(orders.length / ordersPerPage) },
							(_, index) => (
								<button
									key={index + 1}
									onClick={() => paginate(index + 1)}
									className={
										currentPage === index + 1 ? orderStyles.activePage : ""
									}>
									{index + 1}
								</button>
							),
						)}
					</div>
				</div>
			</div>
		</AdminLayout>
	);
};

export default OrdersPage;
