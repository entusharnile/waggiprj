import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { handleToken } from '../actions';
import { withRouter } from 'react-router-dom';

const Payments = ({ packageName, duration, amount, token, handleToken, history }) => {
	return (
		<StripeCheckout
			name={packageName}
			description={packageName}
			duration={duration}
			amount={amount}
			token={token => {
				const values = {
					token,
					packageName,
					duration,
					amount
				};
				handleToken(values, history);
			}}
			stripeKey={process.env.REACT_APP_STRIPE_KEY}
		>
			<div className="columns">
				<div className="column has-text-centered">
					<button
						disabled={!packageName && duration && amount}
						className="button is-primary"
					>
						Renew Now!
					</button>
				</div>
			</div>
		</StripeCheckout>
	);
};

// class Payments extends Component {
// 	render() {
// 		return (
// 			<div className="has-text-centered">
// 				<StripeCheckout
// 					name={this.props.packageName}
// 					description={this.props.packageName}
// 					duration={this.props.duration}
// 					amount={this.props.amount}
// 					token={token =>
// 						this.props.handleToken(
// 							token,
// 							this.props.packageName,
// 							this.props.duration,
// 							this.props.amount
// 						)
// 					}
// 					stripeKey={process.env.REACT_APP_STRIPE_KEY}
// 				>
// 					<div className="columns">
// 						<div className="column">
// 							<button className="button is-primary">Renew Now!</button>
// 						</div>
// 					</div>
// 				</StripeCheckout>
// 			</div>
// 		);
// 	}
// }

export default withRouter(connect(null, { handleToken })(Payments));
