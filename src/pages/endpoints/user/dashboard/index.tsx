import DashboardCard from '@/components/DashboardCard';
import styles from '../styles.module.css';
import UserLayout from '../UserLayout';
import { items } from '@/lib/data';
import UserDashStats from '@/components/UserDashStats';

export default function UserDashboardPage() {
	const userData = {
		profile: {
			name: 'John Doe',
			email: 'someone@gmail.com',
			age: 30,
			address: '123 Main St',
		},
		orders: [
			{ id: 1234, status: 'Delivered' },
			{ id: 1235, status: 'In Progress' },
			{ id: 1236, status: 'Cancelled' },
			{ id: 1237, status: 'Delivered' },
			{ id: 1238, status: 'Delivered' },
		],
		notifications: [
			{ message: 'New order received', type: 'info' },
			{ message: 'Payment processed successfully', type: 'success' },
			{ message: 'Error processing order', type: 'error' },
			{ message: 'Low stock alert', type: 'warning' },
		],
		favorites: items.slice(0, 4),
	};

	return (
		<UserLayout>
			<div className={styles.welcomeMessage}>
				<h1>Welcome, [User Name]!</h1>
				<p>Here's a quick overview of your account and recent activities.</p>
			</div>

			<div className={styles.dashboardCards}>
				<DashboardCard styles={styles} heading='Recent Orders'>
					{userData.orders.map((order) => (
						<li key={order.id}>
							Order #{order.id} - {order.status}
						</li>
					))}
				</DashboardCard>

				<DashboardCard styles={styles} heading='Favorite Items'>
					{userData.favorites.map((item) => (
						<li key={item.id}>
							{item.name} - ${item.price}
						</li>
					))}
				</DashboardCard>

				<DashboardCard styles={styles} heading='Notifications'>
					{userData.notifications.map((notification, index) => (
						<li key={index} className={styles[notification.type]}>
							{notification.message}
						</li>
					))}
				</DashboardCard>

				{/* Stats and Insights */}
				<UserDashStats styles={styles} />
			</div>
		</UserLayout>
	);
}
