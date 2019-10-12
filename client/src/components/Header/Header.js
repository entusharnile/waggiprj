import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import BrandLogo from './BrandImage';

const toggleNav = () => {
	document.getElementById('navId').classList.toggle('is-active');
};

const headerDisabledUrls = [
	'/owner-profile',
	'/pet-profile',
	'/add-tag',
	'/congratulations',
	'/login',
	'/signup'
];

const Header = ({ auth, location }) => {
	var currentLocation = location.pathname;
	if (headerDisabledUrls.includes(currentLocation)) return null;

	return (
		auth && (
			<div className="page-header">
				<div className="container">
					<nav className="navbar is-transparent">
						<div className="navbar-brand">
							<Link
								className="navbar-item"
								to="/"
								
							>
								<BrandLogo />
							</Link>
							<div className="navbar-burger burger" onClick={toggleNav}>
								<span />
								<span />
								<span />
							</div>
						</div>

						<div id="navId" className="navbar-menu">
							<div className="navbar-end is-hidden-touch">
								<Navbar />
							</div>
							<div className="navbar-end is-hidden-desktop" onClick={toggleNav}>
								<Navbar />
							</div>
						</div>
					</nav>
				</div>
			</div>
		)
	);
};

function mapStateToProps({ auth }) {
	return { auth };
}

export default withRouter(connect(mapStateToProps)(Header));
