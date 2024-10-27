import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
	return (
		<footer className="main-footer">
			<div className="footer-left footer-block">
				<div className="footer-logo">
					<Image src="/images/logo.jpeg" alt="Cafeteria Logo" width={200} height={150} />
				</div>
				<div className="footer-info">
					<ul className="footer-items">
						<li className="footer-item">&copy; Cafeteria 2024</li>
						<li className="footer-item">Developed by M Mpotulo</li>
					</ul>
				</div>
			</div>
			<div className="footer-links footer-block">
				<h4>Quick Links</h4>
				<ul className="footer-items">
					<li>
						<Link href="/menu" className="footer-link">
							<i className="fas fa-utensils"></i> Menu
						</Link>
					</li>
					<li>
						<Link href="/docs" className="footer-link">
							<i className="fas fa-book"></i> Docs
						</Link>
					</li>
					<li>
						<Link href="/help" className="footer-link">
							<i className="fas fa-life-ring"></i> Help
						</Link>
					</li>
					<li>
						<Link href="/specials" className="footer-link">
							<i className="fas fa-tags"></i> Specials
						</Link>
					</li>
					<li>
						<Link href="/faq" className="footer-link">
							<i className="fas fa-question-circle"></i> Frequently Asked Questions
						</Link>
					</li>
				</ul>
			</div>
			<div className="footer-contact footer-block">
				<h4>Contact Us</h4>
				<ul className="footer-items">
					<li>
						<i className="fas fa-envelope"></i> Email: contact@cafetria.com
					</li>
					<li>
						<i className="fas fa-phone"></i> Phone: (123) 456-7890
					</li>
					<li>
						<i className="fas fa-map-marker-alt"></i> Address: 123 Main Street, City,
						Country
					</li>
				</ul>
			</div>
			<div className="footer-social-media footer-block">
				<h4>Follow Us</h4>
				<ul className="footer-items">
					<li>
						<Link href="https://www.facebook.com/yourusername">
							<i className="fab fa-facebook"></i> @cafeteria
						</Link>
					</li>
					<li>
						<Link href="https://www.twitter.com/yourusername">
							<i className="fab fa-twitter"></i> cafeteria_sa
						</Link>
					</li>
					<li>
						<Link href="https://www.instagram.com/yourusername">
							<i className="fab fa-instagram"></i>cafeteria_sa
						</Link>
					</li>
					<li>
						<Link href="https://www.linkedin.com/yourusername">
							<i className="fab fa-linkedin"></i> in/cafeteria
						</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
