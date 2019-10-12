import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { signupLocalPassport } from '../../actions';
import { required, email, minLength } from '../../utils/validations';
import { checkLoading } from '../routeForms/helpers';
import SocialLoginButtons from './SocialLoginButtons';
import PawLogo from '../Misc/PawLogo';
import errorcodes from '../../utils/errorcodes';
import RenderField from '../FormElements/RenderField';

const submit = async (values, history, props) => {
	var isValid = true;
	if (values.password !== values.confirmpassword) {
		isValid = false;
		throw new SubmissionError({
			_error: errorcodes.errorPwdMismatch
		});
	}
	const response = await props.signupLocalPassport(values, history);
	if (response.error) {
		throw new SubmissionError({
			_error: 'Account already exists'
		});
	}
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

let SignupNative = props => {
	const { error, handleSubmit, pristine, submitting, history, loading } = props;
	console.log(error);
	return (
		<div className="container signup-page">
			<div className="square">
				<PawLogo />
				<h1>SIGN UP</h1>
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
						validate={[required, minLength]}
					/>

					<Field
						name="confirmpassword"
						type="password"
						component={RenderField}
						label="Confirm Password"
						validate={[required, minLength]}
					/>
					{error && <div className="has-text-danger">{error}</div>}
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
					<SocialLoginButtons />
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

SignupNative = reduxForm({
	form: 'signup'
})(SignupNative);

function mapStateToProps({ auth, loading }) {
	return { auth, loading };
}

export default withRouter(
	connect(mapStateToProps, { signupLocalPassport })(SignupNative)
);
