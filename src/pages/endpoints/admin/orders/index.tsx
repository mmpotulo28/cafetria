import UserDashOrderCard from "@/components/UserDashOrderCard";
import { useState, useEffect, useCallback, useRef } from "react";
import OrderView from "@/components/OrderView";
import { iOrder } from "@/lib/Type";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
import AdminLayout from "@/components/AdminLayout";
import styles from "../admin.module.css";
import orderStyles from "./orders.module.css";
import Chart from "chart.js/auto";

const OrdersPage: React.FC = () => {
	const { data: session } = useSession();
	const [showViewOrder, setShowViewOrder] = useState<boolean>(false);
	const [currentOrder, setCurrentOrder] = useState<iOrder | null>(null);
	const [orders, setOrders] = useState<iOrder[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
	const ordersPerPage = 9;

	const statusChartRef = useRef<HTMLCanvasElement>(null);
	const dateChartRef = useRef<HTMLCanvasElement>(null);
	const statusChartInstanceRef = useRef<Chart | null>(null);
	const dateChartInstanceRef = useRef<Chart | null>(null);

	const fetchOrders = useCallback(async () => {
		if (!session?.user?.name) return;

		try {
			// clear orders
			setOrders([]);
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
			setOrders(sortedOrders);
			Cookies.set("orders", JSON.stringify(sortedOrders), { expires: 1 / 480 });
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

	const indexOfLastOrder = currentPage * ordersPerPage;
	const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
	const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	useEffect(() => {
		const statusData = orders.reduce((acc, order) => {
			acc[order.status] = (acc[order.status] || 0) + 1;
			return acc;
		}, {} as { [key: string]: number });

		const dateData = orders.reduce((acc, order) => {
			const date = new Date(order.date).toLocaleDateString();
			acc[date] = (acc[date] || 0) + 1;
			return acc;
		}, {} as { [key: string]: number });

		if (statusChartRef.current) {
			if (statusChartInstanceRef.current) {
				statusChartInstanceRef.current.destroy();
			}

			statusChartInstanceRef.current = new Chart(statusChartRef.current, {
				type: "bar",
				data: {
					labels: Object.keys(statusData),
					datasets: [
						{
							label: "Orders by Status",
							data: Object.values(statusData),
							backgroundColor: "#36a2eb",
							borderColor: "rgb(44, 44, 44)",
							borderWidth: 2,
							borderRadius: 10,
						},
					],
				},
				options: {
					scales: {
						y: {
							beginAtZero: true,
						},
					},
				},
			});
		}

		if (dateChartRef.current) {
			if (dateChartInstanceRef.current) {
				dateChartInstanceRef.current.destroy();
			}

			dateChartInstanceRef.current = new Chart(dateChartRef.current, {
				type: "line",
				data: {
					labels: Object.keys(dateData),
					datasets: [
						{
							label: "Orders by Date",
							data: Object.values(dateData),
							backgroundColor: "#ff8f01",
							borderColor: "rgb(44, 44, 44)",
							borderWidth: 2,
						},
					],
				},
				options: {
					scales: {
						y: {
							beginAtZero: true,
						},
					},
				},
			});
		}

		return () => {
			if (statusChartInstanceRef.current) {
				statusChartInstanceRef.current.destroy();
			}
			if (dateChartInstanceRef.current) {
				dateChartInstanceRef.current.destroy();
			}
		};
	}, [orders]);

	const handleRefresh = async () => {
		setIsRefreshing(true);
		await fetchOrders();
		setIsRefreshing(false);
	};

	return (
		<AdminLayout>
			{showViewOrder && currentOrder && (
				<OrderView
					orderStyles={orderStyles}
					order={currentOrder}
					setShowViewOrder={setShowViewOrder}
					changeOrderStatus={true}
				/>
			)}

			<div className={styles.dashboardCards}>
				<div className={orderStyles.orders}>
					<h3>Orders</h3>
					<button
						onClick={handleRefresh}
						className={orderStyles.refreshButton}
						disabled={isRefreshing}>
						{isRefreshing ? "Refreshing..." : "Refresh Orders"}
					</button>
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

				<div className={styles.charts}>
					<div className={styles.chart}>
						<h2>Orders by Status</h2>
						<canvas ref={statusChartRef}></canvas>
					</div>
					<div className={styles.chart}>
						<h2>Orders by Date</h2>
						<canvas ref={dateChartRef}></canvas>
					</div>
				</div>
			</div>
		</AdminLayout>
	);
};

export default OrdersPage;
