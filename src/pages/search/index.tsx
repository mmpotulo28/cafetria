import React, { useState } from "react";
import { searchClient } from "@algolia/client-search";
import styles from "./search.module.css";

const client = searchClient(
	process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID || "",
	process.env.NEXT_PUBLIC_ALGOLIA_API_KEY || "",
);

const SearchPage = () => {
	const [status, setStatus] = useState("");
	const [data, setData] = useState(null);

	const handleButtonClick = async () => {
		setStatus("Processing...");
		try {
			const datasetRequest = await fetch("/api/items");
			const items = await datasetRequest.json();
			await client.saveObjects({ indexName: "items_index", objects: items });
			setStatus("Successfully indexed objects!");
			setData(items);
		} catch (err) {
			setStatus("Error indexing objects.");
			console.error(err);
		}
	};

	return (
		<div className={styles.search}>
			<button onClick={handleButtonClick}>Index Objects</button>
			<p>Status: {status}</p>
			{data && <pre className={styles.json}>{JSON.stringify(data, null, 2)}</pre>}
		</div>
	);
};

export default SearchPage;
