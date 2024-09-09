// src/layouts/layout.tsx
import React, { ReactElement } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	);
};

export default Layout;
