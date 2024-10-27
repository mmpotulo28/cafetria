import React from "react";
import CartTableRow from "./components/cartTableRow";
import Link from "next/link";
import { iProduct } from "@/lib/Type";
import { useRouter } from "next/router";
import { useFullScreen } from "@/context/FullScreenContext";

const CartPage: React.FC = () => {
	const router = useRouter();
	const { cart, removeFromCart } = useFullScreen();

	// delete buttonOnClick
	const delBtnClick = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
		e.preventDefault();
		removeFromCart(id);
	};

	// edit button onclick
	const editBtnClick = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
		e.preventDefault();
		removeFromCart(id);
		router.push(`/item/${id}`);
	};

	return (
		<section id="view-cart-sec">
			<table className="cart-table">
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
					{cart.map((product: iProduct) => (
						<CartTableRow
							key={product.id}
							editOnclick={editBtnClick}
							delOnclick={delBtnClick}
							product={product}
						/>
					))}
				</tbody>
			</table>
			<div className="below-table-sec">
				<div className="continue-shopping">
					<Link className="btn" href="/">
						{"Continue Shopping"}
					</Link>
				</div>
				<div className="checkout">
					<Link className="btn" href="/checkout">
						{"Checkout"}
					</Link>
				</div>
			</div>
		</section>
	);
};

export default CartPage;
