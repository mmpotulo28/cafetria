import React, { useState } from "react";
import { items } from "@/lib/data";
import { iItem } from "@/lib/Type";
import Image from "next/image";
import styles from "./add-items.module.css";

const AdminItemSelector: React.FC = () => {
	const [selectedItems, setSelectedItems] = useState<iItem[]>([]);
	const [selectAll, setSelectAll] = useState(false);
	const [responseMessage, setResponseMessage] = useState<string | null>(null);
	const [addedItems, setAddedItems] = useState<iItem[]>([]);

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
		} else {
			setSelectedItems(items);
		}
		setSelectAll(!selectAll);
	};

	const addItemsToDatabase = async () => {
		try {
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
		} catch (error) {
			console.error("Error adding items:", error);
			setResponseMessage("Error adding items. Please try again."); // Set error message
		}
	};

	return (
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

				{responseMessage && (
					<div className={styles.response}>
						<h3>{responseMessage}</h3>
						{addedItems.length > 0 && (
							<>
								<h4>Added Items:</h4>
								<ul>
									{addedItems.map((item) => (
										<li key={item.id}>
											{item.name} - ${item.price}
										</li>
									))}
								</ul>
							</>
						)}
						{/* Additional actions can be added here */}
						<button onClick={() => window.location.reload()}>Refresh Page</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default AdminItemSelector;
