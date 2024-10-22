import "@/styles/globals.css";
import "@/styles/pages.css";
import "@/styles/fontawesome-6.5.2/css/all.min.css";

import React from "react";
import type { Metadata } from "next";
import Layout from "./layout";
import { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const metadata: Metadata = {
	title: "Cafetria | Home",
	description: "Cafetria is a modern web app for ordering food online.",
	category: "food",
	creator: "Manelisi Mpotulo",
	publisher: "Manelisi Mpotulo",
	icons: [
		{
			url: "images/logo.jpeg",
			sizes: "16x16",
			type: "image/jpeg",
		},
	],
};

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
	return (
		<SessionProvider session={session}>
			<PayPalScriptProvider
				options={{
					clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb",
					"client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb",
					"enable-funding": "venmo,paylater,card",
					"buyer-country": "SA",
					currency: "USD",
					components: "buttons,hosted-fields,card-fields",
				}}>
				<Head>
					<title>{"Home | Cafeteria"}</title>
					<meta name="description" content={metadata.description || ""} />
					<meta name="author" content={"Manelisi Mpotulo"} />
					<meta name="category" content={metadata.category || ""} />
					<meta name="creator" content={metadata.creator || ""} />
					<meta name="publisher" content={metadata.publisher || ""} />
				</Head>

				{/* main body content */}
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</PayPalScriptProvider>
		</SessionProvider>
	);
};

export default MyApp;
