import React, { useState } from "react";
import { items } from "@/lib/data";
import { iItem } from "@/lib/Type";
import Image from "next/image";
import styles from "./add-items.module.css";
import AdminLayout from "@/components/AdminLayout";

const AdminItemSelector: React.FC = () => {
	const [selectedItems, setSelectedItems] = useState<iItem[]>([]);
	const [selectAll, setSelectAll] = useState(false);
	const [responseMessage, setResponseMessage] = useState<string | null>(null);
	const [addedItems, setAddedItems] = useState<iItem[]>([]);
	const [logs, setLogs] = useState<string[]>([]);

	const handleSelectItem = (item: iItem) => {
		if (selectedItems.includes(item)) {
			setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
		} else {
			setSelectedItems([...selectedItems, item]);
		}
	};

	const handleSelectAll = () => {
		if (selectAll) {
			setSelectedItems([]);
			setLogs((prevLogs) => [...prevLogs, "Deselected all items"]);
		} else {
			setSelectedItems(items);
			setLogs((prevLogs) => [...prevLogs, "Selected all items"]);
		}
		setSelectAll(!selectAll);
	};

	const addItemsToDatabase = async () => {
		try {
			setLogs((prevLogs) => [...prevLogs, "Fetching endpoint..."]);
			const response = await fetch("/api/items", {
				credentials: "include",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(selectedItems),
			});

			if (!response.ok) {
				throw new Error("Failed to add items");
			}

			const data = await response.json();
			setResponseMessage(data.message); // Set success message
			setAddedItems(selectedItems); // Store added items for preview
			setSelectedItems([]); // Clear selection after successful addition
			setSelectAll(false); // Reset select all checkbox
			setLogs((prevLogs) => [...prevLogs, "Items added successfully"]);
		} catch (error) {
			console.error("Error adding items:", error);
			setResponseMessage("Error adding items. Please try again."); // Set error message
			setLogs((prevLogs) => [...prevLogs, "Error adding items"]);
		}
	};

	return (
		<AdminLayout>
			<div className={styles.addItems}>
				<h2>Select Items to Add</h2>

				<div className={styles.addItemsContainer}>
					<div className={styles.itemList}>
						<button onClick={handleSelectAll}>
							{selectAll ? "Deselect All" : "Select All"}
						</button>
						{items.map((item) => (
							<div
								key={item.id}
								className={styles.item}
								onClick={() => handleSelectItem(item)}>
								<input
									type="checkbox"
									checked={selectedItems.includes(item)}
									onChange={() => handleSelectItem(item)}
								/>
								<Image
									src={`/images/${item.img}`}
									alt={item.name}
									width={50}
									height={50}
								/>
								<span>
									{item.name} - ${item.price}
								</span>
							</div>
						))}
					</div>

					<div className={styles.selectedItems}>
						<h3>Selected Items</h3>
						<div className={styles.selectedItemsList}>
							{selectedItems.map((item) => (
								<div key={item.id} className={styles.item}>
									<Image
										src={`/images/${item.img}`}
										alt={item.name}
										width={"50"}
										height={50}
									/>
									<span>
										{item.name} - ${item.price}
									</span>
								</div>
							))}
						</div>

						<button onClick={addItemsToDatabase}>Add to Database</button>
					</div>
				</div>
				<div className={styles.response}>
					<h3>{responseMessage}</h3>
					{addedItems.length > 0 && (
						<>
							<h4>Added Items:</h4>
							<ul>
								{addedItems?.map((item) => (
									<li key={item.id}>
										{item.name} - ${item.price}
									</li>
								))}
							</ul>
						</>
					)}
					<button onClick={() => window.location.reload()}>Refresh Page</button>
				</div>

				<div className={styles.terminal}>
					<h3>API Logs</h3>
					<div className={styles.logs}>
						{logs.map((log, index) => (
							<p key={index}>
								{new Date().toLocaleTimeString("en-GB")} - {log}
							</p>
						))}
					</div>
				</div>
			</div>
		</AdminLayout>
	);
};

export default AdminItemSelector;
