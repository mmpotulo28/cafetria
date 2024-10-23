import { useState } from "react";
import { iItem } from "@/lib/Type";
import styles from "./items.module.css";

interface UpdateItemFormProps {
	item: iItem;
	onUpdate: (updatedItem: iItem) => void;
	onCancel: () => void;
}

const UpdateItemForm: React.FC<UpdateItemFormProps> = ({ item, onUpdate, onCancel }) => {
	const [updatedItem, setUpdatedItem] = useState<iItem>(item);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setUpdatedItem((prevItem) => ({ ...prevItem, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		onUpdate(updatedItem);
	};

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<label>
				Name:
				<input
					type="text"
					name="name"
					value={updatedItem?.name || ""}
					onChange={handleChange}
				/>
			</label>
			<label>
				Price:
				<input
					type="number"
					name="price"
					value={updatedItem?.price || 0}
					onChange={handleChange}
				/>
			</label>
			<label>
				Status:
				<input
					type="text"
					name="status"
					value={updatedItem?.status}
					onChange={handleChange}
				/>
			</label>
			<label>
				Category:
				<input
					type="text"
					name="category"
					value={updatedItem?.category}
					onChange={handleChange}
				/>
			</label>
			<label className={styles.textArea}>
				Description:
				<textarea
					name="description"
					value={updatedItem?.description}
					onChange={handleChange}
				/>
			</label>
			<button type="submit">Update</button>
			<button type="button" onClick={onCancel}>
				Cancel
			</button>
		</form>
	);
};

export default UpdateItemForm;
