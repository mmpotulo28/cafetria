import React from "react";
import styles from "./admin-sidebar.module.css";
import {
	FaBox,
	FaPlus,
	FaClipboardList,
	FaUsers,
	FaWarehouse,
	FaUser,
	FaTags,
	FaChartBar,
	FaCog,
} from "react-icons/fa";
import Link from "next/link";

const AdminSidebar: React.FC = () => {
	return (
		<div className={styles.sidebar}>
			<ul className={styles.sidebarList}>
				<li className={styles.sidebarItem}>
					<Link href="/endpoints/admin/view-items">
						<FaBox /> View Items
					</Link>
				</li>
				<li className={styles.sidebarItem}>
					<Link href="/endpoints/admin/add-items">
						<FaPlus /> Add Items
					</Link>
				</li>
				<li className={styles.sidebarItem}>
					<Link href="/endpoints/admin/orders">
						<FaClipboardList /> View Orders
					</Link>
				</li>
				<li className={styles.sidebarItem}>
					<Link href="/endpoints/admin/staff">
						<FaUsers /> View Staff
					</Link>
				</li>
				<li className={styles.sidebarItem}>
					<Link href="/endpoints/admin/stock">
						<FaWarehouse /> View Stock
					</Link>
				</li>
				<li className={styles.sidebarItem}>
					<Link href="/endpoints/admin/users">
						<FaUser /> View Users
					</Link>
				</li>
				<li className={styles.sidebarItem}>
					<Link href="/endpoints/admin/manage-categories">
						<FaTags /> Manage Categories
					</Link>
				</li>
				<li className={styles.sidebarItem}>
					<Link href="/endpoints/admin/reports">
						<FaChartBar /> Reports
					</Link>
				</li>
				<li className={styles.sidebarItem}>
					<Link href="/endpoints/admin/settings">
						<FaCog /> Settings
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default AdminSidebar;
