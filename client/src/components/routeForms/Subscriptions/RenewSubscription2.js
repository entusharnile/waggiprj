import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Payments from "../../Payments";
import { fetchSubscriptionPlans } from "../../../actions";

class RenewSubscription extends Component {
	componentDidMount() {
		this.props.fetchSubscriptionPlans();
	}
	render() {
		const { subscriptionplans, handleSubmit, planPrice, planName } = this.props;
		return (
			<div>
				<form
					onSubmit={handleSubmit(values => {
						console.log(values);
					})}
				>
					<div className="columns">
						{subscriptionplans &&
							subscriptionplans.map(subscription => (
								<div key={subscription.slug} className="column">
									<label className="button is-fullwidth">
										<Field
											name="amount"
											type="radio"
											/*here we are taking price and name of the plan in value itself with
											**hyphen(-) being the delimitter. Reason: we need to pass both of the 
											**parameters to Payments component*/
											value={`${subscription.price}-${subscription.name}`}
											component="input"
											label={subscription.slug}
										/>
										&nbsp;&nbsp;{`${subscription.name} (${subscription.price})`}
									</label>
								</div>
							))}
					</div>

					<Payments packageName={planName} amount={planPrice} duration={6} />
				</form>
			</div>
		);
	}
}

RenewSubscription = reduxForm({
	form: "renewsub"
})(RenewSubscription);

function mapStateToProps({ form, subscriptionplans }) {
	if (form.renewsub && form.renewsub.values) {
		const packageName = form.renewsub.values.amount.split("-");
		const planPrice = parseInt(packageName[0], 10);
		const planName = packageName[1];

		return {
			planPrice,
			planName,
			subscriptionplans
		};
	}
	return { subscriptionplans };
}

export default connect(mapStateToProps, { fetchSubscriptionPlans })(
	RenewSubscription
);
