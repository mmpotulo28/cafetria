import { useEffect, useState } from "react";
import Image from "next/image";
import UserLayout from "../UserLayout";
// import styles from "../styles.module.css";
import profileStyles from "./styles.module.css";

export default function UserProfilePage() {
	const [formData, setFormData] = useState({
		name: "[User Name]",
		email: "[User Email]",
		phone: "[User Phone]",
		address: "[User Address]",
		city: "[User City]",
		state: "[User State]",
		zip: "[User Zip]",
		country: "[User Country]",
		facebook: "",
		twitter: "",
		instagram: "",
		linkedin: "",
		github: "",
	});

	useEffect(() => {
		// Fetch user data from the server
		const fetchUserData = async () => {
			const response = await fetch("/api/user/profile");
			const data = await response.json();
			setFormData(data);
		};

		fetchUserData();

		return () => {
			// Cleanup
		};
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		<UserLayout>
			<div className={profileStyles.dashboardCards}>
				<div className={profileStyles.profileInfo + " slide-in-left"}>
					<h3>Profile Info</h3>
					<form id="user-profile-form">
						<div className={profileStyles.formGroup}>
							<label htmlFor="name">Name</label>
							<input
								type="text"
								name="name"
								id="name"
								value={formData.name}
								onChange={handleChange}
								required
							/>
						</div>
						<div className={profileStyles.formGroup}>
							<label htmlFor="email">Email</label>
							<input
								type="email"
								name="email"
								id="email"
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</div>
						<div className={profileStyles.formGroup}>
							<label htmlFor="phone">Phone</label>
							<input
								type="tel"
								name="phone"
								id="phone"
								value={formData.phone}
								onChange={handleChange}
								required
							/>
						</div>
						<div className={profileStyles.formGroup}>
							<label htmlFor="address">Address</label>
							<input
								type="text"
								name="address"
								id="address"
								value={formData.address}
								onChange={handleChange}
								required
							/>
						</div>
						<div className={profileStyles.formGroup}>
							<label htmlFor="city">City</label>
							<input
								type="text"
								name="city"
								id="city"
								value={formData.city}
								onChange={handleChange}
								required
							/>
						</div>
						<div className={profileStyles.formGroup}>
							<label htmlFor="state">State</label>
							<input
								type="text"
								name="state"
								id="state"
								value={formData.state}
								onChange={handleChange}
								required
							/>
						</div>
						<div className={profileStyles.formGroup}>
							<label htmlFor="zip">Zip</label>
							<input
								type="text"
								name="zip"
								id="zip"
								value={formData.zip}
								onChange={handleChange}
								required
							/>
						</div>
						<div className={profileStyles.formGroup}>
							<label htmlFor="country">Country</label>
							<input
								type="text"
								name="country"
								id="country"
								value={formData.country}
								onChange={handleChange}
								required
							/>
						</div>
						<div className={`${profileStyles.formGroup} ${profileStyles.socialLinks}`}>
							<h3>Social Links</h3>
							<div className={profileStyles.socialLink}>
								<label htmlFor="facebook"> </label>
								<input
									type="text"
									name="facebook"
									id="facebook"
									value={formData.facebook}
									onChange={handleChange}
									placeholder="Facebook"
								/>
							</div>
							<div className={profileStyles.socialLink}>
								<label htmlFor="twitter"> </label>
								<input
									type="text"
									name="twitter"
									id="twitter"
									value={formData.twitter}
									onChange={handleChange}
									placeholder="Twitter"
								/>
							</div>
							<div className={profileStyles.socialLink}>
								<label htmlFor="instagram"> </label>
								<input
									type="text"
									name="instagram"
									id="instagram"
									value={formData.instagram}
									onChange={handleChange}
									placeholder="Instagram"
								/>
							</div>
							<div className={profileStyles.socialLink}>
								<label htmlFor="linkedin"> </label>
								<input
									type="text"
									name="linkedin"
									id="linkedin"
									value={formData.linkedin}
									onChange={handleChange}
									placeholder="LinkedIn"
								/>
							</div>
							<div className={profileStyles.socialLink}>
								<label htmlFor="github"> </label>
								<input
									type="text"
									name="github"
									id="github"
									value={formData.github}
									onChange={handleChange}
									placeholder="Github"
								/>
							</div>
						</div>
						<div className={`${profileStyles.formGroup} ${profileStyles.buttons}`}>
							<button>Cancel</button>
							<button>Save</button>
						</div>
					</form>
				</div>

				<div className={`${profileStyles.profileBioRight} slide-in`}>
					<div className={profileStyles.profileImage}>
						<Image
							src="/images/logo.jpeg"
							alt="User Profile Image"
							width={100}
							height={100}
						/>
					</div>

					<div className={profileStyles.profileBio}>
						<div className={profileStyles.socialLinks}>
							<h3>Social Links</h3>
							<div className={profileStyles.socialLink}>
								<i className="fab fa-facebook"></i>
								<a href="#">Facebook</a>
							</div>
							<div className={profileStyles.socialLink}>
								<i className="fab fa-twitter"></i>
								<a href="#">Twitter</a>
							</div>
							<div className={profileStyles.socialLink}>
								<i className="fab fa-instagram"></i>
								<a href="#">Instagram</a>
							</div>
							<div className={profileStyles.socialLink}>
								<i className="fab fa-linkedin"></i>
								<a href="#">LinkedIn</a>
							</div>
							<div className={profileStyles.socialLink}>
								<i className="fab fa-github"></i>
								<a href="#">GitHub</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</UserLayout>
	);
}
