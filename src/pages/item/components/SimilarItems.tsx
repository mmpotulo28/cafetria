import ItemsBlock from "@/components/ItemsBlock";
import { iItem } from "@/lib/Type";
import React from "react";

interface iSimilarItemsProps {
	item: iItem;
	scrollNext: () => void;
	scrollPrev: () => void;
}

const SimilarItems: React.FC<iSimilarItemsProps> = ({ item, scrollNext, scrollPrev }) => {
	return (
		<section className="similar-items-sec">
			<div className="top-block">
				<h1 className="sec-heading" id="similar-item-heading">
					<i className="fa fa-tags"></i> Similar Items
				</h1>
				<div className="btns-block">
					<button className="similar-btn" id="prev" onClick={scrollPrev}>
						<i className="fa fa-chevron-left"></i>
					</button>
					<button className="similar-btn" id="next" onClick={scrollNext}>
						<i className="fa fa-chevron-right"></i>
					</button>
				</div>
			</div>

			<ItemsBlock
				itemClassName="similar-items"
				filterByChoice="category"
				filterByValue={item?.category}
			/>
		</section>
	);
};

export default SimilarItems;
