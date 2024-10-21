import { useEffect, useReducer, useState } from "react";
import Image from "next/image";
import UserLayout from "../UserLayout";
import profileStyles from "./styles.module.css";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";

const initialState = {
	username: "loading...",
	first_name: "loading...",
	last_name: "loading...",
	email: "loading...",
	phone_number: "loading...",
	address: "loading...",
	city: "loading...",
	state: "loading...",
	zip: "loading...",
	country: "loading...",
	facebook: "loading...",
	twitter: "loading...",
	instagram: "loading...",
	linkedin: "loading...",
	github: "loading...",
	avatar_url: "/images/logo.jpeg",
	login_provider: "loading...",
	user_type: "customer",
};

type FormState = typeof initialState;
type FormAction =
	| { type: "SET_FIELD"; field: string; value: string }
	| { type: "SET_FORM_DATA"; data: Partial<FormState> };

function formReducer(state: FormState, action: FormAction) {
	switch (action.type) {
		case "SET_FIELD":
			return {
				...state,
				[action.field]: action.value,
			};
		case "SET_FORM_DATA":
			return {
				...state,
				...action.data,
			};
		default:
			return state;
	}
}

export default function UserProfilePage() {
	const [formData, dispatch] = useReducer(formReducer, initialState);
	const [isEditing, setIsEditing] = useState(false);
	const [statusMessage, setStatusMessage] = useState("");

	const { data: session, status } = useSession();
	const isUserLoggedIn = status === "authenticated";

	useEffect(() => {
		const fetchUserData = async () => {
			const response = await fetch(`/api/user/profile?email=${session?.user?.email}`);
			const data = await response.json();
			dispatch({ type: "SET_FORM_DATA", data });

			if (response.ok) {
				setStatusMessage("");
				// Cache the data with a 3-minute expiration
				Cookies.set("userProfile", JSON.stringify(data), { expires: 1 / 48 });
			} else {
				setStatusMessage(data.error);
				console.log("Failed to fetch user data:", data);
			}
		};

		if (isUserLoggedIn && session.user?.email) {
			const cachedData = Cookies.get("userProfile");
			if (cachedData) {
				dispatch({ type: "SET_FORM_DATA", data: JSON.parse(cachedData) });
			} else {
				fetchUserData();
			}
		}
	}, [isUserLoggedIn, session?.user?.email]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		dispatch({ type: "SET_FIELD", field: name, value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setStatusMessage("Saving...");
		const updatedData = {
			username: formData.username,
			first_name: formData.first_name,
			last_name: formData.last_name,
			phone_number: formData.phone_number,
			address: formData.address,
			city: formData.city,
			state: formData.state,
			zip: formData.zip,
			country: formData.country,
			facebook: formData.facebook,
			twitter: formData.twitter,
			instagram: formData.instagram,
			linkedin: formData.linkedin,
			github: formData.github,
			login_provider: formData.login_provider || "unknown",
			avatar_url: formData.avatar_url,
		};

		const response = await fetch(`/api/user/profile?email=${session?.user?.email}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedData),
		});

		if (response.ok) {
			const data = await response.json();
			dispatch({ type: "SET_FORM_DATA", data });
			setStatusMessage("Profile updated successfully!");
			setIsEditing(false);
			// Update the cache with the new data
			Cookies.set("userProfile", JSON.stringify(data), { expires: 1 / 48 });
		} else {
			setStatusMessage("Failed to update profile");
			console.log("Failed to update profile:", await response.json());
		}
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setStatusMessage("");
	};

	return (
		<UserLayout>
			<div className={profileStyles.dashboardCards}>
				<div className={profileStyles.profileInfo + " slide-in-left"}>
					<h3>Profile Info</h3>
					<form id="user-profile-form" onSubmit={handleSubmit}>
						<div className={profileStyles.formGroup}>
							<label htmlFor="name">Name</label>
							<input
								type="text"
								name="first_name"
								id="first_name"
								value={formData.first_name}
								onChange={handleChange}
								disabled={!isEditing}
								required
							/>
							<input
								type="text"
								name="last_name"
								id="last_name"
								value={formData.last_name}
								onChange={handleChange}
								disabled={!isEditing}
								required
							/>
						</div>
						<div className={profileStyles.formGroup}>
							<label htmlFor="username">Username</label>
							<input
								type="text"
								name="username"
								id="username"
								value={formData.username}
								onChange={handleChange}
								disabled={!isEditing}
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
								disabled={true}
								required
							/>
						</div>
						<div className={profileStyles.formGroup}>
							<label htmlFor="phone">Phone</label>
							<input
								type="tel"
								name="phone_number"
								id="phone_number"
								value={formData.phone_number}
								onChange={handleChange}
								disabled={!isEditing}
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
								disabled={!isEditing}
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
								disabled={!isEditing}
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
								disabled={!isEditing}
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
								disabled={!isEditing}
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
								disabled={!isEditing}
								required
							/>
						</div>
						<div className={profileStyles.formGroup}>
							<label htmlFor="provider">
								Provider{" "}
								<i
									className={`fab fa-${formData.login_provider.toLowerCase()}`}></i>
							</label>

							<input
								type="text"
								name="login_provider"
								id="login_provider"
								value={formData.login_provider}
								disabled={true}
							/>
						</div>
						<div className={profileStyles.formGroup}>
							<label htmlFor="user_type">User type</label>

							<input
								type="text"
								name="user_type"
								id="user_type"
								value={formData.user_type}
								disabled={true}
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
									disabled={!isEditing}
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
									disabled={!isEditing}
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
									disabled={!isEditing}
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
									disabled={!isEditing}
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
									disabled={!isEditing}
									placeholder="Github"
								/>
							</div>
						</div>
						<div className={`${profileStyles.formGroup} ${profileStyles.buttons}`}>
							{isEditing ? (
								<>
									<button type="button" onClick={handleCancel}>
										Cancel
									</button>
									<button type="submit">Save</button>
								</>
							) : (
								<button type="button" onClick={handleEdit}>
									Edit
								</button>
							)}
						</div>
					</form>
					{statusMessage && <p>{statusMessage}</p>}
				</div>

				<div className={`${profileStyles.profileBioRight} slide-in`}>
					<div className={profileStyles.profileImage}>
						<Image
							src={formData.avatar_url}
							alt="User Profile Image"
							width={150}
							height={150}
						/>
					</div>

					<div className={profileStyles.profileBio}>
						<div className={profileStyles.socialLinks}>
							<h3>Social Links</h3>
							<div className={profileStyles.socialLink}>
								<i className="fab fa-facebook"></i>
								<a
									href={formData.facebook}
									target="_blank"
									rel="noopener noreferrer">
									Facebook
								</a>
							</div>
							<div className={profileStyles.socialLink}>
								<i className="fab fa-twitter"></i>
								<a
									href={formData.twitter}
									target="_blank"
									rel="noopener noreferrer">
									Twitter
								</a>
							</div>
							<div className={profileStyles.socialLink}>
								<i className="fab fa-instagram"></i>
								<a
									href={formData.instagram}
									target="_blank"
									rel="noopener noreferrer">
									Instagram
								</a>
							</div>
							<div className={profileStyles.socialLink}>
								<i className="fab fa-linkedin"></i>
								<a
									href={formData.linkedin}
									target="_blank"
									rel="noopener noreferrer">
									LinkedIn
								</a>
							</div>
							<div className={profileStyles.socialLink}>
								<i className="fab fa-github"></i>
								<a href={formData.github} target="_blank" rel="noopener noreferrer">
									GitHub
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</UserLayout>
	);
}
