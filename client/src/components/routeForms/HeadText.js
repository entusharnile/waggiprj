import React from 'react';

const titles = {
	pet: 'EDIT PET PROFILE',
	owner: "EDIT OWNER'S PROFILE",
	tag: 'ADD TAG',
	alert: 'ALERT',
	'add-new-alert': 'ADD A NEW ALERT',
	'edit-alert': 'EDIT ALERT',
	'manage-subscription': 'MANAGE SUBSCRIPTION',
	'renew-subscription': 'RENEW SUBSCRIPTION'
};
const HeadText = ({ match }) => {
	return <h1 style={{ textAlign: 'center' }}>{titles[match.params.term]}</h1>;
};

export default HeadText;
