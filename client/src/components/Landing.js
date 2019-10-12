import React from 'react';
//import SignupNative from './Auth/SignupNative';
import { connect } from 'react-redux';
import Login from './Auth/Login';

const Landing = ({ auth }) => {
	if (!auth) {
		return <Login />;
	}
	return (
		<section className="hero is-medium">
			{/*<SignupNative />*/}
			<div className="hero-body">
				<div className="container has-text-centered">
					<h1 className="title">Waggi</h1>
					<h2 className="subtitle">Companion for finding your pet!</h2>
				</div>
			</div>
		</section>
	);
};

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Landing);
