import UserDashStats from '@/components/UserDashStats';
import UserLayout from '../UserLayout';
import styles from '../styles.module.css';
import orderStyles from './styles.module.css';
import UserDashOrderCard from '@/components/UserDashOrderCard';
import { useState } from 'react';
import OrderView from '@/components/OrderView';

export default function OrdersPage() {
	const [showViewOrder, setShowViewOrder] = useState<boolean>(false);
	const [currentOrder, setCurrentOrder] = useState<any>();

	const orders = [
		{
			id: 1,
			NoOfItems: 2,
			total: '$30.00',
			date: '12/15/2021',
			status: 'Pending',
			items: [
				{ id: 3, name: 'Tea', quantity: 1, price: '$3.00', image: 'fanta.png' },
				{ id: 4, name: 'Pastry', quantity: 1, price: '$7.00', image: 'fanta.png' },
			],
		},
		{
			id: 2,
			NoOfItems: 5,
			total: '$75.00',
			date: '12/20/2021',
			status: 'Delivered',
			items: [
				{ id: 5, name: 'Pasta', quantity: 1, price: '$15.00', image: 'fanta.png' },
				{ id: 6, name: 'Salad', quantity: 2, price: '$10.00', image: 'fanta.png' },
				{ id: 7, name: 'Dessert', quantity: 1, price: '$5.00', image: 'fanta.png' },
			],
		},
		{
			id: 3,
			NoOfItems: 5,
			total: '$75.00',
			date: '12/20/2021',
			status: 'Delivered',
			items: [
				{ id: 1, name: 'Coffee', quantity: 2, price: '$10.00', image: 'fanta.png' },
				{ id: 2, name: 'Sandwich', quantity: 1, price: '$5.00', image: 'fanta.png' },
			],
		},
		{
			id: 4,
			NoOfItems: 3,
			total: '$45.00',
			date: '12/22/2021',
			status: 'Pending',
			items: [
				{ id: 8, name: 'Juice', quantity: 2, price: '$5.00', image: 'fanta.png' },
				{ id: 9, name: 'Cake', quantity: 1, price: '$15.00', image: 'fanta.png' },
			],
		},
		{
			id: 5,
			NoOfItems: 4,
			total: '$60.00',
			date: '12/25/2021',
			status: 'Delivered',
			items: [
				{ id: 10, name: 'Burger', quantity: 1, price: '$10.00', image: 'fanta.png' },
				{ id: 11, name: 'Fries', quantity: 2, price: '$5.00', image: 'fanta.png' },
				{ id: 12, name: 'Soda', quantity: 1, price: '$2.00', image: 'fanta.png' },
			],
		},
		{
			id: 6,
			NoOfItems: 2,
			total: '$20.00',
			date: '12/30/2021',
			status: 'Cancelled',
			items: [
				{ id: 13, name: 'Sandwich', quantity: 1, price: '$5.00', image: 'fanta.png' },
				{ id: 14, name: 'Chips', quantity: 1, price: '$2.00', image: 'fanta.png' },
			],
		},
		{
			id: 7,
			NoOfItems: 1,
			total: '$10.00',
			date: '01/02/2022',
			status: 'Delivered',
			items: [{ id: 15, name: 'Water', quantity: 1, price: '$1.00' }],
		},
		{
			id: 8,
			NoOfItems: 3,
			total: '$30.00',
			date: '01/05/2022',
			status: 'Pending',
			items: [
				{ id: 16, name: 'Pasta', quantity: 1, price: '$10.00', image: 'fanta.png' },
				{ id: 17, name: 'Salad', quantity: 1, price: '$5.00', image: 'fanta.png' },
				{ id: 18, name: 'Bread', quantity: 1, price: '$2.00', image: 'fanta.png' },
			],
		},
		{
			id: 9,
			NoOfItems: 2,
			total: '$25.00',
			date: '01/10/2022',
			status: 'Delivered',
			items: [
				{ id: 19, name: 'Ice Cream', quantity: 1, price: '$5.00', image: 'fanta.png' },
				{ id: 20, name: 'Brownie', quantity: 1, price: '$10.00', image: 'fanta.png' },
			],
		},
	];

	return (
		<UserLayout>
			{showViewOrder && (
				<OrderView
					styles={styles}
					orderStyles={orderStyles}
					order={currentOrder}
					setShowViewOrder={setShowViewOrder}
				/>
			)}
			<div className={styles.welcomeMessage}>
				<h1>Welcome, [User Name]!</h1>
				<p>Here's a quick overview of your account and recent activities.</p>
			</div>

			<div className={styles.dashboardCards}>
				<div className={orderStyles.orders}>
					<h3>Orders</h3>
					<div className={orderStyles.ordersGrid}>
						{orders?.map((order: any, index: number) => (
							<UserDashOrderCard
								styles={styles}
								orderStyles={orderStyles}
								order={order}
								setShowViewOrder={setShowViewOrder}
								setCurrentOrder={setCurrentOrder}
							/>
						))}
					</div>
				</div>
				<UserDashStats styles={styles} />
			</div>
		</UserLayout>
	);
}
