import React from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';

const RenderDatePicker = ({ input, label, meta: { touched, error } }) => (
	<div className="render-field column">
		<Flatpickr {...input} placeholder={label} />
		{touched && error && <span className="has-text-danger error">{error}</span>}
	</div>
);

export default RenderDatePicker;
