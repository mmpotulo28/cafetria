import React from 'react';

const Updates: React.FC = () => {
	const updates = [
		'Website is under development!',
		'Website is under development!',
		'Website is under development!',
		'Website is under development!',
		'Website is under development!',
		'Website is under development!',
	];

	return (
		<div id='updates'>
			<div className='update-cont'>
				{updates.map((update: string, index) => (
					<p key={index} className='update-msg'>
						{update}
					</p>
				))}
			</div>
		</div>
	);
};

export default Updates;
