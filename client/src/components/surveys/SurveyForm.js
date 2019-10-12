//SurveyForm shows a form for a user to input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
	renderformFields() {
		return _.map(formFields, ({ label, name }) => {
			return (
				<Field
					key={name}
					component={SurveyField}
					type="text"
					label={label}
					name={name}
				/>
			);
		});
	}
	render() {
		const { handleSubmit, onSurveySubmit } = this.props;
		return (
			<div>
				<form onSubmit={handleSubmit(onSurveySubmit)}>
					{this.renderformFields()}
					<Link to="/surveys" className="red btn-flat white-text left">
						Cancel
					</Link>
					<button type="submit" className="teal btn-flat right white-text">
						Next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}
function validate(values) {
	const errors = {};
	errors.recipients = validateEmails(values.recipients || '');

	_.each(formFields, ({ name }) => {
		if (!values[name]) {
			errors[name] = 'You must provide value';
		}
	});
	return errors;
}
export default reduxForm({
	validate,
	form: 'surveyForm',
	destroyOnUnmount: false
})(SurveyForm);
