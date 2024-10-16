"use client";

import React, { useCallback, useEffect, useState } from "react";
import DomItem from "./DomItem";
import { iItem, iItemsBlockProps } from "../lib/Type";
import { filterByCategory, filterByRecommended, filterByStatus } from "../lib/utils";
import useEmblaCarousel from "embla-carousel-react";
export let scrollPrev: () => void;
export let scrollNext: () => void;

const ItemsBlock = ({ itemClassName, filterByChoice, filterByValue }: iItemsBlockProps) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: false,
		containScroll: "trimSnaps",
		dragFree: true,
		watchFocus: true,
	});

	const [items, setItems] = useState<iItem[]>([
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
	]);

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
		} catch (error) {
			console.error("Error fetching items:", error);
		}
	};

	useEffect(() => {
		fetchItems();
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
