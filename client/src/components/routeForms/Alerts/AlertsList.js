import React from 'react';
import SingleAlert from './SingleAlert';

const AlertsList = ({ alerts, deleteAlert, openModal }) => {
	return alerts.map((alert, index) => (
		<SingleAlert key={index} alert={alert} deleteAlert={deleteAlert} openModal={openModal} />
	));
};

export default AlertsList;
