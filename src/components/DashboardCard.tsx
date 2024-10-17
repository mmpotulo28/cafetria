interface DashboardCardProps {
	styles: { readonly [key: string]: string };
	heading: string;
	children: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ styles, heading, children }) => {
	return (
		<div className={styles.card}>
			<h3>{heading}</h3>
			<ul className={styles.slideInLeft}> {children}</ul>
		</div>
	);
};

export default DashboardCard;
