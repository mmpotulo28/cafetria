import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Updates from "./Updates";
import { useSession, signOut } from "next-auth/react";
import Cookies from "js-cookie";
import { useFullScreen } from "@/context/FullScreenContext";
import Search from "./AlgoliaSearch/Search";
import { fetchAccessToken } from "@/lib/auth";

const Header: React.FC = () => {
	const { data: session } = useSession();
	const [isActive, setIsActive] = useState<number>(0);
	const isUserLoggedIn = !!session;
	const [showSearch, setShowSearch] = useState<boolean>(false);
	const [cartCount, setCartCount] = useState<number>(0);

	// track cart
	const { cart } = useFullScreen();

	useEffect(() => {
		setCartCount(cart.length);
	}, [cart.length]);

	useEffect(() => {
		const fetchUserData = async () => {
			const {token} = await fetchAccessToken({ session });
			// console.log(message)

			const response = await fetch(`/api/user/profile?email=${session?.user?.email}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();
			if (response.ok) {
				// Cache the data with a 3-minute expiration
				Cookies.set("userProfile", JSON.stringify(data), { expires: 1 / 48 });
			} else {
				console.error("Failed to fetch user data:", data);
			}
		};

		if (isUserLoggedIn && session.user?.email) {
			const cachedData = Cookies.get("userProfile");
			if (!cachedData) {
				fetchUserData();
			}
		}
	}, [isUserLoggedIn, session]);

	return (
		<header>
			<div className="top-nav slide-down">
				<div className="socials">
					<Link href={"/"} className="nav-link">
						<i className="fab fa-facebook"></i>
					</Link>
					<Link href={"/"} className="nav-link">
						<i className="fab fa-twitter"></i>
					</Link>
					<Link href={"/"} className="nav-link">
						<i className="fab fa-instagram"></i>
					</Link>
					<Link href={"/"} className="nav-link">
						<i className="fab fa-linkedin"></i>
					</Link>
					<Link
						href={"https://github.com/mmpotulo28/cafetria"}
						className="nav-link"
						target="_blank">
						<i className="fab fa-github"></i>
					</Link>
					<Link href={"/endpoints/admin"} className="nav-link">
						<i className="fa fa-lock"></i>
					</Link>
				</div>
			</div>

			{showSearch && (
				<div className="searchPopup">
					<Search />
				</div>
			)}

			<nav className="main-nav">
				<ul className="left-nav-items">
					<p className="username">{session?.user?.name}</p>
				</ul>
				<div className="logo slide-down">
					<Image
						className="rotate"
						src="/images/logo.jpeg"
						alt="logo"
						width={100}
						height={100}
					/>
				</div>

				<NavItem
					isUserLoggedIn={isUserLoggedIn}
					setIsActive={setIsActive}
					isActive={isActive}
				/>

				{/* search bar */}
				<div className="search-bar">
					<input
						type="text"
						placeholder="Search"
						onClick={() => setShowSearch(!showSearch)}
					/>
					<button>
						<i className="fa fa-search"></i>
					</button>
				</div>

				<ul className="right-nav-items slide-in-left">
					<li className="nav-item slide-down">
						<Link href="/cart" className="nav-link">
							<i className="fa fa-shopping-cart"></i>
						</Link>
						<p className="cart-count">{cartCount}</p>
					</li>
				</ul>
				<span id="nav-line"></span>
			</nav>

			<Updates />
		</header>
	);
};

interface iNavItemProps {
	isUserLoggedIn: boolean;
	setIsActive: React.Dispatch<React.SetStateAction<number>>;
	isActive: number;
}

const NavItem: React.FC<iNavItemProps> = ({ isUserLoggedIn, setIsActive, isActive }) => {
	const navItems = [
		{ href: "/", icon: "fa fa-home", text: "Home" },
		{ href: "/menu", icon: "fas fa-utensils", text: "Menu" },
		{ href: "#", icon: "fa fa-percent", text: "Sales" },
		{ href: "/endpoints/user/dashboard", icon: "fa fa-user", text: "Account" },
		{ href: "/contact", icon: "fa fa-phone", text: "Contact" },
	];

	return (
		<ul className="nav-items">
			{navItems.map((item, index) => (
				<li
					key={index}
					className={`nav-item  ${isActive === index ? "active" : ""}`}
					onClick={() => setIsActive(index)}>
					<Link href={item.href} className={`nav-link`}>
						<i className={item.icon}></i>
						<p className="nav-item-text">{item.text}</p>
					</Link>
				</li>
			))}
			<li className="nav-item">
				{isUserLoggedIn ? (
					<span onClick={() => signOut()} className="nav-link">
						<i className="fa fa-sign-out-alt"></i>
						<p className="nav-item-text">Sign-out</p>
					</span>
				) : (
					<Link href={"/auth/login"} className="nav-link">
						<i className="fa fa-user"></i>
						<p className="nav-item-text">Sign-in</p>
					</Link>
				)}
			</li>
		</ul>
	);
};

export default Header;
