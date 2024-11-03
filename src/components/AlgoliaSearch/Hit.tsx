import { Highlight } from "react-instantsearch";
import Image from 'next/image'
import { BaseHit, Hit as AlgoliaHit } from "instantsearch.js";



export const Hit = ({ hit }: { hit: AlgoliaHit<BaseHit> }) => {
	return (
		<article>
			<Image src={"/images/" + hit.img} alt={hit.name} width={50} height={50} />
   <div className="hit-name">
    <Highlight attribute="name" hit={hit} />
   </div>
   <div className="hit-status">
    <Highlight attribute="status" hit={hit} />
   </div>
   <div className="hit-price">
    <Highlight attribute="price" hit={hit} />
   </div>
   <div className="hit-category">
    <Highlight attribute="category" hit={hit} />
   </div>
		</article>
	);
};
