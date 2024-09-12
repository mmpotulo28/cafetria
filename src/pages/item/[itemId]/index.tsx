'use client';

import { filterById } from '@/lib/utils';
import { items } from '@/lib/data';
import { iCartItem, iItem } from '@/lib/Type';
import React, { FormEvent } from 'react';
import ViewItemBlock from '../components/ViewItemBlock';
import { scrollNext, scrollPrev } from '@/components/ItemsBlock';
import { useRouter } from 'next/router';
import Head from 'next/head';
import SimilarItems from '../components/SimilarItems';
import { updateCart } from '@/components/Header';

const Page: React.FC = () => {
	const router = useRouter();
	const { itemId } = router.query;

	if (!itemId) {
		return <div>Loading...</div>;
	}

	const item: iItem[] = filterById(Number(itemId), items);

	// function for setting cart
	const setCartOnStorage = (e: FormEvent<HTMLFormElement>, item: iCartItem | undefined): void => {
		e.preventDefault();
		let cart: iCartItem[] = localStorage.getItem('cart')
			? JSON.parse(localStorage.getItem('cart') || '[]')
			: [];

		if (!item) return;

		const existing = cart.find((cartItem) => cartItem.id === item.id);

		// if item is already in cart, increase quantity
		if (existing) {
			existing.quantity += item.quantity;
			existing.total = (existing.quantity * parseInt(item.total)).toString();
		} else {
			cart.push(item);
		}

		window.localStorage.setItem('cart', JSON.stringify(cart));
		updateCart();
	};

	return (
		<>
			<Head>
				<title>{item[0]?.name} | View Item | Cafetria</title>
			</Head>
			<section className='view-item-block'>
				<ViewItemBlock
					onSubmit={setCartOnStorage}
					btnClass=''
					item={item[0]}
					statusClass=''
				/>
			</section>

			<SimilarItems item={item[0]} scrollNext={scrollNext} scrollPrev={scrollPrev} />
		</>
	);
};

export default Page;
