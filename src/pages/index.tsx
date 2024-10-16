import React from 'react';
import MenuSlider from '../components/MenuSlider';
import ItemsBlock from '../components/ItemsBlock';
import CategorySection from '../components/CategorySection';
import Sponsors from '../components/Sponsors';

export default function Home() {
	return (
		<>
			<MenuSlider />

			<section id='recommended'>
				<h1 className='section-heading'>Recommended</h1>
				<ItemsBlock
					itemClassName='recommended-item'
					filterByChoice='recommended'
					filterByValue='true'
				/>
			</section>
			
			<CategorySection />
			<Sponsors />
		</>
	);
}
