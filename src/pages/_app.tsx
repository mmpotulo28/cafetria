import "@/styles/globals.css";
import "@/styles/pages.css";
import "@/styles/fontawesome-6.5.2/css/all.min.css";

import React from "react";
import type { Metadata } from "next";
import Layout from "./layout";
import { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

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
		</SessionProvider>
	);
};

export default MyApp;
