import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { renderField } from '../helpers';

let ManageSubscription = ({ handleSubmit }) => {
	return (
		<div>
			<h1>Manage Subscriptions</h1>
			<Field
				name="subscription-startdate"
				component={RenderDatePicker}
				label="Start Date"
			/>
			<Field name="subscription-enddate" component={RenderDatePicker} label="End Date" />

			<div>
				<Link
					to="/manage-subscriptions/renew"
					className="button is-primary is-pulled-right"
				>
					RENEW SUBSCRIPTION
				</Link>
			</div>
		</div>
	);
};

ManageSubscription = reduxForm({
	form: 'ManageSubscriptions',
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true
})(ManageSubscription);

ManageSubscription = connect(({ profile }) => {
	if (profile.user) {
		return {
			initialValues: {
				name: profile.user.displayName,
				phone: profile.user.mobile,
				address: profile.user.address
			}
		};
	}
	return {};
})(ManageSubscription);

export default ManageSubscription;
