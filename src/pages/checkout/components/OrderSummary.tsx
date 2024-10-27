import { iCartItem } from "@/lib/Type";
import Image from "next/image";
import React from "react";
import { useFullScreen } from "@/context/FullScreenContext";

const OrderSummary: React.FC = () => {
	const { cart } = useFullScreen();

	return (
		<div className="order-summary-cont">
			<h2>Order Summary</h2>
			<div className="order-summary">
				{cart.map((item: iCartItem, index: number) => (
					<div key={index} className="order-item">
						<div className="order-item-img">
							<Image
								src={`/images/${item.image}`}
								alt={item.name}
								width={80}
								height={80}
								objectFit="fit"
								loading="eager"
							/>
						</div>
						<div className="order-item-details">
							<h3>{item.name}</h3>
							<p>{item.extras}</p>
							<p>Quantity: {item.quantity}</p>
							<p>Total: R{item.total}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default OrderSummary;
