"use client";

import { filterById } from "@/lib/utils";
import { iCartItem, iItem } from "@/lib/Type";
import React, { FormEvent, useEffect, useState, useCallback } from "react";
import ViewItemBlock from "../components/ViewItemBlock";
import { scrollNext, scrollPrev } from "@/components/ItemsBlock";
import { useRouter } from "next/router";
import Head from "next/head";
import SimilarItems from "../components/SimilarItems";
import { useFullScreen } from "@/context/FullScreenContext";

const dummyItem: iItem = {
	id: 1001,
	name: "Loading...",
	price: "22.00",
	status: "out-off-stock",
	img: "placeholder-image.webp",
	recommended: true,
	category: "Fast Food",
	description: "loading...",
	options: {
		name: "NA",
		opt: ["NA", "None"],
	},
};

const ItemPage: React.FC = () => {
	const router = useRouter();
	const [items, setItems] = useState<iItem[]>([]);
	const [item, setItem] = useState<iItem>(dummyItem);
	const { itemId } = router.query;
	const { addToCart } = useFullScreen();

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
		}
	}, [fetchItems, items.length]);

	useEffect(() => {
		if (itemId && items.length > 0) {
			const itm = filterById(Number(itemId), items);
			setItem(itm[0] || dummyItem);
		}
	}, [itemId, items]);

	const handleAddToCart = (e: FormEvent<HTMLFormElement>, item: iCartItem | undefined): void => {
		e.preventDefault();
		if (item) {
			addToCart(item);
		}
	};

	if (!itemId) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Head>
				<title>{item?.name} | View Item | Cafetria</title>
				{item && item.img && <link rel="icon" href={item.img} />}
			</Head>
			<section className="view-item-block">
				<ViewItemBlock onSubmit={handleAddToCart} btnClass="" item={item} statusClass="" />
			</section>

			<SimilarItems item={item} scrollNext={scrollNext} scrollPrev={scrollPrev} />
		</>
	);
};

export default ItemPage;
