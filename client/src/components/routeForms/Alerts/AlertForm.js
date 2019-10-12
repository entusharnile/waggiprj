/* we are using this Component for both 'add-new-alert' and
** 'edit-alert' routes as part of code reuse
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as actions from '../../../actions';
import RenderField from '../../FormElements/RenderField';
import RenderDatePicker from '../../FormElements/RenderDatePicker';
import { required } from '../../../utils/validations';
import { checkLoading } from '../../routeForms/helpers';

let AlertForm = props => {
	const {
		handleSubmit,
		history,
		submitNewAlert,
		updateAlert,
		loading,
		initialValues // this will be exist if we are coming from 'edit-alert'
	} = props;

	//if we are coming from 'edit-alert' take 'updateAlert' alert action
	//otherwise if we are coming from 'add-new-alert' take 'submitNewAlert' action
	const submitAction = initialValues ? updateAlert : submitNewAlert;

	return (
		<div>
			<form
				/*we cannot directly give history as a parameter to handleSubmit function
				we cannot access the form values without handleSubmit either
				so this is little trick to achieve our desired functionality*/
				onSubmit={handleSubmit(values => {
					submitAction(values, history);
				})}
			>
				<div className="form-details">
					<div className="columns">
						<Field
							name="name"
							type="text"
							component={RenderField}
							label="Name"
							validate={required}
						/>
						<Field
							name="frequency"
							type="number"
							component={RenderField}
							label="Frequency"
							validate={required}
						/>
					</div>
					<div className="columns">
						<Field
							className="column"
							name="startDate"
							component={RenderDatePicker}
							label="Start Date"
							validate={required}
						/>
						<Field
							className="column"
							name="endDate"
							component={RenderDatePicker}
							label="End Date"
							validate={required}
						/>
					</div>
					<div className="columns">
						<div className="alert-desc">
							<Field
								name="desc"
								type="text"
								component={RenderField}
								label="Description"
								validate={required}
							/>
						</div>
					</div>
					<div className="columns has-text-centered">
						<div className="column">
							<button
								type="submit"
								className={`button is-primary ${checkLoading(loading)}`}
							>
								Save
							</button>
						</div>
						<div className="column">
							<Link className="button" to="/edit/alert">
								Cancel
							</Link>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

AlertForm = reduxForm({
	form: 'alertForm',
	destroyOnUnmount: true,
	forceUnregisterOnUnmount: true
})(AlertForm);

function mapStateToProps({ loading }) {
	return { loading };
}

export default connect(mapStateToProps, actions)(withRouter(AlertForm));
