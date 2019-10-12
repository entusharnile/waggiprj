import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ReadableDate = dateString => new Date(dateString).toDateString();

let ManageSubscription = ({
	handleSubmit,
	subscriptionStart,
	subscriptionEnd
}) => {
	return (
		<div>
			{!subscriptionStart && (
				<div className="box">
					<h2>You dont have any current subscriptions!</h2>
				</div>
			)}
			{subscriptionStart && (
				<div className="box">
					<h2>Active subscriptions</h2>
					<div className="columns">
						<div className="column">
							<strong>From: </strong>
							{ReadableDate(subscriptionStart)}{" "}
						</div>
						<div className="column">
							<strong>To: </strong>
							{ReadableDate(subscriptionEnd)}
						</div>
					</div>
				</div>
			)}
			<div className="has-text-centered">
				<Link to="/edit/renew-subscription" className="button is-primary">
					RENEW SUBSCRIPTION
				</Link>
			</div>
		</div>
	);
};

const mapStateToProps = ({ profile }) => {
	if (profile.user) {
		return {
			subscriptionStart: profile.pet[0].subscriptionStart,
			subscriptionEnd: profile.pet[0].subscriptionEnd
		};
	}
	return {};
};

ManageSubscription = connect(mapStateToProps, null)(ManageSubscription);
export default ManageSubscription;
