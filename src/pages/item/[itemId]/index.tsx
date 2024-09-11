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
		let cart: iCartItem[] = [];
		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart') || '[]');
		}

		if (!item) return;

		const existing = cart.includes(item);

		// if item is already in cart, increase quantity
		if (existing) {
			cart = cart.map((cartItem) => {
				if (cartItem.id === item.id) {
					cartItem.quantity += item.quantity;
					cartItem.total = (cartItem.quantity * parseInt(item.total)).toString();
				}
				return cartItem;
			});
		} else {
			cart.push(item);
		}

		localStorage.setItem('cart', JSON.stringify(cart));
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
