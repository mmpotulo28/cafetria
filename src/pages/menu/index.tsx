/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState } from "react";
import { iItem } from "@/lib/Type";
import styles from "./menu.module.css";
import { useFullScreen } from "@/context/FullScreenContext";
import { FaCompress, FaExpand } from "react-icons/fa";

const Menu = () => {
	const [menuItems, setMenuItems] = useState<iItem[]>([]);
	const { isFullScreen, toggleFullScreen } = useFullScreen();

	const fetchMenuItems = useCallback(async () => {
		const response = await fetch("/api/items");
		const data = await response.json();
		setMenuItems(data);
	}, []);

	useEffect(() => {
		fetchMenuItems();
	}, [fetchMenuItems]);

	const shuffleArray = useCallback((array: iItem[]) => {
		return array.sort(() => Math.random() - 0.5);
	}, []);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setMenuItems((prevItems) => shuffleArray([...prevItems]));
		}, 5000); // Shuffle items every 5 seconds

		return () => clearInterval(intervalId); // Cleanup on unmount
	}, [shuffleArray]);

	return (
		<>
			<button onClick={toggleFullScreen} className={styles.fullScreenButton}>
				{isFullScreen ? <FaCompress size={24} /> : <FaExpand size={24} />}
			</button>
			<div className={styles.menu}>
				{menuItems.slice(0, 20).map((item) => {
					const random = Math.random();
					return (
						<div
							key={item.id}
							className={`${styles["menu-item"]} ${
								random > 0.5 ? styles.fadeInLeftAnime : styles.fadeInAnime
							}`}>
							<h3>{item.name}</h3>
							<div className={styles.image}>
								<img
									src={"/images/" + item.img}
									alt={item.name}
									className={styles.image}
								/>
							</div>
							<p className={styles.price}>R{Number(item.price).toFixed(2)}</p>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Menu;
