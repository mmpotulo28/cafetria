import { NextPage } from "next";
import "@/styles/globals.css";
import "@/styles/pages.css";
import "@/styles/fontawesome-6.5.2/css/all.min.css";
import Script from "next/script";

import React from "react";
import type { Metadata } from "next";
import Layout from "./layout";
import { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { FullScreenProvider, useFullScreen } from "@/context/FullScreenContext";

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

				<FullScreenProvider>
					<Content Component={Component} pageProps={pageProps} />
					{/* Google Analytics */}

					<Script
						src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
						strategy="afterInteractive"
					/>
					<Script
						id="google-analytics"
						strategy="afterInteractive"
						dangerouslySetInnerHTML={{
							__html: `
													window.dataLayer = window.dataLayer || [];
													function gtag(){dataLayer.push(arguments);}
													gtag('js', new Date());
													gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID});
												`,
						}}
					/>
				</FullScreenProvider>
			</PayPalScriptProvider>
		</SessionProvider>
	);
};

const Content = ({
	Component,
	pageProps,
}: {
	Component: NextPage;
	pageProps: AppProps["pageProps"];
}) => {
	const { isFullScreen } = useFullScreen();

	return isFullScreen ? (
		<Component {...pageProps} />
	) : (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
};

export default MyApp;
