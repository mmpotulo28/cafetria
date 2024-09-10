import { iCartItem, iItem } from '@/lib/Type';
import React from 'react';
import { ViewItemBlockProps } from '../types/types';

const ViewItemBlock: React.FC<ViewItemBlockProps> = ({ item, btnClass, statusClass, onSubmit }) => {
	const [id, setId] = React.useState<number>(item?.id);
	const [name, setName] = React.useState<string>(item?.name);
	const [selectedOption, setSelectedOption] = React.useState<string>(item?.options.opt[0]);
	const [quantity, setQuantity] = React.useState<number>(1);
	const [plastic, setPlastic] = React.useState<boolean>(false);
	const [total, setTotal] = React.useState<number>(Number(item?.price));
	const [extras, setExtras] = React.useState<string>(
		`${selectedOption}, ${plastic ? 'Plastic' : 'No plastic'}`,
	);
	const [image, setImage] = React.useState<string>(item?.img);
	const [cartItem, setCartItem] = React.useState<iCartItem>();

	React.useEffect(() => {
		setCartItem({
			id,
			name,
			extras,
			quantity,
			total: total.toString(),
			image,
		});
	}, [id, name, selectedOption, quantity, plastic, total, extras, image]);

	const setExtrasVariable = () => {
		const newExtras = {
			extras: selectedOption,
			plastic: plastic ? 'Plastic' : 'No plastic',
		};

		setExtras(`${newExtras.extras}, ${newExtras.plastic}`);
	};

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
				<h2 className='item-name'>{name}</h2>
				<p className={`item-status ${statusClass}`}>
					{renderStatusIcon()}
					{renderStatusText()}
				</p>
			</div>

			<div className='main-block'>
				<div className='img-block'>
					<img src={`/images/${image}`} alt='' />
				</div>

				<div className='item-description'>
					<h3>Description:</h3>
					<p>{item?.description}</p>
				</div>

				<div className='item-config'>
					<form key='item-config-form' onSubmit={(e) => onSubmit(e, cartItem)}>
						<div className='form-group'>
							<label htmlFor='sauce'>{item?.options.name}: </label>
							<select
								className='form-input'
								name='sauce'
								key='sauce'
								onChange={(e) => {
									setSelectedOption(e.target.value);
									setExtrasVariable();
								}}>
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
								onChange={(e) => {
									setQuantity(Number(e.target.value));
									setTotal(Number(item?.price) * Number(e.target.value));
								}}
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='plastic'>Plastic: </label>
							<input
								className='form-input'
								name='plastic'
								type='checkbox'
								key='plastic'
								onChange={(e) => {
									setPlastic(e.target.checked);
									setExtrasVariable();
								}}
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='total'>Total: </label>
							<p key='total'>R{total}</p>
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
