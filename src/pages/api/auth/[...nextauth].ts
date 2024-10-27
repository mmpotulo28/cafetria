import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import TwitterProvider from "next-auth/providers/twitter";
import DiscordProvider from "next-auth/providers/discord";
import NextAuth, { Account, Session, TokenSet, User } from "next-auth";

interface SessionWithExtra extends Session {
	user: {
		id: string;
		name: string;
		email: string;
		image: string;
		access_token: string;
		id_token: string;
	};
}

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
		LinkedInProvider({
			clientId: process.env.LINKEDIN_ID || "",
			clientSecret: process.env.LINKEDIN_SECRET || "",
		}),
		TwitterProvider({
			name: "Twitter",
			clientId: process.env.TWITTER_ID || "",
			clientSecret: process.env.TWITTER_SECRET || "",
		}),
		DiscordProvider({
			clientId: process.env.DISCORD_ID || "",
			clientSecret: process.env.DISCORD_SECRET || "",
		}),
	],
	callbacks: {
		async session({ session, token }: { session: SessionWithExtra; token: TokenSet }) {
			// Include user.id and user.image in the session object
			if (token && session.user) {
				session.user.name = token.name as string;
				session.user.email = token.email as string;
				session.user.image = token.picture as string;
				session.user.access_token = token.access_token as string;
				session.user.id_token = token.id_token as string;
				session.expires = token.expires_at
					? new Date(token.expires_at).getTime().toString()
					: (Date.now() + 10 * 60 * 1000).toString();
			}
			return session;
		},
		async jwt({
			token,
			user,
			account,
		}: {
			token: TokenSet;
			user: User;
			account: Account | null;
		}) {
			// Include user.id and user.image in the token object
			if (user) {
				token.id = user.id;
				token.name = user.name;
				token.email = user.email;
				token.picture = user.image;
				token.access_token = account?.access_token;
				token.expires_at = account?.expires_at;
				token.id_token = account?.id_token;
				token.refresh_token = account?.refresh_token;
				token.token_type = account?.token_type;
				token.session_state = account?.session_state;
				token.scope = account?.scope;
				token.token_type = account?.token_type;
				token.provider = account?.provider;
				token.expires_in = account?.expires_in;

				// Check if the user exists in the database
				const userExists = await fetch(
					`${process.env.NEXTAUTH_URL}/api/user/profile?email=${user.email}`,
					{
						method: "GET",
						headers: { "Content-Type": "application/json" },
					},
				);
				const userExistsData = await userExists.json();

				if (!userExistsData.exists) {
					console.log("creating user", user);
					// Ensure all necessary fields are present, use "NA" if not
					const newUser = {
						email: user.email || "NA",
						username: "NA",
						name: user.name || "NA",
						phone_number: "NA",
						address: "NA",
						city: "NA",
						state: "NA",
						zip: "NA",
						country: "NA",
						facebook: "NA",
						twitter: "NA",
						instagram: "NA",
						linkedin: "NA",
						github: "NA",
						login_provider: account?.provider || "NA",
						avatar_url: user.image || "NA",
						user_type: "customer",
					};
					// Create a new user in the database
					await fetch(`${process.env.NEXTAUTH_URL}/api/authentication`, {
						method: "POST",
						body: JSON.stringify(newUser),
						headers: { "Content-Type": "application/json" },
					});
				}
			} else {
				console.log("user found");
			}
			return token;
		},
	},
};

// @ts-expect-error: NextAuth type mismatch
export default NextAuth(authOptions);
