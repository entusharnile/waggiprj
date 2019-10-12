// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
	state = { showFromReview: false };
	renderContent() {
		if (this.state.showFromReview) {
			return <SurveyFormReview onCancel={() => this.setState({ showFromReview: false })} />;
		}
		return <SurveyForm onSurveySubmit={() => this.setState({ showFromReview: true })} />;
	}
	render() {
		return <div>{this.renderContent()}</div>;
	}
}

export default reduxForm({
	form: 'surveyForm'
})(SurveyNew);
