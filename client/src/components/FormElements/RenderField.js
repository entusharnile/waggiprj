import React from 'react';

const RenderField = ({ input, label, type, disabled, meta: { touched, error } }) => {
	return (
		<div className="render-field column">
			<input {...input} disabled={disabled} placeholder={label} type={type} />
			{touched && error && <span className="error">{error}</span>}
		</div>
	);
};

export default RenderField;
