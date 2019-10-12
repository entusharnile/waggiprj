import React from 'react';
import googleLogo from '../../images/google-plus.png';
import facebookLogo from '../../images/fb-icon.png';

const SocialLoginButtons = () => {
	return [
		<a key="0" href="/auth/facebook" className="button facebook is-fullwidth">
			<span className="icon is-small">
				<img src={facebookLogo} alt="Facebook Logo" />
			</span>
			Login with Facebook
		</a>,

		<a key="1" href="/auth/google" className="button google is-fullwidth">
			<span className="icon is-small">
				<img src={googleLogo} alt="Google Logo" />
			</span>
			Login with Google
		</a>
	];
};

export default SocialLoginButtons;
