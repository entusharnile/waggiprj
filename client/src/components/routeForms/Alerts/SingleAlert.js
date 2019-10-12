import React from 'react';
import { Link } from 'react-router-dom';

const SingleAlert = ({ alert, deleteAlert, openModal }) => {
	return (
		<div className="columns is-mobile box is-shadowless is-paddingless single-alert">
			<a className="column has-text-danger" onClick={() => openModal(alert._id)}>
				&nbsp;&nbsp;X
			</a>
			<div className="column is-two-thirds">{alert.desc}</div>
			<Link
				to={{
					pathname: '/edit/edit-alert',
					state: { alert }
					//we are pushing alert object values as props to 'edit-alert' route
				}}
				className="column"
			>
				Edit
			</Link>
			{/*<a className="column has-text-danger" onClick={() => deleteAlert(alert._id)}>
				Delete
			</a>*/}
		</div>
	);
};

export default SingleAlert;
