import React, { useEffect, useRef, useState } from "react";
import Chart, { BubbleDataPoint, ChartTypeRegistry, Point } from "chart.js/auto";
import AdminLayout from "@/components/AdminLayout";
import styles from "./stock.module.css";
import axios from "axios";
import { iItem } from "@/lib/Type";

const ReportsPage: React.FC = () => {
	const stockChartRef = useRef<HTMLCanvasElement>(null);
	const priceChartRef = useRef<HTMLCanvasElement>(null);
	const valueChartRef = useRef<HTMLCanvasElement>(null);
	const categoryChartRef = useRef<HTMLCanvasElement>(null); // New chart ref
	const stockChartInstanceRef = useRef<Chart | null>(null);
	const priceChartInstanceRef = useRef<Chart | null>(null);
	const valueChartInstanceRef = useRef<Chart | null>(null);
	const categoryChartInstanceRef = useRef<Chart | null>(null); // New chart instance ref

	const [stockData, setStockData] = useState<iItem[]>([]);
	const [autoRefresh, setAutoRefresh] = useState<boolean>(false);
	const [refreshInterval, setRefreshInterval] = useState<number>(2);
	const [itemLimit, setItemLimit] = useState<number>(10); // New state for item limit

	const fetchData = async () => {
		try {
			const response = await axios.get("/api/items");
			const stock: iItem[] = await response.data;

			console.log("stock", stock);

			setStockData(stock);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		const limitedStockData = stockData.slice(0, itemLimit);

		if (stockChartRef.current) {
			stockChartInstanceRef?.current?.destroy();

			stockChartInstanceRef.current = new Chart<
				keyof ChartTypeRegistry,
				(number | [number, number] | Point | BubbleDataPoint | null)[],
				unknown
			>(stockChartRef.current, {
				type: "bar",
				data: {
					labels: limitedStockData.map((item) => item.name),
					datasets: [
						{
							label: "Stock Quantity",
							data: limitedStockData.map((item) => item.stock || 0),
							backgroundColor: "#4caf50",
							borderColor: "#388e3c",
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

		if (priceChartRef.current) {
			if (priceChartInstanceRef.current) {
				priceChartInstanceRef.current.destroy();
			}

			priceChartInstanceRef.current = new Chart<
				keyof ChartTypeRegistry,
				(number | [number, number] | Point | BubbleDataPoint | null)[],
				unknown
			>(priceChartRef.current, {
				type: "line",
				data: {
					labels: limitedStockData.map((item) => item.name),
					datasets: [
						{
							label: "Price",
							data: limitedStockData.map((item) => Number(item.price)),
							backgroundColor: "#ff9800",
							borderColor: "#f57c00",
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

		if (valueChartRef.current) {
			if (valueChartInstanceRef.current) {
				valueChartInstanceRef.current.destroy();
			}

			valueChartInstanceRef.current = new Chart<
				keyof ChartTypeRegistry,
				(number | [number, number] | Point | BubbleDataPoint | null)[],
				unknown
			>(valueChartRef.current, {
				type: "pie",
				data: {
					labels: stockData.map((item) => item.name),
					datasets: [
						{
							label: "Total Value",
							data: stockData.map((item) => (item.stock || 0) * Number(item.price)),
							backgroundColor: stockData.map(
								(_, index) => `hsl(${index * 30}, 70%, 50%)`,
							),
							borderColor: "#ffffff",
							borderWidth: 2,
						},
					],
				},
				options: {
					plugins: {
						tooltip: {
							callbacks: {
								label: (context) => {
									const item = stockData[context.dataIndex];
									return `${item.name}: ${context.raw} (Stock: ${item.stock}, Price: ${item.price})`;
								},
							},
						},
					},
				},
			});
		}

		if (categoryChartRef.current) {
			if (categoryChartInstanceRef.current) {
				categoryChartInstanceRef.current.destroy();
			}

			const categoryData = stockData.reduce((acc, item) => {
				acc[item.category] = (acc[item.category] || 0) + 1;
				return acc;
			}, {} as Record<string, number>);

			categoryChartInstanceRef.current = new Chart<
				keyof ChartTypeRegistry,
				(number | [number, number] | Point | BubbleDataPoint | null)[],
				unknown
			>(categoryChartRef.current, {
				type: "doughnut",
				data: {
					labels: Object.keys(categoryData),
					datasets: [
						{
							label: "Category Distribution",
							data: Object.values(categoryData),
							backgroundColor: Object.keys(categoryData).map(
								(_, index) => `hsl(${index * 30}, 70%, 50%)`,
							),
							borderColor: "#ffffff",
							borderWidth: 2,
						},
					],
				},
				options: {
					plugins: {
						tooltip: {
							callbacks: {
								label: (context) => {
									const category = context.label;
									const count = context.raw;
									return `${category}: ${count}`;
								},
							},
						},
					},
				},
			});
		}

		return () => {
			if (stockChartInstanceRef.current) {
				stockChartInstanceRef.current.destroy();
			}
			if (priceChartInstanceRef.current) {
				priceChartInstanceRef.current.destroy();
			}
			if (valueChartInstanceRef.current) {
				valueChartInstanceRef.current.destroy();
			}
			if (categoryChartInstanceRef.current) {
				categoryChartInstanceRef.current.destroy();
			}
		};
	}, [stockData, itemLimit]);

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
				<fieldset className={styles.fieldset}>
					<legend>Item Limit:</legend>

					{[5, 10, 20, 50, 100].map((limit) => (
						<button
							key={limit}
							onClick={() => setItemLimit(limit)}
							className={itemLimit === limit ? styles.activeButton : ""}>
							{limit}
						</button>
					))}
				</fieldset>
			</div>
			<div className={styles.charts}>
				<div className={styles.chart}>
					<h2>Stock Comparison</h2>
					<canvas ref={stockChartRef}></canvas>
				</div>
				<div className={styles.chart}>
					<h2>Price Comparison</h2>
					<canvas ref={priceChartRef}></canvas>
				</div>
				<div className={styles.chart}>
					<h2>Total Value Comparison</h2>
					<canvas ref={valueChartRef}></canvas>
				</div>
				<div className={styles.chart}>
					<h2>Category Distribution</h2>
					<canvas ref={categoryChartRef}></canvas>
				</div>
			</div>
		</AdminLayout>
	);
};

export default ReportsPage;
