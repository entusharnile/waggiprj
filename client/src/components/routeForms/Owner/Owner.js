import React from "react";
import { Field, reduxForm } from "redux-form";
import RenderField from "../../FormElements/RenderField";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../../actions";
import { checkLoading } from "../helpers";
import { required, email } from "../../../utils/validations";
import ReduxFormDropzone from "../DropZone";
import PawLogo from "../../Misc/PawLogo";

import { AWSBaseUrl } from "../../../utils/constants";

let Owner = ({
	handleSubmit,
	handleOwnerSubmit,
	className,
	history,
	loading,
	ownerImageUrl,
	initialValues
}) => {
	return (
		<div className="owner-page">
			<div className={className ? className : "is-fullwidth"}>
				<PawLogo />
				{className && <h1>Owners Profile</h1>}
				<form
					onSubmit={handleSubmit(values => {
						handleOwnerSubmit(values, history);
					})}
				>
					<div className="form-details">
						<div className="columns user-image">
							<div className="column owner-image">
								{ownerImageUrl && (
									<img src={`${AWSBaseUrl}/${ownerImageUrl}`} alt="Owner" />
								)}
							</div>
						</div>
						<div className="columns">
							<Field
								name="name"
								type="text"
								component={RenderField}
								label="John Doe"
								validate={required}
							/>
							<Field
								name="email"
								type="email"
								component={RenderField}
								label="johndoe@gmail.com"
								validate={[email, required]}
							/>
						</div>
						<div className="columns">
							<Field
								name="phone"
								type="text"
								component={RenderField}
								label="123 333 1020"
							/>
							<Field
								name="address"
								type="text"
								component={RenderField}
								label="New york 444"
							/>
						</div>
						<div className="dropzone">
							<Field
								name={"ownerImage"}
								component={ReduxFormDropzone}
								multiple={false}
								className="load-file-image"
							/>
						</div>
						<div className="columns has-text-centered">
							<div className="column">
								<button
									type="submit"
									className={`button is-primary  ${checkLoading(loading)}`}
								>
									SAVE
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

Owner = reduxForm({
	form: "owner",
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true
})(Owner);

function mapStateToProps({ profile, loading }) {
	if (profile.user) {
		return {
			initialValues: {
				name: profile.user.displayName,
				phone: profile.user.mobile,
				address: profile.user.address,
				email: profile.user.email
			},
			ownerImageUrl: profile.user.imgUrl,
			loading: loading
		};
	}
	return { loading: loading };
}

Owner = connect(mapStateToProps, null)(Owner);

export default connect(null, actions)(withRouter(Owner));
