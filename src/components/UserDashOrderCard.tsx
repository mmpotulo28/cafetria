import React from 'react';

const UserDashOrderCard: React.FC<any> = ({
	styles,
	orderStyles,
	order,
	setShowViewOrder,
	setCurrentOrder,
}) => {
	return (
		<>
			<div className={orderStyles.order}>
				<div className={orderStyles.orderInfo}>
					<h4>Order #{order.id}</h4>
					<p>Number of Items: {order.items.length}</p>
					<p>Order Total: ${order.total}</p>
					<p>Order Date: {new Date(order.date).toLocaleDateString()}</p>
					<p>Order Status: {order.status}</p>
				</div>
				<div className={orderStyles.orderActions}>
					<button
						onClick={() => {
							setShowViewOrder(true);
							setCurrentOrder(order);
						}}
						className={styles.btn + ' ' + orderStyles.viewOrderBtn}>
						View Order
					</button>
				</div>
			</div>
		</>
	);
};

export default UserDashOrderCard;
