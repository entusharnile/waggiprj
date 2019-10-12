import React from 'react';
import { withRouter } from 'react-router-dom';
import PawLogo from '../Misc/PawLogo';

const nextPage = history => {
	history.push('/owner-profile');
};
const Congratulations = ({ history }) => {
	return (
		<div className="congrats-page is-mobile	is-overlay columns is-vcentered is-marginless">
			<div className="has-text-centered has-background-white">
				<PawLogo />
				<h1>Congratulations</h1>
				<p>You have successfully created owner's profile</p>
				<button
					onClick={() => {
						nextPage(history);
					}}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default withRouter(Congratulations);
