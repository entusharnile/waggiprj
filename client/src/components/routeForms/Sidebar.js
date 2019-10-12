import React from 'react';
import { NavLink } from 'react-router-dom';

const toggleMenu = () => {
	document.getElementById('menu-list').classList.toggle('is-expanded');
};

const MenuList = ({ match, id, className }) => {
	return (
		<ul className={`menu-list ${className}`} id={id}>
			<li>
				<NavLink activeClassName="is-active" to={`${match.url}/owner`}>
					Owner
				</NavLink>
			</li>
			<li>
				<NavLink activeClassName="is-active" to={`${match.url}/pet`}>
					Pet
				</NavLink>
			</li>
			<li>
				<NavLink activeClassName="is-active" to={`${match.url}/tag`}>
					Tag
				</NavLink>
			</li>
			<li>
				<NavLink activeClassName="is-active" to={`${match.url}/alert`}>
					Alert
				</NavLink>
			</li>
			<li>
				<NavLink activeClassName="is-active" to={`${match.url}/manage-subscription`}>
					Manage Subscription
				</NavLink>
			</li>
			<li>
				<a href="/api/logout">Logout</a>
			</li>
		</ul>
	);
};

const Sidebar = match => {
	return (
		<aside className="menu sidebar">
			<button className="button is-hidden-tablet" onClick={toggleMenu}>
				Menu
			</button>
			<MenuList className="menu-list is-hidden-touch" match={match} />
			<div onClick={toggleMenu}>
				<MenuList className="menu-list is-hidden-desktop" match={match} id="menu-list" />
			</div>
		</aside>
	);
};

export default Sidebar;
