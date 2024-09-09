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
}
