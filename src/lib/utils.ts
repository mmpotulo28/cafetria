import { iItem } from './types';

export const filterByCategory = (category: string, items: iItem[]) => {
	if (category === 'All') {
		return items;
	}

	return items.filter((item) => item.category === category);
};

export const filterByStatus = (status: string, items: iItem[]) => {
	return items.filter((item) => item.status === status);
};

export const filterByRecommended = (recommended: string, items: iItem[]) => {
	const recommendedBool = recommended === 'true';
	return items.filter((item) => item.recommended === recommendedBool);
};

export const filterById = (id: number, items: iItem[]) => {
	return items.filter((item) => item.id == id);
};
