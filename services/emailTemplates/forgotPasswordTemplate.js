const keys = require('../../config/keys');

module.exports = token => {
	return `
		<html>
			<body>
				<div style="text-align: center;">
					<h3>Reset your Waggi password</h3>
					<p>Please follow</p>
					<p>${survey.body}</p>
					<div>
						<a href="${keys.redirectDomain}/api/passport-reset/${token}/yes">Here</a>
					</div>
				</div>
			</body>
		</html>
	`;
};
