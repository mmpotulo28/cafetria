import { iOrder, iOrderItem } from "@/lib/Type";
import Image from "next/image";
import React, { useState } from "react";

interface OrderViewProps {
	order: iOrder | undefined;
	orderStyles: { readonly [key: string]: string };
	setShowViewOrder: (show: boolean) => void;
	changeOrderStatus?: boolean;
}

const OrderView: React.FC<OrderViewProps> = ({
	order,
	orderStyles,
	setShowViewOrder,
	changeOrderStatus,
}) => {
	const [status, setStatus] = useState(order?.status || "");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const handleStatusChange = async () => {
		if (order) {
			setLoading(true);
			setMessage("Updating...");
			try {
				const response = await fetch("/api/orders", {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ id: order.id, status }),
				});

				if (response.ok) {
					setMessage("Order status updated successfully");
				} else {
					setMessage("Failed to update order status");
				}
			} catch (error) {
				setMessage((error as Error).message);
			} finally {
				setLoading(false);
			}
		}
	};

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
						}}
						disabled={loading}>
						<i className="fas fa-times-circle" />
					</button>
					<div className={orderStyles.orderViewGrid}>
						<div className={orderStyles.orderViewInfo}>
							<h4>Order Information</h4>
							<p>Number of Items: {order.noofitems}</p>
							<p>Order Total: {order.total}</p>
							<p>Order Date: {order.date}</p>
							<p>Order Status: {order.status}</p>
							{changeOrderStatus && (
								<div>
									<select
										value={status}
										onChange={(e) => setStatus(e.target.value)}
										disabled={loading}>
										<option value="Pending">Pending</option>
										<option value="In-Progress">In-Progress</option>
										<option value="Completed">Completed</option>
										<option value="In-Error">In-Error</option>
									</select>
									<button onClick={handleStatusChange} disabled={loading}>
										{loading ? "Updating..." : "Update Status"}
									</button>
								</div>
							)}
							{message && <p>{message}</p>}
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
