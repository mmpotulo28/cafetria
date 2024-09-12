import Link from 'next/link';
import React from 'react';

const DashboardSidebar: React.FC<any> = ({ styles }) => {
	return (
		<ul className={styles.sidebarMenu}>
			<li className={`${styles.sidebarMenuItem} ${styles.slideInLeft}`}>
				<Link href='/endpoints/user/dashboard' className={styles.sidebarMenuLink}>
					<i className='fas fa-tachometer-alt'></i> Dashboard
				</Link>
			</li>
			<li className={`${styles.sidebarMenuItem} ${styles.slideInLeft}`}>
				<Link href='/endpoints/user/orders' className={styles.sidebarMenuLink}>
					<i className='fas fa-clipboard-list'></i> Orders
				</Link>
			</li>
			<li className={`${styles.sidebarMenuItem} ${styles.slideInLeft}`}>
				<Link href='/endpoints/user/profile' className={styles.sidebarMenuLink}>
					<i className='fas fa-user'></i> Profile
				</Link>
			</li>
			<li className={`${styles.sidebarMenuItem} ${styles.slideInLeft}`}>
				<Link href='/endpoints/user/favorites' className={styles.sidebarMenuLink}>
					<i className='fas fa-heart'></i> Favorites
				</Link>
			</li>
			<li className={`${styles.sidebarMenuItem} ${styles.slideInLeft}`}>
				<Link href='/endpoints/user/notification' className={styles.sidebarMenuLink}>
					<i className='fas fa-bell'></i> Notifications
				</Link>
			</li>
			<li className={`${styles.sidebarMenuItem} ${styles.slideInLeft}`}>
				<Link href='/endpoints/user/settings' className={styles.sidebarMenuLink}>
					<i className='fas fa-cog'></i> Settings
				</Link>
			</li>
			<li className={`${styles.sidebarMenuItem} ${styles.slideInLeft}`}>
				<Link href='/endpoints/user/support' className={styles.sidebarMenuLink}>
					<i className='fas fa-question-circle'></i> Support
				</Link>
			</li>
			<li className={`${styles.sidebarMenuItem} ${styles.slideInLeft}`}>
				<Link href='/endpoints/user/logout' className={styles.sidebarMenuLink}>
					<i className='fas fa-sign-out-alt'></i> Logout
				</Link>
			</li>
		</ul>
	);
};

export default DashboardSidebar;
