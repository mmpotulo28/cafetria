const OrderView: React.FC<any> = ({ order, orderStyles, setShowViewOrder }) => {
	return (
		<div className={orderStyles.orderView}>
			<h3>Order #{order.id}</h3>
			<button
				className={orderStyles.closeBtn}
				id='order-view-close-btn'
				onClick={() => {
					setShowViewOrder(false);
				}}>
				<i className='fas fa-times-circle' />
			</button>
			<div className={orderStyles.orderViewGrid}>
				<div className={orderStyles.orderViewInfo}>
					<h4>Order Information</h4>
					<p>Number of Items: {order.NoOfItems}</p>
					<p>Order Total: {order.total}</p>
					<p>Order Date: {order.date}</p>
					<p>Order Status: {order.status}</p>
				</div>
				<div className={orderStyles.orderViewItems}>
					{order.items?.map((item: any, index: number) => (
						<div key={'orderItem' + index} className={orderStyles.orderViewItem}>
							<img
								src={`/images/${item.image}`}
								alt=''
								className={orderStyles.orderImg}
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
		</div>
	);
};

export default OrderView;
