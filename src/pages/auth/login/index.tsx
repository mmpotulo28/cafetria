import React, { useState } from "react";
import styles from "../auth.module.css";
import Link from "next/link";

import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn, useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default function SignIn({
	providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const { data: session, status } = useSession();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	console.log("session:", session);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		await signIn(
			"credentials",
			{ email, password },
			{ redirectTo: "/endpoints/user/dashboard" },
		);

		console.log("email:", email);
		console.log("password:", password);
	};

	const isUserLoggedIn = status === "authenticated";

	return (
		<>
			<main className={styles.bodyContent}>
				<div className={styles.wrapper}>
					<form className={styles.form} id="login-form" onSubmit={handleSubmit}>
						<div className={styles.leftGroup}>
							<h1>Log in</h1>
							<div className={styles.formGroup}>
								{isUserLoggedIn && (
									<p className={styles.errorMessage}>
										You are already logged in.
									</p>
								)}
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
									disabled={isUserLoggedIn}
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
									disabled={isUserLoggedIn}
								/>
							</div>

							<div className={styles.formGroup}>
								<div className={styles.recover}>
									<a href="#">Forgot Password?</a>
								</div>
							</div>
							<div className={styles.formGroup}>
								<button type="submit" disabled={isUserLoggedIn}>
									Log in
								</button>
							</div>
						</div>

						<div className={styles.rightGroup}>
							{/* social login option */}
							<div className={styles.socialLogin}>
								<p>Or log in with</p>
								<div className={styles.socialIcons}>
									{Object.values(providers).map((provider) => (
										<div key={provider.name}>
											<button
												className={styles.socialLoginBtn}
												onClick={() => signIn(provider.id)}
												disabled={isUserLoggedIn}>
												{provider.name === "Google" && (
													<i className="fab fa-google"></i>
												)}
												{provider.name === "GitHub" && (
													<i className="fab fa-github"></i>
												)}
											</button>
										</div>
									))}
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
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getServerSession(context.req, context.res, authOptions);

	// If the user is already logged in, redirect.
	// Note: Make sure not to redirect to the same page
	// To avoid an infinite loop!
	if (session) {
		console.log("Already logged in. Redirecting to home...", session);
		return { redirect: { destination: "/" } };
	}

	const providers = await getProviders();

	return {
		props: { providers: providers ?? [] },
	};
}
