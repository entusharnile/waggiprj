import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { validateUserLogin } from '../actions';
import { required, email } from '../utils/validations';
import { checkLoading } from './routeForms/helpers';

const errorcodes = require('../utils/errorcodes');

const submit = async (data, history, props) => {
	const response = await props.validateUserLogin(data.email, data.password, history);
	if (!response) {
		throw new SubmissionError({
			password: errorcodes.errorLoginMismatch
		});
	}
	if (response.stepComplete) {
		history.push('/edit');
	} else {
		history.push('/owner-profile');
	}
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
	<div>
		<input {...input} placeholder={label} type={type} />
		{touched && error && <span className="has-text-danger">{error}</span>}
	</div>
);

let LoginNew = props => {
	const { error, handleSubmit, pristine, submitting, history, loading } = props;
	return (
		<div className="container login-page">
			<div className="square">
				<div className="foot-prints">
					<img
						src="http://dev-veeru-t.pantheonsite.io/sites/default/files/feet.png"
						alt="Foot prints"
						height="20px"
					/>
				</div>
				<h1>LOGIN</h1>
				<form action="/auth/login" method="POST" /*onSubmit={handleSubmit(values => submit(values, history, props))}*/>
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
					{error && <strong>{error}</strong>}
					<div className="forgetpassword-login">
						<Link to="/forgetpassword">Forget your password?</Link>
					</div>
					<button
						type="submit"
						disabled={submitting || pristine}
						className={`button is-primary ${checkLoading(loading)}`}
					>
						LOGIN
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
					{/*<a href="/auth/facebook" className="button is-link is-fullwidth">
						<span className="icon">
							<i className="fab fa-twitter" />
						</span>
						<span>Use Facebook account</span>
					</a>*/}
					<a href="/auth/google">
						{/*<span className="icon">
							<i className="fab fa-twitter" />
						</span>
						<span>Use Google Account</span>*/}
						<img
							alt="google"
							src="http://dev-veeru-t.pantheonsite.io/sites/default/files/google_button.png"
						/>
					</a>
					<hr />
					<span className="is-link">Dont have an account?</span>
					<br />
					<Link to="/signup" className="has-text-weight-semibold">
						SIGN UP
					</Link>
				</form>
			</div>
		</div>
	);
};

LoginNew = reduxForm({
	form: 'login'
})(LoginNew);

function mapStateToProps({ auth, loading }) {
	return { auth, loading };
}

export default withRouter(connect(mapStateToProps, { validateUserLogin })(LoginNew));
