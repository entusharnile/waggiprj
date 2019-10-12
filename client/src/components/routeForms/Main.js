import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import { fetchProfile } from "../../actions";
import { connect } from "react-redux";
//import * as actions from '../../actions';

import Owner from "./Owner/Owner.js";
import Pet from "./Pet/Pet.js";
import Tag from "./Tag/Tag.js";
import Alert from "./Alerts/Alert.js";
import ManageSubscription from "./Subscriptions/ManageSubscription";
import RenewSubscription from "./Subscriptions/RenewSubscription2";
import AlertForm from "./Alerts/AlertForm";
import HeadText from "./HeadText";
import Sidebar from "./Sidebar";

export class Main extends Component {
	componentDidMount() {
		this.props.fetchProfile();
	}
	render() {
		const {
			match,
			handlePetSubmit,
			handleTagSubmit,
			auth,
			pageLoading
		} = this.props;
		const loading = pageLoading ? "is-active" : "";
		const buttonLoading = pageLoading ? "is-loading" : "";
		if (!auth) {
			return (
				<div className="must-login-display is-mobile is-overlay columns is-vcentered is-marginless">
					<div className="is-fullwidth has-text-centered has-text-white">
						<h1>You must login</h1>
						<NavLink to="/login" className="has-text-white">
							Login here{" "}
						</NavLink>
					</div>
				</div>
			);
		}
		return (
			<div className="edit-profile-root edit-details">
				<div className="root-heading-text">
					<Route path={`${match.url}/:term`} component={HeadText} />
				</div>
				<div className="edit-root tile is-ancestor">
					<Sidebar {...match} />
					<div className="custom-container">
						<Route path="/edit" exact render={() => <Owner />} />
						<Route path="/" exact component={() => <h1>Main.js</h1>} />
						<Route path={`${match.url}/owner`} render={() => <Owner />} />
						<Route
							path={`${match.url}/pet`}
							render={() => <Pet onSubmit={handlePetSubmit} />}
						/>
						<Route
							path={`${match.url}/tag`}
							render={() => <Tag onSubmit={handleTagSubmit} />}
						/>
						<Route path={`${match.url}/alert`} render={() => <Alert />} />

						<Route
							path={`${match.url}/manage-subscription`}
							component={ManageSubscription}
						/>
						<Route
							path={`${match.url}/renew-subscription`}
							component={RenewSubscription}
						/>

						<Route
							path={`${match.url}/add-new-alert`}
							/* we are not giving onSubmit as a prop because we are handling the event in
							the given component itself */
							render={() => <AlertForm />}
						/>
						<Route
							path={`${match.url}/edit-alert`}
							render={() => (
								<AlertForm initialValues={this.props.location.state.alert} />
							)}
						/>
					</div>
				</div>
				<div className={`pageloader ${loading}`}>
					<h3 className={`button ${buttonLoading}`}>Loading</h3>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ auth, pageLoading }) {
	return { auth, pageLoading };
}

export default connect(mapStateToProps, { fetchProfile })(Main);
