import React, { useState } from "react";
import styles from "../auth.module.css";
import Link from "next/link";

const Login: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		// Handle login logic here
		console.log("Email:", email);
		console.log("Password:", password);
	};

	const handleGoogleSignIn = () => {
		// Handle Google sign-in logic here
		console.log("Google sign-in");
	};

	const handleGitHubSignIn = () => {
		// Handle GitHub sign-in logic here
		console.log("GitHub sign-in");
	};

	return (
		<main className={styles.bodyContent}>
			<div className={styles.wrapper}>
				<form className={styles.form} id="login-form" onSubmit={handleSubmit}>
					<div className={styles.leftGroup}>
						<h1>Log in</h1>
						<div className={styles.formGroup}>
							<p className={styles.errorMessage}></p>
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
							<div className={styles.recover}>
								<a href="#">Forgot Password?</a>
							</div>
						</div>
						<div className={styles.formGroup}>
							<button type="submit">Log in</button>
						</div>
					</div>

					<div className={styles.rightGroup}>
						{/* social login option */}
						<div className={styles.socialLogin}>
							<p>Or log in with</p>
							<div className={styles.socialIcons}>
								<span
									className={styles.socialLoginBtn}
									id="google-login-btn"
									onClick={handleGoogleSignIn}>
									<i className="fab fa-google"></i>
								</span>
								<span className={styles.socialLoginBtn} id="facebook-login-btn">
									<i className="fab fa-facebook"></i>
								</span>
								<span
									className={styles.socialLoginBtn}
									id="github-login-btn"
									onClick={handleGitHubSignIn}>
									<i className="fab fa-github"></i>
								</span>
							</div>
						</div>

						<div className={styles.login}>
							<p>
								No account? <Link href="./signup">Sign Up</Link>
							</p>
						</div>
					</div>
				</form>
			</div>
		</main>
	);
};

export default Login;
