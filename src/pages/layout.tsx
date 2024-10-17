// src/layouts/layout.tsx
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Header />
			<main>{children}</main>
			<Footer />
			<Analytics />
			<SpeedInsights />
		</>
	);
};

export default Layout;
