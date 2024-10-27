import React, { useState, useEffect } from "react";
import styles from "./admin-sidebar.module.css";
import {
	FaBox,
	FaPlus,
	FaClipboardList,
	FaUsers,
	FaWarehouse,
	FaChartBar,
	FaCog,
	FaCompress,
	FaExpand,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFullScreen } from "@/context/FullScreenContext";

const navItems = [
	{ path: "/endpoints/admin", label: "Dashboard", icon: <FaChartBar /> },
	{ path: "/endpoints/admin/items", label: "View Items", icon: <FaBox /> },
	{ path: "/endpoints/admin/add-items", label: "Add Items", icon: <FaPlus /> },
	{ path: "/endpoints/admin/orders", label: "View Orders", icon: <FaClipboardList /> },
	{ path: "/endpoints/admin/stock", label: "View Stock", icon: <FaWarehouse /> },
	{ path: "/endpoints/admin/users", label: "View Users", icon: <FaUsers /> },
	{ path: "/endpoints/admin/settings", label: "Settings", icon: <FaCog /> },
];

const AdminSidebar: React.FC = () => {
	const router = useRouter();
	const [activeItem, setActiveItem] = useState("");
	const { isFullScreen, toggleFullScreen } = useFullScreen();

	useEffect(() => {
		const currentItem = navItems.find((item) => item.path === router.pathname);
		if (currentItem) {
			setActiveItem(currentItem.label);
		}
	}, [router.pathname]);

	return (
		<div className={styles.sidebar}>
			<ul className={styles.sidebarList}>
				{navItems.map((item) => (
					<li
						key={item.path}
						className={`${styles.sidebarItem} ${
							item.label === activeItem ? styles.active : ""
						}`}>
						<Link href={item.path} onClick={() => setActiveItem(item.label)}>
							{item.icon} {item.label}
						</Link>
					</li>
				))}

				<button onClick={toggleFullScreen} className={styles.fullScreenButton}>
					{isFullScreen ? <FaCompress size={24} /> : <FaExpand size={24} />}
				</button>
			</ul>
		</div>
	);
};

export default AdminSidebar;
