import UserLayout from '../UserLayout';
import styles from '../styles.module.css';
import profileStyles from './styles.module.css';

export default function UserProfilePage() {
	return (
		<UserLayout>
			<div className={styles.welcomeMessage}>
				<h1>Welcome, [User Name]!</h1>
				<p>Here's a quick overview of your account and recent activities.</p>
			</div>

			<div className={profileStyles.dashboardCards}>
				<div className={profileStyles.profileInfo + ' slide-in-left'}>
					<h3>Profile Info</h3>
					<form id='user-profile-form'>
						<div className={profileStyles.formGroup}>
							<label htmlFor='name'>Name</label>
							<input type='text' name='name' id='name' value='[User Name]' required />
						</div>
						<div className={profileStyles.formGroup}>
							<label htmlFor='email'>Email</label>
							<input
								type='email'
								name='email'
								id='email'
								value='[User Email]'
								required
							/>
						</div>
						<div className={profileStyles.formGroup}>
							<label htmlFor='phone'>Phone</label>
							<input
								type='tel'
								name='phone'
								id='phone'
								value='[User Phone]'
								required
							/>
						</div>
						<div className={profileStyles.formGroup}>
							<label htmlFor='address'>Address</label>
							<input
								type='text'
								name='address'
								id='address'
								value='[User Address]'
								required
							/>
						</div>
						<div className={profileStyles.formGroup}>
							<label htmlFor='city'>City</label>
							<input type='text' name='city' id='city' value='[User City]' required />
						</div>
						<div className={profileStyles.formGroup}>
							<label htmlFor='state'>State</label>
							<input
								type='text'
								name='state'
								id='state'
								value='[User State]'
								required
							/>
						</div>
						<div className={profileStyles.formGroup}>
							<label htmlFor='zip'>Zip</label>
							<input type='text' name='zip' id='zip' value='[User Zip]' required />
						</div>
						<div className={profileStyles.formGroup}>
							<label htmlFor='country'>Country</label>
							<input
								type='text'
								name='country'
								id='country'
								value='[User Country]'
								required
							/>
						</div>
						<div className={`${profileStyles.formGroup} ${profileStyles.socialLinks}`}>
							<h3>Social Links</h3>
							<div className={profileStyles.socialLink}>
								<label htmlFor='facebook'> </label>
								<input
									type='text'
									name='facebook'
									id='facebook'
									value=''
									placeholder='Facebook'
								/>
							</div>
							<div className={profileStyles.socialLink}>
								<label htmlFor='twitter'> </label>
								<input
									type='text'
									name='twitter'
									id='twitter'
									value=''
									placeholder='Twitter'
								/>
							</div>
							<div className={profileStyles.socialLink}>
								<label htmlFor='instagram'> </label>
								<input
									type='text'
									name='instagram'
									id='instagram'
									value=''
									placeholder='Instagram'
								/>
							</div>
							<div className={profileStyles.socialLink}>
								<label htmlFor='linkedin'> </label>
								<input
									type='text'
									name='linkedin'
									id='linkedin'
									value=''
									placeholder='LinkedIn'
								/>
							</div>
							<div className={profileStyles.socialLink}>
								<label htmlFor='github'> </label>
								<input
									type='text'
									name='github'
									id='github'
									value=''
									placeholder='Github'
								/>
							</div>
						</div>
						<div className={`${profileStyles.formGroup} ${profileStyles.buttons}`}>
							<button className={`${profileStyles.btn} ${profileStyles.saveBtn}`}>
								Save
							</button>
							<button className={`${profileStyles.btn} ${profileStyles.cancelBtn}`}>
								Cancel
							</button>
						</div>
					</form>
				</div>

				<div className={`${profileStyles.profileBioRight} slide-in`}>
					<div className={profileStyles.profileImage}>
						<img src='/images/logo.jpeg' alt='User Profile Image' />
					</div>

					<div className={profileStyles.profileBio}>
						<div className={profileStyles.socialLinks}>
							<h3>Social Links</h3>
							<div className={profileStyles.socialLink}>
								<i className='fab fa-facebook'></i>
								<a href='#'>Facebook</a>
							</div>
							<div className={profileStyles.socialLink}>
								<i className='fab fa-twitter'></i>
								<a href='#'>Twitter</a>
							</div>
							<div className={profileStyles.socialLink}>
								<i className='fab fa-instagram'></i>
								<a href='#'>Instagram</a>
							</div>
							<div className={profileStyles.socialLink}>
								<i className='fab fa-linkedin'></i>
								<a href='#'>LinkedIn</a>
							</div>
							<div className={profileStyles.socialLink}>
								<i className='fab fa-github'></i>
								<a href='#'>GitHub</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</UserLayout>
	);
}
