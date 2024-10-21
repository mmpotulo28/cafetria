import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";

const PersonalInfoForm: React.FC = () => {
	const { data: session } = useSession();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		full_address: "",
		phone: "",
	});

	useEffect(() => {
		const fetchUserData = async () => {
			if (session?.user?.email) {
				try {
					const cachedData = Cookies.get("userData");
					if (cachedData) {
						setFormData(JSON.parse(cachedData));
					} else {
						const response = await fetch(
							`/api/user/profile?email=${session.user.email}`,
						);
						const data = await response.json();
						const userData = {
							name: `${data.first_name} ${data.last_name}`,
							email: data.email,
							full_address: `${data.address}, ${data.city}, ${data.state}, ${data.zip}, ${data.country}`,
							phone: data.phone_number,
						};
						setFormData(userData);
						Cookies.set("userData", JSON.stringify(userData), { expires: 1 / 480 }); // 3 minutes
					}
				} catch (error) {
					console.error("Error fetching user data:", error);
				}
			}
		};

		fetchUserData();
	}, [session]);

	function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
		const { id, value } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[id]: value,
		}));
	}

	return (
		<div className="personal-info-cont">
			<h2>Personal Information</h2>
			<form id="personal-info-form">
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input
						type="text"
						id="name"
						placeholder="Enter your name"
						value={formData.name}
						onChange={handleChange}
						disabled
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						placeholder="Enter your email"
						value={formData.email}
						onChange={handleChange}
						disabled
					/>
				</div>
				<div className="form-group">
					<label htmlFor="full_address">Full Address</label>
					<input
						type="text"
						id="full_address"
						placeholder="Enter your full address"
						value={formData.full_address}
						onChange={handleChange}
						disabled
					/>
				</div>
				<div className="form-group">
					<label htmlFor="phone">Phone</label>
					<input
						type="tel"
						id="phone"
						placeholder="Enter your phone number"
						value={formData.phone}
						onChange={handleChange}
						disabled
					/>
				</div>
			</form>
		</div>
	);
};

export default PersonalInfoForm;
