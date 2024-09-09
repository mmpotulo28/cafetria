import React from 'react';
import Image from 'next/image';
import { sponsors } from '../lib/data';

const Sponsors: React.FC = () => {
	return (
		<section id='sponsors'>
			<div className='sponsors-block'>
				{sponsors.map((sponsor, index) => (
					<div className='sponsor' key={index} data-name={sponsor.name}>
						<Image
							src={`/images/${sponsor.image}`}
							alt={`sponsor logo: ${sponsor.name}`}
							width={150}
							height={100}
							draggable={false}
						/>
					</div>
				))}
			</div>
		</section>
	);
};

export default Sponsors;
