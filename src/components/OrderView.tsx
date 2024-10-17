import { iOrder, iOrderItem } from "@/lib/Type";
import Image from "next/image";
import React from "react";

interface OrderViewProps {
	order: iOrder | undefined;
	orderStyles: { readonly [key: string]: string };
	setShowViewOrder: (show: boolean) => void;
}

const OrderView: React.FC<OrderViewProps> = ({ order, orderStyles, setShowViewOrder }) => {
	return (
		<div className={orderStyles.orderView}>
			{order ? (
				<>
					<h3>Order #{order.id}</h3>
					<button
						className={orderStyles.closeBtn}
						id="order-view-close-btn"
						onClick={() => {
							setShowViewOrder(false);
						}}>
						<i className="fas fa-times-circle" />
					</button>
					<div className={orderStyles.orderViewGrid}>
						<div className={orderStyles.orderViewInfo}>
							<h4>Order Information</h4>
							<p>Number of Items: {order.noofitems}</p>
							<p>Order Total: {order.total}</p>
							<p>Order Date: {order.date}</p>
							<p>Order Status: {order.status}</p>
						</div>
						<div className={orderStyles.orderViewItems}>
							{order.items?.map((item: iOrderItem, index: number) => (
								<div
									key={"orderItem" + index}
									className={orderStyles.orderViewItem}>
									<Image
										src={`/images/${item.image}`}
										alt=""
										className={orderStyles.orderImg}
										width={50}
										height={50}
									/>
									<div className={orderStyles.orderViewItemInfo}>
										<span>{item.name}</span>
										<span>{item.price}</span>
										<span>{item.quantity}</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</>
			) : (
				<p>No order details available.</p>
			)}
		</div>
	);
};

export default OrderView;
