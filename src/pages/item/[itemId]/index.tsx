"use client";

import { filterById } from "@/lib/utils";
import { iCartItem, iItem } from "@/lib/Type";
import React, { FormEvent, useEffect, useState, useCallback } from "react";
import ViewItemBlock from "../components/ViewItemBlock";
import { scrollNext, scrollPrev } from "@/components/ItemsBlock";
import { useRouter } from "next/router";
import Head from "next/head";
import SimilarItems from "../components/SimilarItems";
import { updateCart } from "@/components/Header";

const dummyItem: iItem = {
	id: 1001,
	name: "Vetkoeks",
	price: "22.00",
	status: "out-off-stock",
	img: "vetkook-mince.jpg",
	recommended: true,
	category: "Fast Food",
	description:
		"Delicious vetkooks filled with mince. Perfectly fried to golden perfection and served with a side of tangy tomato sauce.",
	options: {
		name: "sauce",
		opt: ["Chip Sauce", "BBQ", "Chilli", "Tomato", "None"],
	},
};

const ItemPage: React.FC = () => {
	const router = useRouter();
	const [items, setItems] = useState<iItem[]>([]);
	const [item, setItem] = useState<iItem>(dummyItem);
	const { itemId } = router.query;

	const fetchItems = useCallback(async () => {
		try {
			const response = await fetch("/api/items", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}
			const data = await response.json();
			setItems(data);
		} catch (error) {
			console.error("Error fetching items:", error);
		}
	}, []);

	useEffect(() => {
		if (items.length === 0) {
			fetchItems();
		} else if (itemId) {
			const itm = filterById(Number(itemId), items);
			setItem(itm[0] || dummyItem);
		}
	}, [itemId, items, fetchItems]);

	const setCartOnStorage = useCallback(
		(e: FormEvent<HTMLFormElement>, item: iCartItem | undefined): void => {
			e.preventDefault();
			const cart: iCartItem[] = localStorage.getItem("cart")
				? JSON.parse(localStorage.getItem("cart") || "[]")
				: [];

			if (!item) return;

			const existing = cart.find((cartItem) => cartItem.id === item.id);

			if (existing) {
				existing.quantity += item.quantity;
				existing.total = (existing.quantity * parseInt(item.total)).toString();
			} else {
				cart.push(item);
			}

			window.localStorage.setItem("cart", JSON.stringify(cart));
			updateCart();
		},
		[],
	);

	if (!itemId) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Head>
				<title>{item?.name} | View Item | Cafetria</title>
			</Head>
			<section className="view-item-block">
				<ViewItemBlock onSubmit={setCartOnStorage} btnClass="" item={item} statusClass="" />
			</section>

			<SimilarItems item={item} scrollNext={scrollNext} scrollPrev={scrollPrev} />
		</>
	);
};

export default ItemPage;
