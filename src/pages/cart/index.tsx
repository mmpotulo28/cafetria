import React, { useEffect } from "react";
import CartTableRow from "./components/cartTableRow";
import Link from "next/link";
import { iProduct } from "@/lib/Type";
import { useRouter } from "next/router";
import { updateCart } from "@/components/Header";

const CartPage: React.FC = () => {
	const router = useRouter();
	const [cart, setCart] = React.useState<iProduct[]>([]);
	useEffect(() => {
		// dummy cart data
		const cartItems: iProduct[] = [];

		// get cart from localStorage
		setCart(JSON.parse(localStorage.getItem("cart") || JSON.stringify(cartItems)));
	}, []);

	// delete buttonOnClick
	const delBtnClick = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
		e.preventDefault();

		// remove item with id from cart
		const newCart = cart.filter((product) => product.id !== id);
		setCart(newCart);
		localStorage.setItem("cart", JSON.stringify(newCart));
		updateCart();
	};

	// edit button onclick
	const editBtnClick = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
		e.preventDefault();
		// remove item with id from cart
		const newCart = cart.filter((product) => product.id !== id);
		setCart(newCart);

		// the route to item/id page
		updateCart();
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
