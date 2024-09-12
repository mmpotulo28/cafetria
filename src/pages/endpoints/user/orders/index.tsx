import UserLayout from '../UserLayout';
import styles from '../styles.module.css';

export default function OrdersPage() {
	return (
		<UserLayout>
			<div className={styles.welcomeMessage}>
				<h1>Welcome, [User Name]!</h1>
				<p>Here's a quick overview of your account and recent activities.</p>
			</div>
		</UserLayout>
	);
}
