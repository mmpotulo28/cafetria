import React from "react";

interface UserDashStatsProps {
	styles: { readonly [key: string]: string };
}

const UserDashStats: React.FC<UserDashStatsProps> = ({ styles }) => {
	return (
		<div className={`${styles.card} ${styles.stats}`}>
			<h3>Stats & Insights</h3>
			<div className={styles.statsGrid}>
				<div className={styles.stat}>
					<i className="fas fa-shopping-cart"></i>
					<h4>Orders</h4>
					<p className={styles.statNumber}>0</p>
				</div>
				<div className={styles.stat}>
					<i className="fas fa-heart"></i>
					<h4>Favorite Items</h4>
					<p className={styles.statNumber}>0</p>
				</div>
				<div className={styles.stat}>
					<i className="fas fa-bell"></i>
					<h4>Notifications</h4>
					<p className={styles.statNumber}>0</p>
				</div>
			</div>
		</div>
	);
};

export default UserDashStats;
