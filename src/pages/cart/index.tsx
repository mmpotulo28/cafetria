import React from 'react';
import CartTableRow from './components/cartTableRow';
import Link from 'next/link';

const CartPage: React.FC = () => {
	// dummy cart data
	const cartItems = [
		{
			id: 1,
			image: '/images/applepay.jpg',
			name: 'Spaghetti',
			extras: 'Extra cheese, extra sauce',
			quantity: 2,
			total: '$20.00',
		},
		{
			id: 2,
			image: '/images/applepay.jpg',
			name: 'Chicken Burger',
			extras: 'Extra cheese, extra sauce',
			quantity: 1,
			total: '$10.00',
		},
	];

	return (
		<section id='view-cart-sec'>
			<table className='cart-table'>
				<thead>
					<tr>
						<th>Image</th>
						<th>Name</th>
						<th>Extras</th>
						<th>Quantity</th>
						<th>Total</th>
						<th>Actions</th>
					</tr>
				</thead>

				<tbody>
					{cartItems?.map((product: any) => (
						<CartTableRow product={product} />
					))}
				</tbody>
			</table>
			<div className='below-table-sec'>
				<div className='continue-shopping'>
					<Link className='btn' href='/'>
						Continue Shopping
					</Link>
				</div>
				<div className='checkout'>
					<a className='btn' href='/checkout'>
						Checkout
					</a>
				</div>
			</div>
		</section>
	);
};

export default CartPage;
