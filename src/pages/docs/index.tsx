import Link from "next/link";
import styles from "./docs.module.css";
import Image from "next/image";
import Sponsors from "@/components/Sponsors";

const DocsPage: React.FC = () => {
	return (
		<>
			<div className={styles.container}>
				<h1 className={styles.title}>Documentation</h1>
				<ul className={styles.list}>
					<li className={styles.listItem}>
						<Image
							src="/images/manuals.png"
							alt="Manuals"
							width={100}
							height={100}
							className={styles.icon}
						/>
						<Link href="/faqs" className={styles.link}>
							FAQs
						</Link>
					</li>
					<li className={styles.listItem}>
						<Image
							src="/images/terms-and-conditions.png"
							alt="Terms of Use"
							width={100}
							height={100}
							className={styles.icon}
						/>
						<Link href="/docs/terms-of-use" className={styles.link}>
							Terms of Use
						</Link>
					</li>
					<li className={styles.listItem}>
						<Image
							src="/images/privacy-policy.png"
							alt="Privacy Policy"
							width={100}
							height={100}
							className={styles.icon}
						/>
						<Link href="/docs/privacy-policy" className={styles.link}>
							Privacy Policy
						</Link>
					</li>
					<li className={styles.listItem}>
						<Image
							src="/images/user-manuals.png"
							alt="User Manuals"
							width={100}
							height={100}
							className={styles.icon}
						/>
						<Link href="/docs/user-manuals" className={styles.link}>
							User Manuals
						</Link>
					</li>
					<li className={styles.listItem}>
						<Image
							src="/images/admin-manuals.png"
							alt="Admin Manuals"
							width={100}
							height={100}
							className={styles.icon}
						/>
						<Link href="/docs/admin-manuals" className={styles.link}>
							Admin Manuals
						</Link>
					</li>
					<li className={styles.listItem}>
						<Image
							src="/images/user-manuals.png"
							alt="Cashier Manuals"
							width={100}
							height={100}
							className={styles.icon}
						/>
						<Link href="/docs/cashier-manuals" className={styles.link}>
							Cashier Manuals
						</Link>
					</li>
				</ul>
			</div>
			<Sponsors />
		</>
	);
};

export default DocsPage;
