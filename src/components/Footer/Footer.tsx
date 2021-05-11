import React from 'react';
import './Footer.css';

const Footer: React.FC= () =>{
	return (
		<footer className="footer">
			<p className="footer__copyright">© {new Date().getFullYear()} Aleksey Logvenkin</p>
		</footer>
	);
}

export default Footer;
