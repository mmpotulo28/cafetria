import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { iCategory, iItem, iSlide } from '../lib/Types';
import { categories, items } from '../lib/data';
import useEmblaCarousel from 'embla-carousel-react';

const MenuSlider = () => {
	const [slides, setSlides] = useState<iSlide[]>([]);
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

	useEffect(() => {
		const fetchData = async () => {
			const categories = await fetchCategories();
			const items = await fetchItems();

			const newSlides: iSlide[] = categories.map((category: iCategory) => {
				const categoryItems = items
					.filter((item) => item.category === category.data)
					.slice(0, 5);

				console.log(category.name, categoryItems);

				return {
					category,
					items: categoryItems,
				};
			});

			setSlides(newSlides);
		};

		fetchData();
	}, []);

	// move slider
	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	if (slides.length == 0) {
		return <div>Loading...</div>;
	}

	return (
		<section id='slide-menu' className='embla' ref={emblaRef}>
			<div id='menu-slider' className='embla__container'>
				{slides.map((slide: iSlide, index: number) => (
					<div key={index} className='slider-content embla__slide'>
						<div className='left'>
							<div className='img-cont'>
								<div className='img-block'>
									<Image
										className='grow'
										src={`/images/${slide.category.image}`}
										alt='slide image'
										width={400}
										height={400}
									/>
								</div>
							</div>
						</div>
						<div className='right slide-in'>
							<h1>{slide.category.name}</h1>
							<ul className='snack-list'>
								{slide.items.map((item: iItem, index: number) => (
									<li key={index}>
										<span>{item.name}</span>
										<span>R{item.price}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				))}
			</div>

			<div className='slider-btns-block'>
				<button className='slider-btn' id='slider-btn-left' onClick={scrollPrev}>
					&lt;
				</button>
				<button className='slider-btn' id='slider-btn-right' onClick={scrollNext}>
					&gt;
				</button>
			</div>
		</section>
	);
};

const fetchCategories = async (): Promise<iCategory[]> => {
	return categories.filter((category) => category.name !== 'all');
};

const fetchItems = async (): Promise<iItem[]> => {
	return items.sort(() => Math.random() - 0.5);
};

export default MenuSlider;
