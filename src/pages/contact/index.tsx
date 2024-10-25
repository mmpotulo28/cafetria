import React, { useState } from "react";
import styles from "./contact.module.css";
import Image from "next/image";

export default function Page() {
	const [formData, setFormData] = useState({ name: "", email: "", message: "" });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission logic here
		console.log("Form submitted:", formData);
	};

	return (
		<div className={styles.container}>
			<div className={styles.contactsSection}>
				<Image
					src="/images/logo.jpeg"
					alt="Company Logo"
					className={styles.logo}
					width={200}
					height={200}
				/>

				<h2>Contact Us</h2>
				<p>Email: contact@cafetria.com</p>
				<p>Phone: (123) 456-7890</p>
				<p>Address: 123 Main Street, City, Country</p>
			</div>
			<div className={styles.formSection}>
				<h2>Contact Form</h2>
				<form onSubmit={handleSubmit} className={styles.form}>
					<div>
						<label>
							Name:
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
							/>
						</label>
					</div>
					<div>
						<label>
							Email:
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</label>
					</div>
					<div>
						<label>
							Message:
							<textarea
								name="message"
								value={formData.message}
								onChange={handleChange}
								required
							/>
						</label>
					</div>
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
}
