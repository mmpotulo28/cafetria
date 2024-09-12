import React from 'react';
import styles from './styles.module.css'; // Assuming you have some styles
import DashboardSidebar from '@/components/DashboardSidebar';

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<>
			<div className={styles.dashboardMain}>
				<section className={styles.sideBar}>
					<DashboardSidebar styles={styles} />
				</section>

				<section className={styles.mainContent}>{children}</section>
			</div>
		</>
	);
};

export default UserLayout;
