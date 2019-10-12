import axios from "axios";
import {
	FETCH_USER,
	FETCH_SURVEYS,
	FETCH_PROFILE,
	FETCH_LOSTPETPROFILE,
	FETCH_SUBSCRIPTIONPLANS,
	LOADING_ANIMATION,
	PAGE_LOADING
} from "./types";
import { alert } from "../components/routeForms/helpers";

export const submitFoundPet = values => async dispatch => {
	startLoadingAnimation(dispatch);
	const { data } = await axios.post("/api/found-pet", values);
	if (data.success) {
		alert("Your message has been sent successfully to the owner.");
	}
	stopLoadingAnimation(dispatch);
};

export const fetchUser = () => async dispatch => {
	dispatch({ type: PAGE_LOADING, payload: true });
	const res = await axios.get("/api/current_user");
	dispatch({ type: FETCH_USER, payload: res.data });
	dispatch({ type: PAGE_LOADING, payload: false });
};

export const handleToken = (values, history) => async dispatch => {
	const res = await axios.post("/api/stripe", values);
	dispatch({ type: FETCH_PROFILE, payload: res.data });
	alert("Subscription has been renewed");
	history.push("/edit/manage-subscription");
};

export const submitSurvey = (values, history) => async dispatch => {
	const res = await axios.post("/api/surveys", values);
	history.push("/surveys");
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
	const res = await axios.get("/api/surveys");
	dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const fetchProfile = () => async dispatch => {
	const res = await axios.get("/api/owner-profile");
	dispatch({ type: FETCH_PROFILE, payload: res.data });
};

export const fetchLostpetProfile = qrcode => async dispatch => {
	const urlstring = "/api/pet/" + qrcode;
	const res = await axios.get(urlstring);
	dispatch({ type: FETCH_LOSTPETPROFILE, payload: res.data });
};

export const submitNewAlert = (values, history) => async dispatch => {
	startLoadingAnimation(dispatch);
	const res = await axios.post("/api/alert", values);
	dispatch({ type: FETCH_PROFILE, payload: res.data });
	history.push("/edit/alert");
	stopLoadingAnimation(dispatch);
	alert("Alert added");
};

export const updateAlert = (values, history) => async dispatch => {
	const res = await axios.put("/api/alert", values);
	dispatch({ type: FETCH_PROFILE, payload: res.data });
	history.push("/edit/alert");
	alert();
};

export const deleteAlert = id => async dispatch => {
	startLoadingAnimation(dispatch);
	const res = await axios.delete("/api/alert", { data: { id } });
	dispatch({ type: FETCH_PROFILE, payload: res.data });
	stopLoadingAnimation(dispatch);
	alert("Successfully deleted!");
};

export const handleOwnerSubmit = (values, history) => async dispatch => {
	startLoadingAnimation(dispatch);
	if (values.ownerImage) {
		await uploadImage(values.ownerImage, "owner");
	}
	const res = await axios.post("/api/owner-profile", values);

	dispatch({ type: FETCH_PROFILE, payload: res.data });
	stopLoadingAnimation(dispatch);
	alert();
	if (history.location.pathname === "/owner-profile")
		history.push("/pet-profile");
};

export const handlePetSubmit = (values, history) => async dispatch => {
	startLoadingAnimation(dispatch);
	if (values.petImage) {
		await uploadImage(values.petImage, "pet");
	}
	const res = await axios.post("/api/pet-profile", values);
	dispatch({ type: FETCH_PROFILE, payload: res.data });
	stopLoadingAnimation(dispatch);
	alert();
	if (history.location.pathname === "/pet-profile") history.push("/add-tag");
};

export const handleTagSubmit = async (values, history, dispatch) => {
	startLoadingAnimation(dispatch);
	const { data } = await axios.post("/api/tag", values);
	if (data.err) {
		stopLoadingAnimation(dispatch);
		return data;
	} else {
		dispatch({ type: FETCH_PROFILE, payload: data });
		stopLoadingAnimation(dispatch);
		return data;
	}
};

export const validateUserLogin = (
	email,
	password,
	history
) => async dispatch => {
	startLoadingAnimation(dispatch);
	const res = await axios.post("/api/validateuserlogin", {
		params: {
			email,
			password
		}
	});
	dispatch({ type: FETCH_USER, payload: res.data });
	stopLoadingAnimation(dispatch);
	return res.data;
};

export const validateUserLoginPassport = values => async dispatch => {
	startLoadingAnimation(dispatch);

	try {
		const res = await axios.post("/auth/login", values);

		dispatch({ type: FETCH_USER, payload: res.data });
		stopLoadingAnimation(dispatch);
		return res.data;
	} catch (e) {
		if (e.response.status === 401) {
			stopLoadingAnimation(dispatch);
			return { error: "wrong credentials" };
		}
	}
};

export const signupNativeUser = (
	email,
	password,
	history
) => async dispatch => {
	startLoadingAnimation(dispatch);
	const res = await axios.post("/api/signupnativeuser", {
		email,
		password
	});

	var parseResponse;
	if (res.data.results) {
		parseResponse = false;
	} else {
		parseResponse = res.data;
	}
	dispatch({ type: FETCH_USER, payload: parseResponse });
	stopLoadingAnimation(dispatch);
	return res.data;
};

export const signupLocalPassport = (values, history) => async dispatch => {
	delete values.confirmpassword;
	startLoadingAnimation(dispatch);
	try {
		const res = await axios.post("/auth/signup", values);
		var parseResponse;
		if (res.data.results) {
			parseResponse = false;
		} else {
			parseResponse = res.data;
		}
		dispatch({ type: FETCH_USER, payload: parseResponse });
		stopLoadingAnimation(dispatch);
		return res.data;
	} catch (e) {
		stopLoadingAnimation(dispatch);
		return { error: "account exist" };
	}
};

export const fetchSubscriptionPlans = qrcode => async dispatch => {
	const res = await axios.get("/api/subscriptions/all-subscriptions");
	dispatch({ type: FETCH_SUBSCRIPTIONPLANS, payload: res.data });
};

export const handleForgotPasswordSubmit = async (values, dispatch) => {
	startLoadingAnimation(dispatch);
	const res = await axios.post("/api/forgot-password", values);
	stopLoadingAnimation(dispatch);
	return res;
};

export const handlePasswordRsetSubmit = async (values, dispatch) => {
	startLoadingAnimation(dispatch);
	const res = await axios.post("/api/password-reset", values);
	stopLoadingAnimation(dispatch);
	return res;
};

const startLoadingAnimation = dispatch => {
	dispatch({ type: LOADING_ANIMATION, payload: true });
};
const stopLoadingAnimation = dispatch => {
	dispatch({ type: LOADING_ANIMATION, payload: false });
};

const uploadImage = async (imgArray, endpoint) => {
	const formData = new FormData();
	formData.append("theseNamesMustMatch", imgArray[0]);
	const config = {
		headers: {
			"content-type": "multipart/form-data"
		}
	};
	const { data } = await axios.post(
		`/api/${endpoint}-upload`,
		formData,
		config
	);
	return data;
};
