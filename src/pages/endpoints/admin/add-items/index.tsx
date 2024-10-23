import React, { useState } from "react";
import { iItem } from "@/lib/Type";
import styles from "./add-items.module.css";
import AdminLayout from "@/components/AdminLayout";

const imageOptions = [
	"applepay.jpg",
	"appletiser.webp",
	"cheese-pizza.jpeg",
	"chicken-burger.jpeg",
	"chicken-burger.png",
	"chip-roll.png",
	"chip-roll.webp",
	"chocolate-cake.jpeg",
	"coke.png",
	"cput-logo.png",
	"cupcake.jpeg",
	"fanta.png",
	"fries.jpeg",
	"gatsby.png",
	"gpay.png",
	"ice-cream.png",
	"logo.jpeg",
	"mastercard-logo.png",
	"mastercard.jpeg",
	"menu-1.png",
	"menu-2.png",
	"menu-3.png",
	"menu-back.png",
	"menu-whole.png",
	"mirinda.jpeg",
	"monster.jpeg",
	"monster.png",
	"muffins.png",
	"nedbank-log.png",
	"pap-meal.png",
	"paypal.png",
	"pepsi.png",
	"pies.png",
	"placeholder-image.webp",
	"reboost.jpeg",
	"red-bull.jpeg",
	"red-bull.png",
	"scones.jpeg",
	"score-logo.png",
	"score.jpeg",
	"spinach-smoothie.png",
	"sprite.png",
	"stoney.jpeg",
	"varsityvibe-log.png",
	"vetkoek-plain.jpg",
	"vetkook-mince.jpg",
	"yoghurt.jpeg",
];

const AdminItemForm: React.FC = () => {
	const [itemDetails, setItemDetails] = useState<iItem>({
		id: 0,
		name: "",
		price: "0",
		status: "in-stock",
		img: "placeholder-image.webp",
		recommended: false,
		category: "All",
		description: "",
		options: {
			name: "",
			opt: [],
		},
	});
	const [responseMessage, setResponseMessage] = useState<string | null>(null);
	const [addedItems, setAddedItems] = useState<iItem[]>([]);
	const [logs, setLogs] = useState<string[]>([]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;

		if (name.startsWith("options.")) {
			const optionField = name.split(".")[1];
			setItemDetails((prevDetails) => ({
				...prevDetails,
				options: {
					...prevDetails.options,
					[optionField]: value,
				},
			}));
		} else {
			setItemDetails((prevDetails) => ({
				...prevDetails,
				[name]: name === "price" ? parseFloat(value) : value,
			}));
		}
	};

	const addItemToDatabase = async () => {
		try {
			setLogs((prevLogs) => [...prevLogs, "Fetching endpoint..."]);
			const response = await fetch("/api/items", {
				credentials: "include",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify([itemDetails]),
			});

			if (!response.ok) {
				throw new Error("Failed to add item");
			}

			const data = await response.json();
			setResponseMessage(data.message); // Set success message
			setAddedItems((prevItems) => [...prevItems, itemDetails]); // Store added item for preview
			setItemDetails({
				id: 0,
				name: "",
				price: "0",
				status: "in-stock",
				img: "placeholder-image.webp",
				recommended: false,
				category: "All",
				description: "",
				options: {
					name: "",
					opt: [],
				},
			}); // Clear form after successful addition
			setLogs((prevLogs) => [...prevLogs, "Item added successfully"]);
		} catch (error) {
			console.error("Error adding item:", error);
			setResponseMessage("Error adding item. Please try again."); // Set error message
			setLogs((prevLogs) => [...prevLogs, "Error adding item"]);
		}
	};

	return (
		<AdminLayout>
			<div className={styles.addItems}>
				<h2>Add New Item</h2>

				<div className={styles.addItemsContainer}>
					<div className={styles.itemForm}>
						<label>
							Item ID:
							<input
								type="text"
								name="id"
								value={itemDetails.id}
								onChange={handleChange}
							/>
						</label>
						<label>
							Item Name:
							<input
								type="text"
								name="name"
								value={itemDetails.name}
								onChange={handleChange}
							/>
						</label>
						<label>
							Item Price:
							<input
								type="number"
								name="price"
								value={itemDetails.price}
								onChange={handleChange}
							/>
						</label>
						<label>
							Status:
							<select
								name="status"
								value={itemDetails.status}
								onChange={handleChange}>
								<option value="in-stock">In Stock</option>
								<option value="out-of-stock">Out of Stock</option>
							</select>
						</label>
						<label>
							Image Name:
							<select name="img" value={itemDetails.img} onChange={handleChange}>
								{imageOptions.map((image) => (
									<option key={image} value={image}>
										{image}
									</option>
								))}
							</select>
						</label>
						<label>
							Recommended:
							<input
								type="checkbox"
								name="recommended"
								checked={itemDetails.recommended}
								onChange={(e) =>
									setItemDetails((prevDetails) => ({
										...prevDetails,
										recommended: e.target.checked,
									}))
								}
							/>
						</label>
						<label>
							Category:
							<select
								name="category"
								value={itemDetails.category}
								onChange={handleChange}>
								<option value="All">All</option>
								<option value="Fast Food">Fast Food</option>
								<option value="Snacks">Snacks</option>
								<option value="Cold Drinks">Cold Drinks</option>
								<option value="Meals">Meals</option>
							</select>
						</label>
						<label>
							Description:
							<input
								type="text"
								name="description"
								value={itemDetails.description}
								onChange={handleChange}
							/>
						</label>
						<label>
							Options Name:
							<input
								type="text"
								name="options.name"
								value={itemDetails.options.name}
								onChange={handleChange}
							/>
						</label>
						<label>
							Options:
							<input
								type="text"
								name="options.opt"
								value={itemDetails.options.opt.join(", ")}
								onChange={(e) =>
									setItemDetails((prevDetails) => ({
										...prevDetails,
										options: {
											...prevDetails.options,
											opt: e.target.value.split(",").map((opt) => opt.trim()),
										},
									}))
								}
							/>
						</label>
						<button onClick={addItemToDatabase}>Add to Database</button>
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

export default AdminItemForm;
