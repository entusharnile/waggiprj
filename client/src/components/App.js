import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header/Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import LostPetProfile from './LostPetProfile';
import SurveyNew from './surveys/SurveyNew';
import SignupNative from './Auth/SignupNative';
import Login from './Auth/Login';
import RouteForm from './routeForms/Main.js';

import Owner from './routeForms/Owner/Owner.js';
import Pet from './routeForms/Pet/Pet.js';
import Tag from './routeForms/Tag/Tag.js';
import Congratulations from './Auth/Congratulations';
import ForgotPassword from './Auth/ForgotPassword';
import PasswordReset from './Auth/PasswordReset';
//import FileUpload from './routeForms/FileUpload';

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}
	render() {
		return (
			<BrowserRouter>
				<div className="main-content">
					<Header />
					<Route exact path="/" component={Landing} />
					<Route exact path="/surveys" component={Dashboard} />
					<Route path="/surveys/new" component={SurveyNew} />
					<Route path="/login" component={Login} />
					<Route path="/edit" component={RouteForm} />
					<Route path="/pet/:qrcode" component={LostPetProfile} />
					<Route path="/signup" component={SignupNative} />

					<Route
						path="/owner-profile"
						render={() => <Owner className="square fill-profile fill-owner-profile " />}
					/>
					<Route
						path="/pet-profile"
						render={() => <Pet className="square fill-profile fill-pet-profile" />}
					/>
					<Route
						path="/add-tag"
						render={() => <Tag className="square fill-profile fill-tag" />}
					/>
					<Route path="/congratulations" render={() => <Congratulations />} />

					<Route path="/forgot-password" render={() => <ForgotPassword />} />
					<Route path="/password-reset/:token" render={() => <PasswordReset />} />

					{/*<Route path="/upload" component={FileUpload} />*/}

					<Alert timeout={1700} />
				</div>
			</BrowserRouter>
		);
	}
}

export default connect(null, actions)(App);
