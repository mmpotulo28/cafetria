import React from "react";
import styles from "./admin-layout.module.css";
import AdminSidebar from "../AdminSidebar";

interface AdminLayoutProps {
	children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
	return (
		<div className={styles.adminLayout}>
			<AdminSidebar />
			<div className={styles.mainContent}>{children}</div>
		</div>
	);
};

export default AdminLayout;
