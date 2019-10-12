import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return [
		<Link key="0" to="/edit" className="navbar-item">
			Edit Details
		</Link>,
		//<Link key="2" to="/upload" className="navbar-item">
		//	upload
		//</Link>,
		//{
		//<span key="2" className="navbar-item">
		//{auth.displayName}
		//</span>,
		//<a key="3" className="navbar-item">
		//<Payments />
		//</a>,
		//}
		<a key="4" href="/api/logout" className="navbar-item">
			<span className="button is-outlined is-fullwidth is-white has-text-weight-semibold">
				Logout
			</span>
		</a>
	];
};

export default Navbar;
