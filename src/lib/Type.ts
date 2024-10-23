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
	stock?: number;
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

export interface iSidebarLink {
	href: string;
	icon: string;
	text: string;
}

export interface IUpdate {
	id: number;
	text: string;
	author: string;
	date: string;
}

export interface iOrderItem {
	id: number;
	order_id: number;
	item_id: number;
	name: string;
	quantity: number;
	price: string;
	image?: string;
}

export interface iOrder {
	id: number;
	username: string;
	noofitems: number;
	total: string;
	date: string;
	status: string;
	items: iOrderItem[];
}

export interface iProduct {
	id: number;
	image: string;
	name: string;
	extras: string;
	quantity: number;
	total: string;
}

export interface iCartTableRowProps {
	product: iProduct;
	editOnclick: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void;
	delOnclick: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void;
}

export interface ViewItemBlockProps {
	item: iItem;
	btnClass: string;
	statusClass: string;
	onSubmit: (e: React.FormEvent<HTMLFormElement>, item: iCartItem | undefined) => void;
}

export interface iUserProfile {
	username: string;
	first_name: string;
	last_name: string;
	city: string;
	country: string;
	avatar_url: string;
	phone_number: string;
	email: string;
	user_type?: string;
}

export interface iUserUpdateData {
	username?: string;
	first_name?: string;
	last_name?: string;
	phone_number?: string;
	address?: string;
	city?: string;
	state?: string;
	zip?: string;
	country?: string;
	facebook?: string;
	twitter?: string;
	instagram?: string;
	linkedin?: string;
	github?: string;
	login_provider?: string;
	avatar_url?: string;
	email?: string;
	user_type: string;
}
