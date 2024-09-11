import React from 'react';
import SimilarItems from '../item/components/SimilarItems';
import { scrollNext, scrollPrev } from '@/components/ItemsBlock';
import { items } from '@/lib/data';
import Sponsors from '@/components/Sponsors';
import PersonalInfoForm from './components/PersonalInfoForm';
import OrderSummary from './components/OrderSummary';
import PaymentOptionsForm from './components/PaymentOptionsForm';
const CheckoutPage: React.FC = () => {
	return (
		<>
			<section className='checkout-sec'>
				<PersonalInfoForm />
				<OrderSummary />
				<PaymentOptionsForm />
			</section>

			<SimilarItems item={items[0]} scrollNext={scrollNext} scrollPrev={scrollPrev} />
			<Sponsors />
		</>
	);
};

export default CheckoutPage;
