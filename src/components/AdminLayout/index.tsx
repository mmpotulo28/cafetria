import React from "react";
import styles from "./admin-layout.module.css";
import AdminSidebar from "../AdminSidebar";
import { useFullScreen } from "@/context/FullScreenContext";

interface AdminLayoutProps {
	children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
	const { isFullScreen } = useFullScreen();

	return (
		<div className={`${styles.adminLayout} ${isFullScreen && styles.fullScreen}`}>
			<AdminSidebar />
			<div className={`${styles.mainContent} ${isFullScreen && styles.fullScreen}`}>
				{children}
			</div>
		</div>
	);
};

export default AdminLayout;
