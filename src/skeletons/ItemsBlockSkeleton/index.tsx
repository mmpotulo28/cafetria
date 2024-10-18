import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ItemsBlockSkeleton = () => {
	const skeletonItems = Array.from({ length: 5 }, (_, index) => (
		<div key={index} className="item-card embla__slide">
			<Skeleton height={200} />
			<Skeleton count={3} />
		</div>
	));

	return (
		<div className="embla">
			<div className="items-block embla_container">{skeletonItems} loading...</div>
		</div>
	);
};

export default ItemsBlockSkeleton;
