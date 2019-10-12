import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { required, minLength } from '../../utils/validations';
import { checkLoading } from '../routeForms/helpers';
import errorcodes from '../../utils/errorcodes';
import PawLogo from '../Misc/PawLogo';
import RenderField from '../FormElements/RenderField';
import { handlePasswordRsetSubmit } from '../../actions/';

const submit = async (values, token, dispatch) => {
	if (values.password !== values.confirmPassword) {
		throw new SubmissionError({
			_error: {
				error: errorcodes.errorPwdMismatch
			}
		});
	}
	values.token = token;
	const { data } = await handlePasswordRsetSubmit(values, dispatch);

	if (data.error) {
		throw new SubmissionError({
			_error: {
				error: data.error
			}
		});
	}
	if (data.success) {
		//we are using error object to show succss message here
		throw new SubmissionError({
			_error: {
				success: 'Password has been reset'
			}
		});
	}
};

let PasswordReset = props => {
	const { error, handleSubmit, pristine, submitting, loading, match, dispatch } = props;
	return (
		<div className="container login-page">
			<div className="square password-set">
				<PawLogo />
				<h1>Password Reset</h1>
				<form
					onSubmit={handleSubmit(values => submit(values, match.params.token, dispatch))}
				>
					<Field
						name="password"
						type="password"
						component={RenderField}
						label="New Password"
						validate={[required, minLength]}
					/>
					<Field
						name="confirmPassword"
						type="password"
						component={RenderField}
						label="Confirm Password"
						validate={[required, minLength]}
					/>

					{error && (error.error && <p className="has-text-danger">{error.error}</p>)}
					{error &&
						(error.success && <p className="has-text-success">{error.success}</p>)}
					<button
						type="submit"
						disabled={submitting || pristine}
						className={`button is-primary ${checkLoading(loading)}`}
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

PasswordReset = reduxForm({
	form: 'passwordReset'
})(PasswordReset);

function mapStateToProps({ auth, loading }) {
	return { auth, loading };
}

export default withRouter(connect(mapStateToProps, null)(PasswordReset));
