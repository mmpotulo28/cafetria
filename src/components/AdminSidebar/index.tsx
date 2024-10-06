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

const AdminSidebar: React.FC = () => {
	return (
		<div className={styles.sidebar}>
			<ul className={styles.sidebarList}>
				<li className={styles.sidebarItem}>
					<a href="/admin/view-items">
						<FaBox /> View Items
					</a>
				</li>
				<li className={styles.sidebarItem}>
					<a href="/admin/add-items">
						<FaPlus /> Add Items
					</a>
				</li>
				<li className={styles.sidebarItem}>
					<a href="/admin/view-orders">
						<FaClipboardList /> View Orders
					</a>
				</li>
				<li className={styles.sidebarItem}>
					<a href="/admin/view-staff">
						<FaUsers /> View Staff
					</a>
				</li>
				<li className={styles.sidebarItem}>
					<a href="/admin/view-stock">
						<FaWarehouse /> View Stock
					</a>
				</li>
				<li className={styles.sidebarItem}>
					<a href="/admin/view-users">
						<FaUser /> View Users
					</a>
				</li>
				<li className={styles.sidebarItem}>
					<a href="/admin/manage-categories">
						<FaTags /> Manage Categories
					</a>
				</li>
				<li className={styles.sidebarItem}>
					<a href="/admin/reports">
						<FaChartBar /> Reports
					</a>
				</li>
				<li className={styles.sidebarItem}>
					<a href="/admin/settings">
						<FaCog /> Settings
					</a>
				</li>
			</ul>
		</div>
	);
};

export default AdminSidebar;
