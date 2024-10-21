import React from "react";
import styles from "../auth.module.css";
import Link from "next/link";
import Image from "next/image";

import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn, useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default function SignIn({
	providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const { data: session, status } = useSession();

	const isUserLoggedIn = status === "authenticated";

	return (
		<>
			<main className={styles.bodyContent}>
				<div className={styles.wrapper}>
					<div className={styles.form} id="login-form">
						<div className={styles.leftGroup}>
							<h1>Log in</h1>
							<div className={styles.formGroup}>
								{isUserLoggedIn && (
									<p className={styles.errorMessage}>
										You are already logged in as {session.user?.name}.
									</p>
								)}
							</div>
							<div className={styles.formGroup}>
								<Image
									src="/images/logo.jpeg"
									alt="Logo"
									className={styles.logo}
									width={160}
									height={160}
								/>
								<p className={styles.leftText}>
									We only support social login methods for enhanced security and
									convenience.
								</p>
							</div>
						</div>

						<div className={styles.rightGroup}>
							<div className={styles.socialLogin}>
								<p>Log in with</p>
								<div className={styles.socialIcons}>
									{Object.values(providers).map((provider) => (
										<div key={provider.name}>
											<button
												className={styles.socialLoginBtn}
												onClick={() => signIn(provider.id)}
												disabled={isUserLoggedIn}>
												<i className={`fab fa-${provider.id}`}></i>
												{provider.name}
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
					</div>
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
