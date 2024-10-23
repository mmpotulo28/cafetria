import { useState, useEffect, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import AdminLayout from "@/components/AdminLayout";
import styles from "../admin.module.css";
import itemStyles from "./items.module.css";
import { iItem } from "@/lib/Type";
import Image from "next/image";
import Chart from "chart.js/auto";
import UpdateItemForm from "./UpdateItemForm";

const AdminItemsPage: React.FC = () => {
	const { data: session } = useSession();
	const [items, setItems] = useState<iItem[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [statusMessage, setStatusMessage] = useState<string | null>(null);
	const [editingItem, setEditingItem] = useState<iItem | null>(null);
	const itemsPerPage = 9;

	const categoryChartRef = useRef<HTMLCanvasElement>(null);
	const statusChartRef = useRef<HTMLCanvasElement>(null);
	const categoryChartInstanceRef = useRef<Chart | null>(null);
	const statusChartInstanceRef = useRef<Chart | null>(null);

	const fetchItems = useCallback(async () => {
		if (!session?.user?.name) return;

		try {
			const response = await fetch(`/api/items`);
			const data = await response.json();
			setItems(data);
		} catch (error) {
			console.error("Error fetching items:", error);
		}
	}, [session?.user?.name]);

	useEffect(() => {
		if (!session?.user?.email) return;
		fetchItems();
	}, [fetchItems, session?.user?.email]);

	const deleteItem = async (id: number) => {
		try {
			const response = await fetch(`/api/items?id=${id}`, {
				method: "DELETE",
			});
			if (response.ok) {
				setStatusMessage("Item deleted successfully.");
				setItems(items.filter((item) => item.id !== id));
			} else {
				setStatusMessage("Failed to delete item.");
			}
		} catch (error) {
			console.error("Error deleting item:", error);
			setStatusMessage("Error deleting item.");
		}
	};

	const updateItem = async (updatedItem: iItem) => {
		try {
			const response = await fetch(`/api/items?id=${updatedItem.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedItem),
			});

			if (response.ok) {
				setItems((prevItems) =>
					prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
				);
				setEditingItem(null);
				setStatusMessage("Item updated successfully.");
			} else {
				setStatusMessage("Failed to update item.");
			}
		} catch (error) {
			console.error("Error updating item:", error);
			setStatusMessage("Error updating item.");
		}
	};

	useEffect(() => {
		if (statusMessage) {
			const timer = setTimeout(() => {
				setStatusMessage(null);
			}, 30000); // 30 seconds

			return () => clearTimeout(timer);
		}
	}, [statusMessage]);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	useEffect(() => {
		const categoryData = items.reduce((acc, item) => {
			acc[item.category] = (acc[item.category] || 0) + 1;
			return acc;
		}, {} as { [key: string]: number });

		const statusData = items.reduce((acc, item) => {
			acc[item.status] = (acc[item.status] || 0) + 1;
			return acc;
		}, {} as { [key: string]: number });

		const createChart = (
			ref: React.RefObject<HTMLCanvasElement>,
			data: { [key: string]: number },
			label: string,
			backgroundColor: string,
		) => {
			if (ref.current) {
				const chartInstance = new Chart(ref.current, {
					type: "bar",
					data: {
						labels: Object.keys(data),
						datasets: [
							{
								label,
								data: Object.values(data),
								backgroundColor,
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
				return chartInstance;
			}
			return null;
		};

		if (categoryChartInstanceRef.current) categoryChartInstanceRef.current.destroy();
		categoryChartInstanceRef.current = createChart(
			categoryChartRef,
			categoryData,
			"Items by Category",
			"#36a2eb",
		);

		if (statusChartInstanceRef.current) statusChartInstanceRef.current.destroy();
		statusChartInstanceRef.current = createChart(
			statusChartRef,
			statusData,
			"Items by Status",
			"#ff8f01",
		);

		return () => {
			if (categoryChartInstanceRef.current) categoryChartInstanceRef.current.destroy();
			if (statusChartInstanceRef.current) statusChartInstanceRef.current.destroy();
		};
	}, [items]);

	return (
		<AdminLayout>
			<div className={styles.dashboardCards}>
				<div className={itemStyles.items}>
					<h3>Items</h3>
					{statusMessage && <p>{statusMessage}</p>}
					{editingItem ? (
						<UpdateItemForm
							item={editingItem}
							onUpdate={updateItem}
							onCancel={() => setEditingItem(null)}
						/>
					) : (
						<>
							<table className={itemStyles.itemsTable}>
								<thead>
									<tr>
										<th>Image</th>
										<th>Name</th>
										<th>Price</th>
										<th>Status</th>
										<th>Category</th>
										<th>Description</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{currentItems.map((item) => (
										<tr key={item.id}>
											<td>
												<Image
													src={`/images/${item.img}`}
													alt="item image"
													className={itemStyles.image}
													width={40}
													height={40}
												/>
											</td>
											<td>{item.name}</td>
											<td>{item.price}</td>
											<td>{item.status}</td>
											<td>{item.category}</td>
											<td>{item.description}</td>
											<td>
												<button onClick={() => deleteItem(item.id)}>
													Delete
												</button>
												<button onClick={() => setEditingItem(item)}>
													Edit
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<div className={itemStyles.pagination}>
								{Array.from(
									{ length: Math.ceil(items.length / itemsPerPage) },
									(_, index) => (
										<button
											key={index + 1}
											onClick={() => paginate(index + 1)}
											className={
												currentPage === index + 1
													? itemStyles.activePage
													: ""
											}>
											{index + 1}
										</button>
									),
								)}
							</div>
							<div className={itemStyles.charts}>
								<div className={itemStyles.chart}>
									<h2>Items by Category</h2>
									<canvas ref={categoryChartRef}></canvas>
								</div>
								<div className={itemStyles.chart}>
									<h2>Items by Status</h2>
									<canvas ref={statusChartRef}></canvas>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</AdminLayout>
	);
};

export default AdminItemsPage;
