import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface WelcomeDashboardProps {
	styles: { [key: string]: string };
}

const WelcomeDashboard: React.FC<WelcomeDashboardProps> = ({ styles }) => {
	const { data: session } = useSession();
	const userName = session?.user?.name || "Guest";
	const avatar = session?.user?.image || "/images/placeholder-image.webp";

	return (
		<div className={styles.welcomeMessage}>
			<div>
				<h1>Welcome, {userName}!</h1>
				<p>Here&apos;s a quick overview of your account and recent activities.</p>
			</div>
			<Image src={avatar} alt={userName} width={60} height={60} />
		</div>
	);
};

export default WelcomeDashboard;
