import { IUpdate } from "@/lib/Type";
import React, { useEffect, useState, useRef, useCallback } from "react";

const Updates: React.FC = () => {
	const [updates, setUpdates] = useState<IUpdate[]>([]);
	const cachedUpdates = useRef<IUpdate[]>([]);

	const fetchUpdates = useCallback(async () => {
		try {
			const response = await fetch("/api/updates");
			const data = await response.json();
			if (Array.isArray(data)) {
				if (JSON.stringify(data) !== JSON.stringify(cachedUpdates.current)) {
					cachedUpdates.current = data;
					setUpdates(data);
				}
			} else {
				console.error("Fetched data is not an array:", data);
			}
		} catch (error) {
			console.error("Error fetching updates:", error);
		}
	}, []);

	useEffect(() => {
		fetchUpdates();
		const intervalId = setInterval(fetchUpdates, 300000);

		return () => clearInterval(intervalId);
	}, [fetchUpdates]);

	return (
		<div id="updates">
			<div className="update-cont">
				{updates.map((update: IUpdate, index) => (
					<p key={index} className="update-msg">
						{update.text}
					</p>
				))}
			</div>
		</div>
	);
};

export default Updates;
