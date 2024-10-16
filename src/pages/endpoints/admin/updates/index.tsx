import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import styles from "./updates.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IUpdate } from "@/lib/Type";

const AdminUpdates: React.FC = () => {
	const [updates, setUpdates] = useState<IUpdate[]>([]);
	const [newUpdate, setNewUpdate] = useState<IUpdate>({ id: 0, text: "", author: "", date: "" });
	const [editingUpdate, setEditingUpdate] = useState<IUpdate | null>(null);
	const [isAdding, setIsAdding] = useState(false);

	useEffect(() => {
		fetchUpdates();
	}, []);

	const fetchUpdates = async () => {
		try {
			const response = await fetch("/api/updates");
			const data = await response.json();
			if (Array.isArray(data)) {
				setUpdates(data);
			} else {
				console.error("Fetched data is not an array:", data);
			}
		} catch (error) {
			console.error("Error fetching updates:", error);
		}
	};

	const handleAddUpdate = async () => {
		setIsAdding(true);
		try {
			const response = await fetch("/api/updates", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newUpdate),
			});

			if (!response.ok) {
				throw new Error("Failed to add update");
			}

			setNewUpdate({ id: 0, text: "", author: "", date: "" });
			fetchUpdates();
		} catch (error) {
			console.error("Error adding update:", error);
		} finally {
			setIsAdding(false);
		}
	};

	const handleEditUpdate = async (update: IUpdate) => {
		try {
			const response = await fetch(`/api/updates`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(update),
			});

			if (!response.ok) {
				throw new Error("Failed to edit update");
			}

			setEditingUpdate(null);
			fetchUpdates();
		} catch (error) {
			console.error("Error editing update:", error);
		}
	};

	const handleDeleteUpdate = async (id: number) => {
		try {
			const response = await fetch(`/api/updates?id=${id}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error("Failed to delete update");
			}

			fetchUpdates();
		} catch (error) {
			console.error("Error deleting update:", error);
		}
	};

	return (
		<AdminLayout>
			<div className={styles.adminUpdates}>
				<h2>Admin Updates</h2>

				<div className={styles.addUpdate}>
					<h3>Add New Update</h3>
					<div className={styles.inputs}>
						<input
							type="text"
							placeholder="Text"
							value={newUpdate.text}
							onChange={(e) => setNewUpdate({ ...newUpdate, text: e.target.value })}
						/>
						<input
							type="text"
							placeholder="Author"
							value={newUpdate.author}
							onChange={(e) => setNewUpdate({ ...newUpdate, author: e.target.value })}
						/>
						<input
							type="date"
							placeholder="Date"
							value={newUpdate.date}
							onChange={(e) => setNewUpdate({ ...newUpdate, date: e.target.value })}
						/>
						<button onClick={handleAddUpdate} disabled={isAdding}>
							{isAdding ? "Adding..." : "Add Update"}
						</button>
					</div>
					{isAdding && <p>Adding update, please wait...</p>}
				</div>

				<div className={styles.updateList}>
					<h3>Existing Updates</h3>
					<table>
						<thead>
							<tr>
								<th>Text</th>
								<th>Author</th>
								<th>Date</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{Array.isArray(updates) &&
								updates.map((update) => (
									<tr key={update.id}>
										<td>{update.text}</td>
										<td>{update.author}</td>
										<td>{new Date(update.date).toLocaleDateString()}</td>
										<td>
											<td>
												<button onClick={() => setEditingUpdate(update)}>
													<FaEdit />
												</button>
												<button
													onClick={() => handleDeleteUpdate(update.id)}>
													<FaTrash />
												</button>
											</td>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>

				{editingUpdate && (
					<div className={styles.addUpdate + " " + styles.popup}>
						<h3>Edit Update</h3>

						<div className={styles.inputs}>
							<input
								type="text"
								placeholder="Text"
								value={editingUpdate.text}
								onChange={(e) =>
									setEditingUpdate({ ...editingUpdate, text: e.target.value })
								}
							/>
							<input
								type="text"
								placeholder="Author"
								value={editingUpdate.author}
								onChange={(e) =>
									setEditingUpdate({ ...editingUpdate, author: e.target.value })
								}
							/>
							<input
								type="date"
								placeholder="Date"
								value={editingUpdate.date}
								onChange={(e) =>
									setEditingUpdate({ ...editingUpdate, date: e.target.value })
								}
							/>
							<button onClick={() => handleEditUpdate(editingUpdate)}>
								Save Changes
							</button>
							<button onClick={() => setEditingUpdate(null)}>Cancel</button>
						</div>
					</div>
				)}
			</div>
		</AdminLayout>
	);
};

export default AdminUpdates;
