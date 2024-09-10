export interface iItem {
	key?: number;
	id: number;
	name: string;
	price: string;
	status: string;
	img: string;
	recommended: boolean;
	category: string;
	description: string;
	options: {
		name: string;
		opt: string[];
	};
}

export interface iCartItem {
	id: number;
	name: string;
	extras: string;
	quantity: number;
	total: string;
	image: string;
}

export interface iCategory {
	name: string;
	image: string;
	data?: string;
	items?: iItem[];
}

export interface iItemsBlockProps {
	itemClassName?: string;
	filterByChoice: string;
	filterByValue: string;
}

export interface iSlide {
	category: iCategory;
	items: iItem[];
}
