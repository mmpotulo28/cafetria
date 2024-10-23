import React, { useEffect, useMemo, useRef, useState } from "react";
import Chart, { BubbleDataPoint, ChartTypeRegistry, Point } from "chart.js/auto";
import AdminLayout from "@/components/AdminLayout";
import styles from "./reports.module.css";
import axios from "axios";
import { iOrder, iOrderItem, iUserUpdateData } from "@/lib/Type";

const ReportsPage: React.FC = () => {
	const ordersChartRef = useRef<HTMLCanvasElement>(null);
	const itemsChartRef = useRef<HTMLCanvasElement>(null);
	const usersChartRef = useRef<HTMLCanvasElement>(null);
	const userTypeChartRef = useRef<HTMLCanvasElement>(null);

	const ordersChartInstanceRef = useRef<Chart | null>(null);
	const itemsChartInstanceRef = useRef<Chart | null>(null);
	const usersChartInstanceRef = useRef<Chart | null>(null);
	const userTypeChartInstanceRef = useRef<Chart | null>(null);

	const [view, setView] = useState<"week" | "month">("week");
	const [userData, setUserData] = useState<iUserUpdateData[]>([]);
	const [ordersData, setOrdersData] = useState<{ [key: string]: number }>({});
	const [itemsData, setItemsData] = useState<{ [key: string]: number }>({});

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

	console.log("userData", userData);
	console.log("userTypeData", userTypeData);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [userResponse, ordersResponse] = await Promise.all([
					axios.get("/api/user/users"),
					axios.get("/api/orders", {
						headers: {
							Authorization: `Bearer ${"nmnmn_testauth_token"}`,
						},
					}),
				]);

				const users = userResponse.data;
				const orders = ordersResponse.data;

				setUserData(users);

				const ordersPerDate = orders.reduce(
					(acc: { [key: string]: number }, order: iOrder) => {
						const date = new Date(order.date).toLocaleDateString();
						acc[date] = (acc[date] || 0) + 1;
						return acc;
					},
					{},
				);

				const itemsCount = orders.reduce(
					(acc: { [key: string]: number }, order: iOrder) => {
						order.items.forEach((item: iOrderItem) => {
							acc[item.name] = (acc[item.name] || 0) + item.quantity;
						});
						return acc;
					},
					{},
				);

				setOrdersData(ordersPerDate);
				setItemsData(itemsCount);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (ordersChartRef.current) {
			if (ordersChartInstanceRef.current) {
				ordersChartInstanceRef.current.destroy();
			}

			ordersChartInstanceRef.current = new Chart(ordersChartRef.current, {
				type: "bar",
				data: {
					labels: Object.keys(ordersData),
					datasets: [
						{
							label: "Orders per Date",
							data: Object.values(ordersData),
							backgroundColor: "#ff8f01",
							borderColor: "rgb(44, 44, 44)",
							borderWidth: 1,
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
				type: "line",
				data: {
					labels: Object.keys(itemsData),
					datasets: [
						{
							label: "Most Purchased Items",
							data: Object.values(itemsData),
							backgroundColor: "#ff8f01",
							borderColor: "rgb(44, 44, 44)",
							borderWidth: 1,
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
							data: Object.values(ordersData),
							backgroundColor: "#4caf50",
							borderColor: "#388e3c",
							borderWidth: 1,
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
							borderWidth: 1,
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
		};
	}, [itemsData, ordersData, userTypeData, view]);

	return (
		<AdminLayout>
			<div className={styles.controls}>
				<button onClick={() => setView("week")}>Weekly</button>
				<button onClick={() => setView("month")}>Monthly</button>
			</div>
			<div className={styles.charts}>
				<div className={styles.chart}>
					<canvas ref={ordersChartRef}></canvas>
				</div>
				<div className={styles.chart}>
					<canvas ref={itemsChartRef}></canvas>
				</div>
				<div className={styles.chart}>
					<canvas ref={usersChartRef}></canvas>
				</div>
				<div className={styles.chart}>
					<canvas ref={userTypeChartRef}></canvas>
				</div>
			</div>
		</AdminLayout>
	);
};

export default ReportsPage;
