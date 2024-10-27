import { iItem } from "./Type";

const addItemsToDatabase = async (items: iItem[]) => {
	try {
		const response = await fetch("/api/items", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(items),
		});

		if (!response.ok) {
			throw new Error("Failed to add items");
		}

		// const data = await response.json();
	} catch (error) {
		console.error("Error adding items:", error);
	}
};

export { addItemsToDatabase };
