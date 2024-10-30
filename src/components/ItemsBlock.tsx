"use client";

import React, { useCallback, useEffect, useState } from "react";
import DomItem from "./DomItem";
import { iItem, iItemsBlockProps } from "../lib/Type";
import { filterByCategory, filterByRecommended, filterByStatus } from "../lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import Cookies from "js-cookie";

export let scrollPrev: () => void;
export let scrollNext: () => void;

const dummyData: iItem[] = [
	{
		id: 1,
		name: "Loading...",
		status: "out-of-stock",
		category: "all",
		recommended: true,
		price: "",
		img: "placeholder-image.webp",
		description: "",
		options: {
			name: "",
			opt: [],
		},
	},
	{
		id: 2,
		name: "Loading...",
		status: "out-of-stock",
		category: "all",
		recommended: true,
		price: "",
		img: "placeholder-image.webp",
		description: "",
		options: {
			name: "",
			opt: [],
		},
	},
	{
		id: 3,
		name: "Loading...",
		status: "out-of-stock",
		category: "all",
		recommended: true,
		price: "",
		img: "placeholder-image.webp",
		description: "",
		options: {
			name: "",
			opt: [],
		},
	},
	{
		id: 4,
		name: "Loading...",
		status: "out-of-stock",
		category: "all",
		recommended: true,
		price: "",
		img: "placeholder-image.webp",
		description: "",
		options: {
			name: "",
			opt: [],
		},
	},
	{
		id: 5,
		name: "Loading...",
		status: "out-of-stock",
		category: "all",
		recommended: true,
		price: "",
		img: "placeholder-image.webp",
		description: "",
		options: {
			name: "",
			opt: [],
		},
	},
	{
		id: 6,
		name: "Loading...",
		status: "out-of-stock",
		category: "all",
		recommended: true,
		price: "",
		img: "placeholder-image.webp",
		description: "",
		options: {
			name: "",
			opt: [],
		},
	},
];

const ItemsBlock = ({ itemClassName, filterByChoice, filterByValue }: iItemsBlockProps) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: false,
		containScroll: "trimSnaps",
		dragFree: true,
		watchFocus: true,
	});

	const [items, setItems] = useState<iItem[]>(dummyData);

	const fetchItems = async () => {
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
			// clear cookie, then set
			Cookies.remove("items");
			Cookies.set("items", JSON.stringify(data), { expires: 1 / 480 }); // 3 minutes
		} catch (error) {
			console.error("Error fetching items:", error);
		}
	};

	// remove all dummy data on items
	useEffect(() => {
		const filteredItems = items.filter((item) => item.name !== "Loading...");
		if (filteredItems.length > 0) {
			setItems(filteredItems);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const cookieItems = Cookies.get("items");
		if (cookieItems) {
			const parsedItems = JSON.parse(cookieItems);
			if (parsedItems.length > 0 && parsedItems[0].name !== "Loading...") {
				setItems(parsedItems);
			} else {
				fetchItems();
			}
		} else {
			fetchItems();
		}
	}, []);

	scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	let btnClass = "";
	let statusClass = "";
	let disabled = false;

	const filterItemsBy = ({ filterByChoice, filterByValue }: iItemsBlockProps) => {
		switch (filterByChoice) {
			case "category":
				return filterByCategory(filterByValue, items);
			case "status":
				return filterByStatus(filterByValue, items);
			case "recommended":
				return filterByRecommended(filterByValue, items);
			default:
				return items;
		}
	};

	return (
		<div className="embla" ref={emblaRef}>
			<div className="items-block embla_container">
				{filterItemsBy({ filterByChoice, filterByValue }).map((item: iItem) => {
					if (item.status === "in-stock") {
						btnClass = "clickable";
						statusClass = "in-stock";
						disabled = false;
					} else {
						btnClass = "not-clickable";
						disabled = true;
						statusClass = "out-of-stock";
					}

					// if (item.name == "Loading...") return null;

					return (
						<DomItem
							key={item.id}
							item={item}
							className={`${itemClassName} item-card ${btnClass} embla__slide`}
							btnClass={btnClass}
							statusClass={statusClass}
							disabled={disabled}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default ItemsBlock;
