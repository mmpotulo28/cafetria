import React, { useState } from "react";
import emailjs, { EmailJSResponseStatus } from "emailjs-com";
import styles from "./contact.module.css";
import Image from "next/image";

export default function Page() {
	const [formData, setFormData] = useState({ name: "", email: "", message: "" });
	const [statusMessage, setStatusMessage] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const sendEmail = (e: React.FormEvent) => {
		e.preventDefault();
		setStatusMessage("Sending email...");

		emailjs
			.sendForm(
				process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
				process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
				e.target as HTMLFormElement,
				process.env.NEXT_PUBLIC_EMAILJS_USER_ID as string,
			)
			.then(
				(result: EmailJSResponseStatus) => {
					setStatusMessage("Email successfully sent!");
					console.log("Email successfully sent!", result);
					setTimeout(() => setStatusMessage(""), 3000); // Clear message after 3 seconds
				},
				(error: { text: string }) => {
					setStatusMessage("Error sending email.");
					console.error("Error sending email:", error.text);
					setTimeout(() => setStatusMessage(""), 3000); // Clear message after 3 seconds
				},
			);
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

				<div className={styles.details}>
					<h2>Contact Us</h2>
					<p>Email: contact@cafetria.com</p>
					<p>Phone: (123) 456-7890</p>
					<p>Address: 123 Main Street, City, Country</p>
					<div className={styles.icons}>
						<a href="mailto:contact@cafetria.com">
							<i className="fas fa-envelope"></i>
						</a>
						<a href="tel:+1234567890">
							<i className="fas fa-phone"></i>
						</a>
						<a
							href="https://www.google.com/maps?q=123+Main+Street,+City,+Country"
							target="_blank"
							rel="noopener noreferrer">
							<i className="fas fa-map-marker-alt"></i>
						</a>
					</div>
				</div>
			</div>
			<div className={styles.formSection}>
				<h2>Contact Form</h2>
				<form onSubmit={sendEmail} className={styles.form}>
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
				{statusMessage && <p>{statusMessage}</p>}
			</div>
		</div>
	);
}
