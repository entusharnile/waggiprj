import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { validateUserLoginPassport } from '../../actions';
import { required, email } from '../../utils/validations';
import { checkLoading } from '../routeForms/helpers';

import SocialLoginButtons from './SocialLoginButtons';
import PawLogo from '../Misc/PawLogo';
import RenderField from '../FormElements/RenderField';

const submit = async (values, history, props) => {
	const response = await props.validateUserLoginPassport(values);
	if (response.error) {
		if (response.error === 'wrong credentials') {
			throw new SubmissionError({
				_error: 'Wrong credentials'
			});
		}
	}
	if (response.stepComplete) {
		history.push('/edit');
	} else {
		history.push('/owner-profile');
	}
};

let Login = props => {
	const { error, handleSubmit, pristine, submitting, history, loading } = props;
	return (
		<div className="container login-page">
			<div className="square">
				<PawLogo />
				<h1>LOGIN</h1>
				<form onSubmit={handleSubmit(values => submit(values, history, props))}>
					<Field
						name="username"
						type="email"
						component={RenderField}
						label="Email"
						validate={[required, email]}
					/>
					<Field
						name="password"
						type="password"
						component={RenderField}
						label="Password"
						validate={required}
					/>
					{error && <div className="has-text-danger">{error}</div>}
					<button
						type="submit"
						disabled={submitting || pristine}
						className={`button is-primary is-shadowless ${checkLoading(loading)}`}
					>
						LOGIN
					</button>
					<div className="column is-12 forget-password-link">
						<Link className="has-weight-500" to="/forgot-password">
							Forgot your password?
						</Link>
					</div>
					<div className="bottom-or">
						<div className="small-dash">-</div>
						<span>or</span>
						<div className="small-dash">-</div>
					</div>
					<SocialLoginButtons />
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

Login = reduxForm({
	form: 'login'
})(Login);

function mapStateToProps({ auth, loading }) {
	return { auth, loading };
}

export default withRouter(connect(mapStateToProps, { validateUserLoginPassport })(Login));
