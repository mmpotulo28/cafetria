import styles from '../styles.module.css';
import UserLayout from '../UserLayout';

export default function UserDashboardPage() {
	return (
		<UserLayout>
			<div className={styles.welcomeMessage}>
				<h1>Welcome, [User Name]!</h1>
				<p>Here's a quick overview of your account and recent activities.</p>
			</div>

			<div className={styles.dashboardCards}>
				<div className={styles.card}>
					<h3>Recent Orders</h3>
					<ul className={styles.slideInLeft}> </ul>
				</div>
				<div className={styles.card}>
					<h3>Menu Highlights</h3>
					<div className={styles.menuItems}> </div>
				</div>
				<div className={`${styles.card} ${styles.latestNotifications}`}>
					<h3>Latest Notifications</h3>
					<ul> </ul>
				</div>
				<div className={`${styles.card} ${styles.profileOverview}`}>
					<h3>Your Profile</h3>
				</div>

				{/* Stats and Insights */}
				<div className={`${styles.card} ${styles.stats}`}>
					<h3>Stats & Insights</h3>
					<div className={styles.statsGrid}>
						<div className={styles.stat}>
							<i className='fas fa-shopping-cart'></i>
							<h4>Orders</h4>
							<p className={styles.statNumber}>0</p>
						</div>
						<div className={styles.stat}>
							<i className='fas fa-heart'></i>
							<h4>Favorite Items</h4>
							<p className={styles.statNumber}>0</p>
						</div>
						<div className={styles.stat}>
							<i className='fas fa-bell'></i>
							<h4>Notifications</h4>
							<p className={styles.statNumber}>0</p>
						</div>
					</div>
				</div>
			</div>
		</UserLayout>
	);
}
