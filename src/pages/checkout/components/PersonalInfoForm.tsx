import React from 'react';

const PersonalInfoForm: React.FC = () => {
	return (
		<div className='personal-info-cont'>
			<h2>Personal Information</h2>
			<form id='personal-info-form'>
				<div className='form-group'>
					<label htmlFor='name'>Name</label>
					<input type='text' id='name' placeholder='Enter your name' />
				</div>
				<div className='form-group'>
					<label htmlFor='email'>Email</label>
					<input type='email' id='email' placeholder='Enter your email' />
				</div>
				<div className='form-group'>
					<label htmlFor='phone'>Phone</label>
					<input type='tel' id='phone' placeholder='Enter your phone number' />
				</div>
				<div className='form-group'>
					<label htmlFor='address'>Address</label>
					<input type='text' id='address' placeholder='Enter your address' />
				</div>
			</form>
		</div>
	);
};

export default PersonalInfoForm;
