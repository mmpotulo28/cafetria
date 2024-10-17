import React from "react";
import Image from "next/image";
import { iCartTableRowProps } from "../types/types";

const CartTableRow: React.FC<iCartTableRowProps> = ({ product, editOnclick, delOnclick }) => {
	if (!product) {
		product = {
			id: 0,
			image: "",
			name: "",
			extras: "",
			quantity: 0,
			total: "",
		};
	}

	return (
		<>
			<tr id={`cartItem${product.id}`}>
				<td>
					<Image
						src={`/images/${product.image}`}
						alt={product.image}
						width={60}
						height={60}
					/>
				</td>
				<td>{product.name}</td>
				<td>{product.extras}</td>
				<td>{product.quantity}</td>
				<td>R{product.total}</td>
				<td>
					<button
						className="cart-edit-btn"
						key={product.id}
						onClick={(e) => editOnclick(e, product.id)}>
						<i className="fa fa-edit"></i>
					</button>
					<button
						className="cart-del-btn"
						key={product.id}
						onClick={(e) => delOnclick(e, product.id)}>
						<i className="fa fa-trash"></i>
					</button>
				</td>
			</tr>
		</>
	);
};

export default CartTableRow;
