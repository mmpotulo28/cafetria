import React from 'react';
import ItemsBlock from './ItemsBlock';
import { categories } from '../lib/data';
import { iCategory } from '../lib/types';

const CategorySection: React.FC = () => {
	const [category, setCategory] = React.useState('All');
	const activeButton: { [key: string]: number } = React.useMemo(
		() => ({ 0: 1, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }),
		[],
	);
	const [activeButtons, setActiveButton] = React.useState(activeButton);

	const handleClick = React.useCallback(
		(category: string | undefined, index: number) => {
			const active = { ...activeButton };
			for (const key in active) {
				active[key] = 0;
			}
			active[index] = 1;

			setActiveButton(active);
			setCategory(category || 'All');
		},
		[activeButton],
	);

	return (
		<section id='categories'>
			<h1 className='section-heading'>
				<i className='fa fa-bars'></i> Menu
			</h1>

			<div className='content'>
				<div className='category-block'>
					{categories.map((category: iCategory, index: number) => (
						<button
							key={index}
							className='category'
							data-category={category.name}
							onClick={() => handleClick(category.data, index)}>
							{category.data}
							{activeButtons[index] === 1 && <i className='fas fa-circle-check'></i>}
						</button>
					))}
				</div>
				<ItemsBlock
					itemClassName='category-item'
					filterByChoice='category'
					filterByValue={category}
				/>
			</div>
		</section>
	);
};

export default CategorySection;
