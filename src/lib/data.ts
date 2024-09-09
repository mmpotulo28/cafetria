import { iItem, iCategory } from './Types';

const items: iItem[] = [
	{
		id: 1001,
		name: 'Vetkoeks',
		price: '22.00',
		status: 'out-off-stock',
		img: 'vetkook-mince.jpg',
		recommended: true,
		category: 'Fast Food',
		description:
			'Delicious vetkooks filled with mince. Perfectly fried to golden perfection and served with a side of tangy tomato sauce.',
		options: {
			name: 'sauce',
			opt: ['Chip Sauce', 'BBQ', 'Chilli', 'Tomato', 'None'],
		},
	},

	{
		id: 1002,
		name: 'Large Fries',
		price: '35.00',
		status: 'in-stock',
		img: 'fries.jpeg',
		recommended: false,
		category: 'Fast Food',
		description:
			'A large serving of crispy fries. Made from freshly cut potatoes and seasoned with a special blend of spices for an irresistible taste.',
		options: {
			name: 'sauce',
			opt: ['Chip Sauce', 'BBQ', 'Chilli', 'Tomato', 'None'],
		},
	},
	{
		id: 1003,
		name: 'Large Gatsby',
		price: '50.00',
		status: 'in-stock',
		img: 'gatsby.png',
		recommended: false,
		category: 'Fast Food',
		description:
			'A large and filling Gatsby sandwich. Packed with layers of juicy meat, fresh vegetables, and tangy sauces, all sandwiched between a soft roll.',
		options: {
			name: 'sauce',
			opt: ['Chip Sauce', 'BBQ', 'Chilli', 'Tomato', 'None'],
		},
	},
	{
		id: 1004,
		name: 'Chip Roll',
		price: '26.00',
		status: 'out-off-stock',
		img: 'chip-roll.png',
		recommended: true,
		category: 'Fast Food',
		description:
			'A delicious chip roll with various toppings. Crispy chips piled high on a soft roll, topped with melted cheese, tangy mayo, and spicy jalapenos.',
		options: {
			name: 'sauce',
			opt: ['Chip Sauce', 'BBQ', 'Chilli', 'Tomato', 'None'],
		},
	},
	{
		id: 1005,
		name: 'Score Can',
		price: '11.00',
		status: 'in-stock',
		img: 'score.jpeg',
		recommended: true,
		category: 'Cold Drinks',
		description:
			'A refreshing can of Score energy drink. Bursting with a combination of fruity flavors and a kick of caffeine to keep you energized throughout the day.',
		options: {
			name: 'Flavour',
			opt: ['Original', 'Berry', 'Apple'],
		},
	},
	{
		id: 1006,
		name: 'Vetkoeks',
		price: '21.00',
		status: 'in-stock',
		img: 'vetkook-mince.jpg',
		recommended: false,
		category: 'Fast Food',
		description:
			'Vetkooks filled with delicious mince. Each vetkook is generously stuffed with a savory mince filling, creating a mouthwatering combination of flavors.',
		options: {
			name: 'sauce',
			opt: ['Chip Sauce', 'BBQ', 'Chilli', 'Tomato', 'None'],
		},
	},
	{
		id: 1007,
		name: 'Plain Vetkooks',
		price: '7.00',
		status: 'out-off-stock',
		img: 'vetkoek-plain.jpg',
		recommended: false,
		category: 'Fast Food',
		description:
			'Plain vetkooks without any fillings. These fluffy and golden vetkooks are perfect for dipping into your favorite sauces or enjoying on their own.',
		options: {
			name: 'sauce',
			opt: ['Chip Sauce', 'BBQ', 'Chilli', 'Tomato', 'None'],
		},
	},
	{
		id: 1008,
		name: 'Yoghurt',
		price: '15.00',
		status: 'in-stock',
		img: 'yoghurt.jpeg',
		recommended: false,
		category: 'Snacks',
		description:
			'A healthy and creamy yoghurt. Made from the finest ingredients, this yoghurt is packed with probiotics and a burst of fruity flavors.',
		options: {
			name: 'Flavour',
			opt: ['Strawberry', 'Vanilla', 'Blueberry'],
		},
	},
	{
		id: 1009,
		name: 'Spinach Smoothie',
		price: '30.00',
		status: 'in-stock',
		img: 'spinach-smoothie.png',
		recommended: false,
		category: 'Healthy',
		description:
			'A nutritious spinach smoothie. Blended with fresh spinach, ripe fruits, and a touch of honey, this smoothie is a delicious way to boost your daily intake of vitamins and minerals.',
		options: {
			name: 'Add-Ons',
			opt: ['Protein Powder', 'Chia Seeds', 'Flax Seeds', 'None'],
		},
	},
	{
		id: 1010,
		name: 'Pap Meal',
		price: '60.00',
		status: 'in-stock',
		img: 'pap-meal.png',
		recommended: true,
		category: 'Meals',
		description:
			'A hearty meal with pap and various toppings. Enjoy a comforting bowl of pap topped with your choice of flavorful stews, vegetables, and sauces.',
		options: {
			name: 'Toppings',
			opt: ['Beef Stew', 'Chicken Stew', 'Vegetable Curry'],
		},
	},
	{
		id: 1011,
		name: 'Chicken Burger',
		price: '45.00',
		status: 'in-stock',
		img: 'chicken-burger.jpeg',
		recommended: true,
		category: 'Fast Food',
		description:
			'A delicious chicken burger with all the fixings. Sink your teeth into a juicy chicken patty, topped with fresh lettuce, ripe tomatoes, and a creamy sauce, all sandwiched between a soft bun.',
		options: {
			name: 'Sauce',
			opt: ['Chip Sauce', 'BBQ', 'Chilli', 'Tomato', 'None'],
		},
	},
	{
		id: 1012,
		name: 'Cheese Pizza',
		price: '55.00',
		status: 'in-stock',
		img: 'cheese-pizza.jpeg',
		recommended: false,
		category: 'Fast Food',
		description:
			'A cheesy and flavorful pizza. Indulge in a mouthwatering pizza topped with a generous amount of gooey cheese and your favorite toppings.',
		options: {
			name: 'Toppings',
			opt: ['Pepperoni', 'Mushrooms', 'Bell Peppers', 'None'],
		},
	},
	{
		id: 1013,
		name: 'Ice Cream',
		price: '25.00',
		status: 'in-stock',
		img: 'ice-cream.png',
		recommended: true,
		category: 'Cold Desserts',
		description:
			'A cool and creamy ice cream treat. Made with the finest ingredients, this ice cream is available in a variety of flavors to satisfy your sweet tooth.',
		options: {
			name: 'Flavour',
			opt: ['Vanilla', 'Chocolate', 'Strawberry', 'Mint'],
		},
	},
	{
		id: 1014,
		name: 'Chocolate Cake',
		price: '35.00',
		status: 'in-stock',
		img: 'chocolate-cake.jpeg',
		recommended: false,
		category: 'Cakes',
		description:
			'A rich and decadent chocolate cake. Moist layers of chocolate cake are filled and frosted with a velvety chocolate ganache, creating a dessert that chocolate lovers will adore.',
		options: {
			name: 'Size',
			opt: ['Small', 'Medium', 'Large'],
		},
	},
	{
		id: 1015,
		name: 'Cupcakes',
		price: '15.00',
		status: 'in-stock',
		img: 'cupcake.jpeg',
		recommended: false,
		category: 'Cakes',
		description:
			'Delicious and bite-sized cupcakes. These fluffy and moist cupcakes are topped with a swirl of creamy frosting and a sprinkle of colorful decorations.',
		options: {
			name: 'Flavor',
			opt: ['Vanilla', 'Chocolate', 'Red Velvet', 'Lemon'],
		},
	},
	{
		id: 1016,
		name: 'Muffins',
		price: '20.00',
		status: 'in-stock',
		img: 'muffins.png',
		recommended: false,
		category: 'Cakes',
		description:
			'Freshly baked muffins in various flavors. Enjoy a warm and tender muffin, bursting with flavors like blueberry, chocolate chip, or banana nut.',
		options: {
			name: 'Flavor',
			opt: ['Blueberry', 'Chocolate Chip', 'Banana Nut', 'Lemon'],
		},
	},
	{
		id: 1017,
		name: 'Pies',
		price: '25.00',
		status: 'in-stock',
		img: 'pies.png',
		recommended: false,
		category: 'Cakes',
		description:
			'Savory and delicious pies. These flaky and golden pies are filled with a variety of fillings, such as chicken and mushroom, beef and ale, or vegetable medley.',
		options: {
			name: 'Filling',
			opt: ['Chicken & Mushroom', 'Beef & Ale', 'Vegetable Medley'],
		},
	},
	{
		id: 1018,
		name: 'Scones',
		price: '15.00',
		status: 'in-stock',
		img: 'scones.jpeg',
		recommended: false,
		category: 'Cakes',
		description:
			'Freshly baked scones with jam and cream. These buttery and crumbly scones are the perfect accompaniment to a cup of tea or coffee.',
		options: {
			name: 'Toppings',
			opt: ['Strawberry Jam', 'Raspberry Jam', 'Blueberry Jam', 'None'],
		},
	},
	// cans
	{
		id: 1019,
		name: 'Coca-Cola Can',
		price: '15.00',
		status: 'in-stock',
		img: 'coke.png',
		recommended: false,
		category: 'Cold Drinks',
		description:
			'A classic can of Coca-Cola. Enjoy the refreshing and fizzy taste of this iconic cola beverage.',
		options: {
			name: 'Flavour',
			opt: ['Original', 'No Sugar'],
		},
	},
	{
		id: 1020,
		name: 'Fanta Can',
		price: '15.00',
		status: 'in-stock',
		img: 'fanta.png',
		recommended: false,
		category: 'Cold Drinks',
		description:
			'A refreshing can of Fanta. Bursting with fruity flavors, this carbonated drink is a delightful thirst quencher.',
		options: {
			name: 'Flavour',
			opt: ['Orange', 'Grape', 'Pineapple'],
		},
	},
	{
		id: 1021,
		name: 'Sprite Can',
		price: '15.00',
		status: 'in-stock',
		img: 'sprite.png',
		recommended: true,
		category: 'Cold Drinks',
		description:
			'A bubbly can of Sprite. Crisp and lemon-lime flavored, this sparkling beverage is perfect for a refreshing pick-me-up.',
		options: {
			name: 'Flavour',
			opt: ['Original', 'Lemon', 'Cucumber'],
		},
	},
	{
		id: 1022,
		name: 'Stoney Can',
		price: '15.00',
		status: 'in-stock',
		img: 'stoney.jpeg',
		recommended: false,
		category: 'Cold Drinks',
		description:
			'A spicy and refreshing can of Stoney. This ginger beer has a unique and zesty flavor that will awaken your taste buds.',
		options: {
			name: 'Flavour',
			opt: ['Original', 'Ginger & Lime', 'Ginger & Lemon'],
		},
	},
	{
		id: 1023,
		name: 'Pepsi',
		price: '15.00',
		status: 'in-stock',
		img: 'pepsi.png',
		recommended: false,
		category: 'Cold Drinks',
		description:
			'A cool can of Pepsi. Enjoy the smooth and cola taste of this popular beverage.',
		options: {
			name: 'Flavour',
			opt: ['Original', 'Cherry', 'Vanilla'],
		},
	},
	{
		id: 1024,
		name: 'Mirinda',
		price: '15.00',
		status: 'in-stock',
		img: 'mirinda.jpeg',
		recommended: false,
		category: 'Cold Drinks',
		description:
			'A fruity can of Mirinda. Bursting with vibrant flavors, this carbonated drink is a delightful thirst quencher.',
		options: {
			name: 'Flavour',
			opt: ['Orange', 'Grape', 'Pineapple'],
		},
	},
	{
		id: 1025,
		name: 'Appletiser',
		price: '15.00',
		status: 'in-stock',
		img: 'appletiser.webp',
		recommended: false,
		category: 'Cold Drinks',
		description:
			'A sparkling can of Appletiser. Made from 100% apple juice, this fizzy drink is a refreshing choice for any occasion.',
		options: {
			name: 'Flavour',
			opt: ['Original', 'Apple & Berry', 'Apple & Pomegranate'],
		},
	},
	{
		id: 1026,
		name: 'Red Bull',
		price: '15.00',
		status: 'in-stock',
		img: 'red-bull.jpeg',
		recommended: false,
		category: 'Cold Drinks',
		description:
			'An energy-boosting can of Red Bull. Packed with caffeine and other energizing ingredients, this drink will give you the energy you need to power through your day.',
		options: {
			name: 'Flavour',
			opt: ['Original', 'Sugar-Free', 'Tropical'],
		},
	},
	{
		id: 1027,
		name: 'Monster Can',
		price: '15.00',
		status: 'in-stock',
		img: 'monster.jpeg',
		recommended: false,
		category: 'Cold Drinks',
		description:
			'A powerful can of Monster energy drink. With its bold flavors and high caffeine content, this drink is perfect for those who need an extra boost of energy.',
		options: {
			name: 'Flavour',
			opt: ['Original', 'Ultra', 'Java'],
		},
	},
];

const categories: iCategory[] = [
	{ name: 'all', data: 'All', image: 'appletiser.webp' },
	{ name: 'fast-food', data: 'Fast Food', image: 'pies.png' },
	{ name: 'snacks', data: 'Snacks', image: 'muffins.png' },
	{ name: 'cold-drinks', data: 'Cold Drinks', image: 'red-bull.png' },
	{ name: 'meals', data: 'Meals', image: 'pap-meal.png' },
	// { name: 'healthy', data: 'Healthy', image: 'spinach-smoothie.png' },
];

const sponsors = [
	{ name: 'CPUT', image: 'cput-logo.png' },
	{ name: 'Nedbank', image: 'nedbank-log.png' },
	{ name: 'Varsity Vibe', image: 'varsityvibe-log.png' },
	{ name: 'Mastercard', image: 'mastercard-logo.png' },
	{ name: 'Score', image: 'score-logo.png' },
];

export { items, categories, sponsors };
