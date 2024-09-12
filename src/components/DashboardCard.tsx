const DashboardCard: React.FC<any> = ({ styles, heading, children }) => {
	return (
		<div className={styles.card}>
			<h3>{heading}</h3>
			<ul className={styles.slideInLeft}> {children}</ul>
		</div>
	);
};

export default DashboardCard;
