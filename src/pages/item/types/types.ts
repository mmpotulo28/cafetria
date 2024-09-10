import { iCartItem, iItem } from '../../../lib/types';

export interface ViewItemBlockProps {
	item: iItem;
	btnClass: string;
	statusClass: string;
	onSubmit: (e: React.FormEvent<HTMLFormElement>, item: iCartItem | undefined) => void;
}
