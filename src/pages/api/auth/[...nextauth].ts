import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import NextAuth, { Session, TokenSet, User } from "next-auth";

export const authOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID || "",
			clientSecret: process.env.GITHUB_SECRET || "",
			profile(profile) {
				return {
					id: profile.id.toString(),
					name: profile.name || profile.login,
					email: profile.email,
					image: profile.avatar_url,
				};
			},
		}),
		GoogleProvider({
			id: "google",
			name: "Google",
			clientId: process.env.GOOGLE_ID || "",
			clientSecret: process.env.GOOGLE_SECRET || "",
		}),
		CredentialsProvider({
			id: "credentials",
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				console.log("Credentials:", credentials);
				try {
					const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
						method: "POST",
						body: JSON.stringify(credentials),
						headers: { "Content-Type": "application/json" },
					});
					const user = await res.json();

					if (res.ok && user) {
						console.log("LoggedIn User:", user);
						// Ensure the user object includes the necessary fields
						return {
							id: user.id,
							name: user.name,
							email: user.email,
							image: user.image,
						};
					}
					throw new Error(user.message || "Invalid credentials");
				} catch (error) {
					console.error("Error during authorization:", error);
					throw new Error("Authorization failed");
				}
			},
		}),
	],
	callbacks: {
		async session({ session, token }: { session: Session; token: TokenSet }) {
			// Include user.id and user.image in the session object
			if (token && session.user) {
				session.user.name = token.name as string;
				session.user.email = token.email as string;
				session.user.image = token.picture as string;
			}
			return session;
		},
		async jwt({ token, user }: { token: TokenSet; user: User }) {
			// Include user.id and user.image in the token object
			if (user) {
				token.id = user.id;
				token.name = user.name;
				token.email = user.email;
				token.picture = user.image;
			}
			return token;
		},
	},
};

export default NextAuth(authOptions);
