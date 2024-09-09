import { iItem } from '@/lib/types';
import React from 'react';
import { ViewItemBlockProps } from '../types/types';

const ViewItemBlock: React.FC<ViewItemBlockProps> = ({ item, btnClass, statusClass }) => {
	const renderStatusIcon = () => {
		return item?.status === 'out-off-stock' ? (
			<i className='fas fa-times-circle'></i>
		) : (
			<i className='fas fa-check-circle'></i>
		);
	};

	const renderStatusText = () => {
		return item?.status === 'out-off-stock' ? 'Out-of-stock' : 'In stock';
	};

	const renderOptions = () => {
		return item?.options.opt.map((value: string) => (
			<option key={value} value={value}>
				{value}
			</option>
		));
	};

	return (
		<div className='view-item'>
			<div className='top-block'>
				<h2 className='item-name'>{item?.name}</h2>
				<p className={`item-status ${statusClass}`}>
					{renderStatusIcon()}
					{renderStatusText()}
				</p>
			</div>

			<div className='main-block'>
				<div className='img-block'>
					<img src={`/images/${item?.img}`} alt='' />
				</div>

				<div className='item-description'>
					<h3>Description:</h3>
					<p>{item?.description}</p>
				</div>

				<div className='item-config'>
					<form key='item-config-form'>
						<div className='form-group'>
							<label htmlFor='sauce'>{item?.options.name}: </label>
							<select className='form-input' name='sauce' key='sauce'>
								{renderOptions()}
							</select>
						</div>

						<div className='form-group'>
							<label htmlFor='quantity'>Quantity: </label>
							<input
								className='form-input'
								min='1'
								max='10'
								type='number'
								defaultValue='1'
								key='quantity'
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='plastic'>Plastic: </label>
							<input
								className='form-input'
								name='plastic'
								type='checkbox'
								key='plastic'
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='total'>Total: </label>
							<p key='total'>R{item?.price}</p>
						</div>

						<div className='form-group'>
							<button className={btnClass} type='submit'>
								Add to Cart
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ViewItemBlock;
