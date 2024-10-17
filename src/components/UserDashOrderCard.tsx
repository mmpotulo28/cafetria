import { iOrder } from "@/lib/Type";
import React from "react";

interface UserDashOrderCardProps {
	styles: { readonly [key: string]: string };
	orderStyles: { readonly [key: string]: string };
	order: iOrder;
	setShowViewOrder: (show: boolean) => void;
	setCurrentOrder: (order: iOrder) => void;
}

const UserDashOrderCard: React.FC<UserDashOrderCardProps> = ({
	styles,
	orderStyles,
	order,
	setShowViewOrder,
	setCurrentOrder,
}) => {
	console.log("order", order);

	return (
		<>
			<div className={orderStyles.order + " slide-in-left"}>
				<div className={orderStyles.orderInfo}>
					<h4>Order #{order.id}</h4>
					<p>Number of Items: {order.noofitems}</p>
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
						className={styles.btn + " " + orderStyles.viewOrderBtn}>
						View Order
					</button>
				</div>
			</div>
		</>
	);
};

export default UserDashOrderCard;
