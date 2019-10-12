import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSubscriptionPlans, handleToken } from '../../../actions';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import Payments from '../../Payments';

class RenewSubscription extends Component {
	constructor(props) {
		super(props);
		this.state = { selectedOption: 'annual' };

		this.handleOptionChange.bind(this);
		this.handleSubmit.bind(this);
	}

	getInitialState() {
		return {
			packageName: 'annual'
		};
	}

	componentDidMount() {
		this.props.fetchSubscriptionPlans(this.props.qrcode);
	}

	handleOptionChange = changeEvent => {
		this.setState({
			packageName: changeEvent.target.name,
			packageValu: Number(changeEvent.target.value),
			packageDura: Number(
				changeEvent.target.attributes.getNamedItem('data-duration').value
			)
		});
	};

	handleSubmit = event => {
		event.preventDefault();
	};

	render() {
		return (
			<div className="renewsub-page">
				<div className="is-fullwidth">
					<form onSubmit={this.handleSubmit}>
						<div className="form-details">
							<div>
								{this.props.subscriptionplans.length > 0 ? (
									this.props.subscriptionplans.map(subscription => {
										return (
											<div key={subscription.slug} className="renew-block">
												<label
													className={`box ${subscription.slug}`}
													key={subscription.slug}
												>
													<input
														type="radio"
														name={subscription.slug}
														value={subscription.price}
														checked={this.state.packageName === subscription.slug}
														data-duration={subscription.duration}
														onChange={this.handleOptionChange}
													/>
													{subscription.name}
												</label>
											</div>
										);
									})
								) : (
									<h2>No subscriptions exist!</h2>
								)}
							</div>

							<Payments
								package={this.state.packageName}
								amount={this.state.packageValu}
								duration={this.state.packageDura}
							/>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ subscriptionplans }) {
	return { subscriptionplans };
}

RenewSubscription = reduxForm({
	form: 'renewsub'
})(RenewSubscription);

export default withRouter(
	connect(mapStateToProps, { fetchSubscriptionPlans, handleToken })(RenewSubscription)
);
