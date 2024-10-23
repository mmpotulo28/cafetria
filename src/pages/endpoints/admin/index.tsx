import React, { useEffect, useMemo, useRef, useState } from "react";
import Chart, { BubbleDataPoint, ChartTypeRegistry, Point } from "chart.js/auto";
import AdminLayout from "@/components/AdminLayout";
import styles from "./reports.module.css";
import axios from "axios";
import { iOrder, iOrderItem, iUserUpdateData, iItem } from "@/lib/Type";

const ReportsPage: React.FC = () => {
	const ordersChartRef = useRef<HTMLCanvasElement>(null);
	const itemsChartRef = useRef<HTMLCanvasElement>(null);
	const usersChartRef = useRef<HTMLCanvasElement>(null);
	const userTypeChartRef = useRef<HTMLCanvasElement>(null);
	const stockChartRef = useRef<HTMLCanvasElement>(null);
	const customersChartRef = useRef<HTMLCanvasElement>(null);

	const ordersChartInstanceRef = useRef<Chart | null>(null);
	const itemsChartInstanceRef = useRef<Chart | null>(null);
	const usersChartInstanceRef = useRef<Chart | null>(null);
	const userTypeChartInstanceRef = useRef<Chart | null>(null);
	const stockChartInstanceRef = useRef<Chart | null>(null);
	const customersChartInstanceRef = useRef<Chart | null>(null);

	const [view, setView] = useState<"week" | "month">("week");
	const [limit, setLimit] = useState<number>(5);
	const [userData, setUserData] = useState<iUserUpdateData[]>([]);
	const [ordersData, setOrdersData] = useState<{ [key: string]: number }>({});
	const [itemsData, setItemsData] = useState<{ [key: string]: number }>({});
	const [stockData, setStockData] = useState<{ inStock: number; outOfStock: number }>({
		inStock: 0,
		outOfStock: 0,
	});
	const [customerOrdersData, setCustomerOrdersData] = useState<{ [key: string]: number }>({});

	const [autoRefresh, setAutoRefresh] = useState<boolean>(false);
	const [refreshInterval, setRefreshInterval] = useState<number>(2);

	const userTypeData = useMemo(() => {
		const userTypes = userData.reduce(
			(acc, user) => {
				if (user.user_type === "customer") acc[0]++;
				else if (user.user_type === "admin") acc[1]++;
				else if (user.user_type === "cashier") acc[2]++;
				else if (user.user_type === "chef") acc[3]++;
				return acc;
			},
			[0, 0, 0, 0],
		);
		return userTypes;
	}, [userData]);

	const fetchData = async () => {
		try {
			const [userResponse, ordersResponse, itemsResponse] = await Promise.all([
				axios.get("/api/user/users"),
				axios.get("/api/orders", {
					headers: {
						Authorization: `Bearer ${"nmnmn_testauth_token"}`,
					},
				}),
				axios.get("/api/items"),
			]);

			const users = userResponse.data;
			const orders = ordersResponse.data;
			const items = itemsResponse.data;

			setUserData(users);

			const ordersPerDate = orders.reduce((acc: { [key: string]: number }, order: iOrder) => {
				const date = new Date(order.date).toLocaleDateString();
				acc[date] = (acc[date] || 0) + 1;
				return acc;
			}, {});

			const itemsCount = orders.reduce((acc: { [key: string]: number }, order: iOrder) => {
				order.items.forEach((item: iOrderItem) => {
					acc[item.name] = (acc[item.name] || 0) + item.quantity;
				});
				return acc;
			}, {});

			const stockStatus = items.reduce(
				(acc: { inStock: number; outOfStock: number }, item: iItem) => {
					if (item.status === "in-stock") acc.inStock++;
					else if (item.status === "out-off-stock") acc.outOfStock++;
					return acc;
				},
				{ inStock: 0, outOfStock: 0 },
			);

			const customerOrders = orders.reduce(
				(acc: { [key: string]: number }, order: iOrder) => {
					acc[order.username] = (acc[order.username] || 0) + 1;

					return acc;
				},
				{},
			);

			setOrdersData(ordersPerDate);
			setItemsData(itemsCount);
			setStockData(stockStatus);
			setCustomerOrdersData(customerOrders);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		const limitedOrdersData = Object.entries(ordersData)
			.slice(0, limit)
			.reduce((acc, [key, value]) => {
				acc[key] = value;
				return acc;
			}, {} as { [key: string]: number });

		const limitedItemsData = Object.entries(itemsData)
			.slice(0, limit)
			.reduce((acc, [key, value]) => {
				acc[key] = value;
				return acc;
			}, {} as { [key: string]: number });

		const limitedCustomerOrdersData = Object.entries(customerOrdersData)
			.slice(0, limit)
			.reduce((acc, [key, value]) => {
				acc[key] = value;
				return acc;
			}, {} as { [key: string]: number });

		if (ordersChartRef.current) {
			if (ordersChartInstanceRef.current) {
				ordersChartInstanceRef.current.destroy();
			}

			ordersChartInstanceRef.current = new Chart(ordersChartRef.current, {
				type: "line",
				data: {
					labels: Object.keys(limitedOrdersData),
					datasets: [
						{
							label: "Orders per Date",
							data: Object.values(limitedOrdersData),
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

		if (itemsChartRef.current) {
			if (itemsChartInstanceRef.current) {
				itemsChartInstanceRef.current.destroy();
			}

			itemsChartInstanceRef.current = new Chart(itemsChartRef.current, {
				type: "bar",
				data: {
					labels: Object.keys(limitedItemsData),
					datasets: [
						{
							label: "Most Purchased Items",
							data: Object.values(limitedItemsData),
							backgroundColor: "#ff8f01",
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

		if (usersChartRef.current) {
			if (usersChartInstanceRef.current) {
				usersChartInstanceRef.current.destroy();
			}

			usersChartInstanceRef.current = new Chart(usersChartRef.current, {
				type: "line",
				data: {
					labels:
						view === "week"
							? [
									"Monday",
									"Tuesday",
									"Wednesday",
									"Thursday",
									"Friday",
									"Saturday",
									"Sunday",
							  ]
							: [
									"Jan",
									"Feb",
									"Mar",
									"Apr",
									"May",
									"Jun",
									"Jul",
									"Aug",
									"Sep",
									"Oct",
									"Nov",
									"Dec",
							  ],
					datasets: [
						{
							label: "User Registrations",
							data: Object.values(limitedOrdersData),
							backgroundColor: "#4caf50",
							borderColor: "#388e3c",
							borderWidth: 2,
							fill: false,
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

		if (userTypeChartRef.current) {
			if (userTypeChartInstanceRef.current) {
				userTypeChartInstanceRef.current.destroy();
			}

			userTypeChartInstanceRef.current = new Chart<
				keyof ChartTypeRegistry,
				(number | [number, number] | Point | BubbleDataPoint | null)[],
				unknown
			>(userTypeChartRef.current!, {
				type: "pie",
				data: {
					labels: ["Customer", "Admin", "Cashier", "Chefs"],
					datasets: [
						{
							label: "Users",
							data: userTypeData,
							backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"],
							borderColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"],
							borderWidth: 2,
							borderRadius: 10,
						},
					],
				},
				options: {
					plugins: {
						legend: {
							position: "right",
						},
					},
				},
			});
		}

		if (stockChartRef.current) {
			if (stockChartInstanceRef.current) {
				stockChartInstanceRef.current.destroy();
			}

			stockChartInstanceRef.current = new Chart<
				keyof ChartTypeRegistry,
				(number | [number, number] | Point | BubbleDataPoint | null)[],
				unknown
			>(stockChartRef.current, {
				type: "pie",
				data: {
					labels: ["In Stock", "Out of Stock"],
					datasets: [
						{
							label: "Stock Status",
							data: [stockData.inStock, stockData.outOfStock],
							backgroundColor: ["#4caf50", "#f44336"],
							borderColor: ["#4caf50", "#f44336"],
							borderWidth: 2,
							borderRadius: 10,
						},
					],
				},
				options: {
					plugins: {
						legend: {
							position: "right",
						},
					},
				},
			});
		}

		if (customersChartRef.current) {
			if (customersChartInstanceRef.current) {
				customersChartInstanceRef.current.destroy();
			}

			customersChartInstanceRef.current = new Chart(customersChartRef.current, {
				type: "bar",
				data: {
					labels: Object.keys(limitedCustomerOrdersData),
					datasets: [
						{
							label: "Orders per Customer",
							data: Object.values(limitedCustomerOrdersData),
							backgroundColor: "#ff8f01",
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

		return () => {
			if (ordersChartInstanceRef.current) {
				ordersChartInstanceRef.current.destroy();
			}
			if (itemsChartInstanceRef.current) {
				itemsChartInstanceRef.current.destroy();
			}
			if (usersChartInstanceRef.current) {
				usersChartInstanceRef.current.destroy();
			}
			if (userTypeChartInstanceRef.current) {
				userTypeChartInstanceRef.current.destroy();
			}
			if (stockChartInstanceRef.current) {
				stockChartInstanceRef.current.destroy();
			}
			if (customersChartInstanceRef.current) {
				customersChartInstanceRef.current.destroy();
			}
		};
	}, [itemsData, ordersData, userTypeData, stockData, customerOrdersData, view, limit]);

	useEffect(() => {
		let intervalId: NodeJS.Timeout | null = null;

		if (autoRefresh) {
			intervalId = setInterval(() => {
				fetchData();
			}, refreshInterval * 60 * 1000);
		}

		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [autoRefresh, refreshInterval]);

	return (
		<AdminLayout>
			<div className={styles.controls}>
				<fieldset className={styles.fieldset}>
					<legend>View:</legend>
					<button
						className={view === "month" ? styles.activeBtn : ""}
						onClick={() => setView("month")}>
						Monthly
					</button>
					<button
						className={view === "week" ? styles.activeBtn : ""}
						onClick={() => setView("week")}>
						Weekly
					</button>
				</fieldset>

				<fieldset className={styles.fieldset}>
					<legend>Limit:</legend>
					<button
						className={limit === 5 ? styles.activeBtn : ""}
						onClick={() => setLimit(5)}>
						5
					</button>
					<button
						className={limit === 10 ? styles.activeBtn : ""}
						onClick={() => setLimit(10)}>
						10
					</button>
					<button
						className={limit === 30 ? styles.activeBtn : ""}
						onClick={() => setLimit(30)}>
						30
					</button>
					<button
						className={limit === 60 ? styles.activeBtn : ""}
						onClick={() => setLimit(60)}>
						60
					</button>
				</fieldset>

				<fieldset className={styles.fieldset}>
					<legend>Refresh:</legend>
					<button onClick={fetchData}>Refresh Data</button>
					<button onClick={() => setAutoRefresh(!autoRefresh)}>
						{autoRefresh ? "Stop Auto-Refresh" : "Start Auto-Refresh"}
					</button>
					{autoRefresh && (
						<div>
							<label>Refresh Interval:</label>
							<select
								value={refreshInterval}
								onChange={(e) => setRefreshInterval(Number(e.target.value))}>
								<option value={2}>2 min</option>
								<option value={5}>5 min</option>
								<option value={10}>10 min</option>
							</select>
						</div>
					)}
				</fieldset>
			</div>
			<div className={styles.charts}>
				<div className={styles.chart}>
					<h2>Orders per Date</h2>
					<canvas ref={ordersChartRef}></canvas>
				</div>
				<div className={styles.chart}>
					<h2>Most Purchased Items</h2>
					<canvas ref={itemsChartRef}></canvas>
				</div>
				<div className={styles.chart}>
					<h2>User Registrations</h2>
					<canvas ref={usersChartRef}></canvas>
				</div>
				<div className={styles.chart}>
					<h2>User Types</h2>
					<canvas ref={userTypeChartRef}></canvas>
				</div>
				<div className={styles.chart}>
					<h2>Stock Comparison</h2>
					<canvas ref={stockChartRef}></canvas>
				</div>
				<div className={styles.chart}>
					<h2>Top Customers</h2>
					<canvas ref={customersChartRef}></canvas>
				</div>
			</div>
		</AdminLayout>
	);
};

export default ReportsPage;
