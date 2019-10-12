import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchLostpetProfile, submitFoundPet } from "../../actions";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import BrandLogo from "../Header/BrandImage";
import { checkLoading } from "../routeForms/helpers";

import { AWSBaseUrl } from "../../utils/constants";

class LostPetProfileListing extends Component {
	componentDidMount() {
		this.props.fetchLostpetProfile(this.props.qrcode);
	}

	submitFoundPet = async values => {
		values.tag = this.props.qrcode;
		if (navigator.geolocation) {
			console.log("geo on");
			navigator.geolocation.getCurrentPosition(async position => {
				values.latitude = position.coords.latitude;
				values.longitude = position.coords.longitude;
				await this.props.submitFoundPet(values);
			});
		} else {
			await this.props.submitFoundPet(values);
		}
	};

	renderLostPetProfile() {
		const profile = this.props.lostpetprofile;
		const handleSubmit = this.props.handleSubmit;
		let loadingClass = "";
		if (profile.length > 0) {
			if (typeof this.props.loading === "boolean" && this.props.loading) {
				loadingClass = "is-loading";
			}
			return (
				<div>
					<div className="heading-scan has-text-centered">
						<h1 className="has-text-white">Hi There</h1>
						<p className="has-text-white">
							If you have reached this page by scanning a QR code, it means that
							you have found a lost pet. Please find the pet owner's details
							below.
						</p>
						{profile[0].pet[0].imgUrl && (
							<div className="columns">
								<div className="column pet-image">
									<img
										src={`${AWSBaseUrl}/${profile[0].pet[0].imgUrl}`}
										alt="hello"
										height="200px"
										width="200px"
									/>
								</div>
							</div>
						)}
					</div>
					<div className="columns lost-pet-margin">
						<div className="column">
							<strong className="is-primary-color">Pet Name</strong>
							<p>{profile[0].pet[0].name}</p>
						</div>
						<div className="column">
							<strong className="is-primary-color">Owner Name</strong>
							<p>{profile[0].user.displayName}</p>
						</div>
					</div>
					<div className="columns">
						<div className="column">
							<a onClick={this.getLocation} className="button is-primary-color">
								<i className="material-icons right">sharelocation</i>
								Share Location
							</a>
						</div>
						<div className="column">
							<a
								className="button is-primary"
								href={"tel:" + profile[0].user.mobile}
							>
								<i className="material-icons right">callowner</i>
								Call Owner
							</a>
						</div>
					</div>
					<form
						onSubmit={handleSubmit(values => {
							this.submitFoundPet(values);
						})}
						className="lost-pet-desc"
					>
						<Field
							name="description"
							component="textarea"
							className="textarea"
							placeholder="Leave a message to the owner"
						/>
						<div className="column is-12 has-text-centered">
							<button className={`button is-primary ${loadingClass}`}>
								SEND
							</button>
						</div>
					</form>
				</div>
			);
		} else {
			return (
				<div>
					<h1 className="has-text-white">
						No profile exists with this QR Code.
					</h1>
				</div>
			);
		}
	}

	render() {
		return (
			<div className="lost-pet-page">
				{!this.props.auth && (
					<nav className="navbar is-transparent">
						<div className="navbar-brand">
							<Link className="navbar-item" to="/">
								<BrandLogo />
							</Link>
						</div>
					</nav>
				)}
				<div className="lost-pet">
					<div className="lost-pet-container">
						{this.renderLostPetProfile()}
					</div>
				</div>
			</div>
		);
	}
}

LostPetProfileListing = reduxForm({
	form: "lostpet"
})(LostPetProfileListing);

function mapStateToProps({ lostpetprofile, auth, loading }) {
	return { lostpetprofile, auth, loading };
}

export default connect(mapStateToProps, {
	fetchLostpetProfile,
	submitFoundPet,
	checkLoading
})(LostPetProfileListing);
