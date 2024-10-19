import React, { useState } from "react";
import styles from "../auth.module.css";
import Link from "next/link";

const Signup: React.FC = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [termsAccepted, setTermsAccepted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert("Passwords do not match!");
			return;
		}
		if (!termsAccepted) {
			alert("You must accept the terms and conditions!");
			return;
		}
		// Handle signup logic here
		console.log("Username:", username);
		console.log("Email:", email);
		console.log("Password:", password);
	};

	return (
		<main className={styles.bodyContent}>
			<div className={styles.wrapper}>
				<form className={styles.form} onSubmit={handleSubmit} id="signup-form">
					<div className={styles.leftGroup}>
						<h1>Sign Up</h1>
						<div className={styles.formGroup}>
							<p className={styles.errorMessage}></p>
						</div>
						<div className={styles.formGroup}>
							<label htmlFor="username">Username:</label>
							<input
								type="text"
								id="username"
								name="username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
						</div>
						<div className={styles.formGroup}>
							<label htmlFor="email">Email:</label>
							<input
								type="email"
								id="email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className={styles.formGroup}>
							<label htmlFor="password">Password:</label>
							<input
								type="password"
								id="password"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<div className={styles.formGroup}>
							<label htmlFor="confirmPassword">Confirm Password:</label>
							<input
								type="password"
								id="confirmPassword"
								name="confirmPassword"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
						</div>
						<div className={styles.formGroup}>
							<div className={styles.terms}>
								<input
									type="checkbox"
									id="terms"
									name="terms"
									checked={termsAccepted}
									onChange={(e) => setTermsAccepted(e.target.checked)}
									required
								/>
								<label htmlFor="terms">
									I agree to these <a href="#">Terms & Conditions</a>
								</label>
							</div>
						</div>
					</div>
					<div className={styles.rightGroup}>
						<div className={styles.formGroup}>
							<button type="submit">Sign Up</button>
						</div>
						<div className={styles.socialLogin}>
							<p>Or log in with</p>
							<div className={styles.socialIcons}>
								<span className={styles.socialLoginBtn} id="google-login-btn">
									<i className="fab fa-google"></i>
								</span>
								<span className={styles.socialLoginBtn} id="facebook-login-btn">
									<i className="fab fa-facebook"></i>
								</span>
								<span className={styles.socialLoginBtn} id="github-login-btn">
									<i className="fab fa-github"></i>
								</span>
							</div>
						</div>
						<div className={styles.login}>
							<p>
								Already have an account? <Link href="./login">Login</Link>
							</p>
						</div>
					</div>
				</form>
			</div>
		</main>
	);
};

export default Signup;
