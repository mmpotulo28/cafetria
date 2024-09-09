import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Updates from './Updates';

const Header: React.FC = () => {
	return (
		<header>
			<div className='top-nav slide-down'>
				<div className='socials'>
					<Link href={'/'} className='nav-link'>
						<i className='fab fa-facebook'></i>
					</Link>
					<Link href={'/'} className='nav-link'>
						<i className='fab fa-twitter'></i>
					</Link>
					<Link href={'/'} className='nav-link'>
						<i className='fab fa-instagram'></i>
					</Link>
					<Link href={'/'} className='nav-link'>
						<i className='fab fa-linkedin'></i>
					</Link>
				</div>
			</div>

			<nav className='main-nav'>
				<ul className='left-nav-items'>
					<p className='username'>User Name</p>
				</ul>
				<div className='logo slide-down'>
					<Image
						className='rotate'
						src='/images/logo.jpeg'
						alt='logo'
						width={100}
						height={100}
					/>
				</div>

				<ul className='nav-items'>
					<li className='nav-item'>
						<Link href='/' className='nav-link'>
							<i className='fas fa-utensils'></i>
							<p className='nav-item-text'>Menu</p>
						</Link>
					</li>
					<li className='nav-item'>
						<Link href='#' className='nav-link'>
							<i className='fa fa-percent'></i>
							<p className='nav-item-text'>Sales</p>
						</Link>
					</li>
					<li className='nav-item'>
						<Link href='/endpoints/user/dashboard' className='nav-link'>
							<i className='fa fa-user'></i>
							<p className='nav-item-text'>Account</p>
						</Link>
					</li>
					<li className='nav-item'>
						<Link href='#' className='nav-link'>
							<i className='fa fa-info-circle'></i>
							<p className='nav-item-text'>About</p>
						</Link>
					</li>
					<li className='nav-item'>
						<Link href='#' className='nav-link'>
							<i className='fa fa-phone'></i>
							<p className='nav-item-text'>Contact</p>
						</Link>
					</li>
				</ul>

				{/* search bar */}
				<div className='search-bar'>
					<input type='text' placeholder='Search' />
					<button>
						<i className='fa fa-search'></i>
					</button>
				</div>

				<ul className='right-nav-items slide-in-left'>
					<li className='nav-item slide-down'>
						<Link href='/cart' className='nav-link'>
							<i className='fa fa-shopping-cart'></i>
						</Link>
						<p className='cart-count'>0</p>
					</li>
				</ul>
				<span id='nav-line'></span>
			</nav>

			<Updates />
		</header>
	);
};

export default Header;
