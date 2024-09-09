import React from 'react';

const CartTableRow: React.FC<any> = ({ product }) => {
	return (
		<tr id={`cartItem${product.id}`}>
			<td className='product-img'>
				<img src={product.image} alt={product.image} />
			</td>
			<td>{product.name}</td>
			<td>{product.extras}</td>
			<td>{product.quantity}</td>
			<td>{product.total}</td>
			<td>
				<button className='cart-edit-btn' id={product.id}>
					<i className='fa fa-edit'></i>
				</button>
				<button className='cart-del-btn' id={product.id}>
					<i className='fa fa-trash'></i>
				</button>
			</td>
		</tr>
	);
};

export default CartTableRow;
