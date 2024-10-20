import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "./styles.module.css"; // Assuming you have some styles
import DashboardSidebar from "@/components/DashboardSidebar";
import WelcomeDashboard from "@/components/WelcomeDashboard";

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/auth/login");
		}
	}, [status, router]);

	if (status === "loading") {
		return <div>Loading...</div>; // You can replace this with a loading spinner or any other loading indicator
	}

	return (
		<>
			<div className={styles.dashboardMain}>
				<section className={styles.sideBar}>
					<DashboardSidebar styles={styles} />
				</section>

				<section className={styles.mainContent}>
					<WelcomeDashboard styles={styles} />
					{children}
				</section>
			</div>
		</>
	);
};

export default UserLayout;
