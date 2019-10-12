import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { signupNativeUser } from '../../actions';
import { required, email } from '../../utils/validations';
import { checkLoading } from '../routeForms/helpers';

const errorcodes = require('../../utils/errorcodes');

const submit = async (data, history, props) => {
	var isValid = true;

	if (data.password !== data.confirmpassword) {
		isValid = false;
		throw new SubmissionError({
			confirmpassword: errorcodes.errorPwdMismatch
		});
	}

	const response = await props.signupNativeUser(data.email, data.password, history);

	if (response.results) {
		isValid = false;
		throw new SubmissionError({
			email: errorcodes.error11000
		});
	}

	if (isValid === true) {
		history.push('/congratulations');
	}
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
	<div>
		<input {...input} placeholder={label} type={type} />
		{touched && error && <span className="has-text-danger">{error}</span>}
	</div>
);

let SignupNativeNew = props => {
	const { error, handleSubmit, pristine, submitting, history, loading } = props;

	return (
		<div className="container signup-page">
			<div className="square">
				<div className="foot-prints">
					<img
						src="http://dev-veeru-t.pantheonsite.io/sites/default/files/feet.png"
						alt="Foot prints"
						height="20px"
					/>
				</div>
				<h1>SIGN UP</h1>
				<form
					action="/auth/signup"
					method="POST" /*onSubmit={handleSubmit(values => submit(values, history, props))}*/
				>
					<Field
						name="email"
						type="email"
						component={renderField}
						label="Email"
						validate={[required, email]}
					/>
					<Field
						name="password"
						type="password"
						component={renderField}
						label="Password"
						validate={required}
					/>

					<Field
						name="confirmpassword"
						type="password"
						component={renderField}
						label="Confirm Password"
						validate={required}
					/>
					{error && <strong>{error}</strong>}
					<button
						type="submit"
						disabled={pristine || submitting}
						className={`button is-primary ${checkLoading(loading)}`}
					>
						SIGN UP
					</button>
					<div className="bottom-or">
						<div className="small-dash">-</div>
						<span>or</span>
						<div className="small-dash">-</div>
					</div>
					<span>
						<a href="/auth/facebook">
							<img
								alt="fb"
								src="http://dev-veeru-t.pantheonsite.io/sites/default/files/facebook_button.png"
							/>
						</a>
					</span>
					<a href="/auth/google">
						<img
							alt="google"
							src="http://dev-veeru-t.pantheonsite.io/sites/default/files/google_button.png"
						/>
					</a>
					<hr />
					<span className="is-link">If you already have an account</span>
					<br />
					<Link to="/login" className="has-text-weight-semibold">
						LOGIN
					</Link>
				</form>
			</div>
		</div>
	);
};

SignupNativeNew = reduxForm({
	form: 'signup'
})(SignupNativeNew);

function mapStateToProps({ auth, loading }) {
	return { auth, loading };
}

export default withRouter(
	connect(mapStateToProps, { signupNativeUser })(SignupNativeNew)
);
