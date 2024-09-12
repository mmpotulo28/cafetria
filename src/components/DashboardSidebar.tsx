import { iSidebarLink } from '@/lib/Type';
import Link from 'next/link';
import React from 'react';

const DashboardSidebar: React.FC<any> = ({ styles }) => {
	const sidebarLinks: iSidebarLink[] = [
		{ href: '/endpoints/user/dashboard', icon: 'fas fa-tachometer-alt', text: 'Dashboard' },
		{ href: '/endpoints/user/orders', icon: 'fas fa-clipboard-list', text: 'Orders' },
		{ href: '/endpoints/user/profile', icon: 'fas fa-user', text: 'Profile' },
		{ href: '/endpoints/user/favorites', icon: 'fas fa-heart', text: 'Favorites' },
		{ href: '/endpoints/user/notification', icon: 'fas fa-bell', text: 'Notifications' },
		{ href: '/endpoints/user/settings', icon: 'fas fa-cog', text: 'Settings' },
		{ href: '/endpoints/user/support', icon: 'fas fa-question-circle', text: 'Support' },
		{ href: '/endpoints/user/logout', icon: 'fas fa-sign-out-alt', text: 'Logout' },
	];

	return (
		<ul className={styles.sidebarMenu}>
			{sidebarLinks.map((link, index) => (
				<li key={index} className={`${styles.sidebarMenuItem} ${styles.slideInLeft}`}>
					<Link href={link.href} className={styles.sidebarMenuLink}>
						<i className={link.icon}></i> {link.text}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default DashboardSidebar;
