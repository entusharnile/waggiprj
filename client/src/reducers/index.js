import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import surveysReducer from "./surveysReducer";
import profileReducer from "./profileReducer";
import lostpetProfileReducer from "./lostpetProfileReducer";
import subscriptionplansReducer from "./subscriptionplansReducer";
import loadingReducer from "./loadingReducer";
import pageLoadingReducer from "./pageLoadingReducer";

export default combineReducers({
	auth: authReducer,
	form: reduxForm,
	surveys: surveysReducer,
	profile: profileReducer,
	lostpetprofile: lostpetProfileReducer,
	subscriptionplans: subscriptionplansReducer,
	loading: loadingReducer,
	pageLoading: pageLoadingReducer
});
