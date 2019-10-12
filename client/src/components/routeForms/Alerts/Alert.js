import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../actions';

import AlertModal from './AlertModal';
import AlertsList from './AlertsList';

class Alerts extends Component {
	state = {
		isModalActive: false,
		alert: {}
	};
	openModal = alertId => {
		//the below line will give the required alert object from alerts array based on _id property
		const alert = this.props.alerts.find(alert => alert._id === alertId);
		this.setState({
			isModalActive: true,
			alert
		});
	};
	closeModal = () => {
		this.setState({
			isModalActive: false
		});
	};
	handleDeleteAlert = alertId => {
		this.props.deleteAlert(alertId).then(() => {
			this.setState({ isModalActive: false });
		});
	};

	handleCancel = () => {
		this.setState({ isModalActive: false });
	};
	handleDelete = () => {
		this.setState({ isModalActive: false });
	};
	render() {
		const { alerts } = this.props;
		return (
			<div className="form-details">
				{alerts && (
					<AlertsList
						alerts={alerts}
						deleteAlert={this.deleteAlert}
						openModal={this.openModal}
					/>
				)}
				<div className="has-text-centered">
					<Link to="/edit/add-new-alert" className="button is-primary">
						Add New Alert
					</Link>
				</div>
				<AlertModal
					alert={this.state.alert}
					isModalActive={this.state.isModalActive}
					closeModal={this.closeModal}
					handleDeleteAlert={this.handleDeleteAlert}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { alerts: state.profile.alerts };
}

export default connect(mapStateToProps, actions)(Alerts);
