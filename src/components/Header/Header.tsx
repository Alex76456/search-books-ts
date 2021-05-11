import React from 'react';
import './Header.css';

const Header: React.FC = () => {
	return (
		<header className="header">
			<img
				className="header__logo"
				src={
					'https://cdn4.iconfinder.com/data/icons/science-and-technology-3-10/65/135-128.png'
				}
				alt="logo"
			/>
			<h1 className="header__title">
				Найти в<span className="header__title-accent">s</span>ё!
			</h1>
		</header>
	);
};

export default Header;
