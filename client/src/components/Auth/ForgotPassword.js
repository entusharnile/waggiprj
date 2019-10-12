import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { required, email } from '../../utils/validations';
import { checkLoading } from '../routeForms/helpers';
import PawLogo from '../Misc/PawLogo';
import RenderField from '../FormElements/RenderField';
import { handleForgotPasswordSubmit } from '../../actions/';

const submit = async (values, dispatch) => {
	const { data } = await handleForgotPasswordSubmit(values, dispatch);
	if (data.error) {
		throw new SubmissionError({
			email: data.error
		});
	}
	if (data.success) {
		//we are using error object to show succss message here
		throw new SubmissionError({
			_error: 'Email has been sent with reset link!'
		});
	}
};

let ForgotPassword = props => {
	const { error, handleSubmit, pristine, submitting, loading, dispatch } = props;
	return (
		<div className="container login-page">
			<div className="square password-set">
				<PawLogo />
				<h1>Forgot Password</h1>
				<form onSubmit={handleSubmit(values => submit(values, dispatch))}>
					<Field
						name="email"
						type="email"
						component={RenderField}
						label="Email"
						validate={[required, email]}
					/>
					{error && <p className="has-text-success">{error}</p>}
					<button
						type="submit"
						disabled={submitting || pristine}
						className={`button is-primary ${checkLoading(loading)}`}
					>
						Submit
					</button>
					<div className="column">
						Have credentials? Login <Link to="/login">here</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

ForgotPassword = reduxForm({
	form: 'forgotPassword'
})(ForgotPassword);

function mapStateToProps({ auth, loading }) {
	return { auth, loading };
}

export default withRouter(connect(mapStateToProps, null)(ForgotPassword));
