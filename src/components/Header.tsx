import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Updates from "./Updates";
import { iCartItem } from "@/lib/Type";
import { useSession, signOut } from "next-auth/react";
import Cookies from "js-cookie";

export let updateCart = () => {};

const Header: React.FC = () => {
	const { data: session } = useSession();
	const isUserLoggedIn = !!session;

	// track cart
	const [cart, setCart] = React.useState<iCartItem[]>([]);

	useEffect(() => {
		updateCart = () => {
			const updatedCart = JSON.parse(window.localStorage.getItem("cart") || "[]");
			setCart(updatedCart);
		};

		const initialCart = JSON.parse(window.localStorage.getItem("cart") || "[]");
		setCart(initialCart);

		window.addEventListener("storage", updateCart);

		return () => {
			window.removeEventListener("storage", updateCart);
		};
	}, []);

	useEffect(() => {
		const fetchUserData = async () => {
			const response = await fetch(`/api/user/profile?email=${session?.user?.email}`);
			const data = await response.json();
			if (response.ok) {
				// Cache the data with a 3-minute expiration
				Cookies.set("userProfile", JSON.stringify(data), { expires: 1 / 48 });
			} else {
				console.log("Failed to fetch user data:", data);
			}
		};

		if (isUserLoggedIn && session.user?.email) {
			const cachedData = Cookies.get("userProfile");
			if (!cachedData) {
				fetchUserData();
			}
		}
	}, [isUserLoggedIn, session?.user?.email]);

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
					<Link href={"/endpoints/admin"} className="nav-link">
						<i className="fa fa-lock"></i>
					</Link>
				</div>
			</div>

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

				<ul className="nav-items">
					{/* home */}
					<li className="nav-item">
						<Link href="/" className="nav-link">
							<i className="fa fa-home"></i>
							<p className="nav-item-text">Home</p>
						</Link>
					</li>
					<li className="nav-item">
						<Link href="/menu" className="nav-link">
							<i className="fas fa-utensils"></i>
							<p className="nav-item-text">Menu</p>
						</Link>
					</li>
					<li className="nav-item">
						<Link href="#" className="nav-link">
							<i className="fa fa-percent"></i>
							<p className="nav-item-text">Sales</p>
						</Link>
					</li>
					<li className="nav-item">
						<Link href={"/endpoints/user/dashboard"} className="nav-link">
							<i className="fa fa-user"></i>
							<p className="nav-item-text">Account</p>
						</Link>
					</li>
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
					<li className="nav-item">
						<Link href="/contact" className="nav-link">
							<i className="fa fa-phone"></i>
							<p className="nav-item-text">Contact</p>
						</Link>
					</li>
				</ul>

				{/* search bar */}
				<div className="search-bar">
					<input type="text" placeholder="Search" />
					<button>
						<i className="fa fa-search"></i>
					</button>
				</div>

				<ul className="right-nav-items slide-in-left">
					<li className="nav-item slide-down">
						<Link href="/cart" className="nav-link">
							<i className="fa fa-shopping-cart"></i>
						</Link>
						<p className="cart-count">{cart.length}</p>
					</li>
				</ul>
				<span id="nav-line"></span>
			</nav>

			<Updates />
		</header>
	);
};

export default Header;
