import React from 'react';
import Alert from 'react-s-alert';

export const spinAnimation = ({ target }) => {
	target.classList.toggle('is-loading');
};

export const renderError = ({ meta: { touched, error } }) => {
	return touched && error ? <span>{error}</span> : false;
};

//below function takes a variable and returns 'is-loading' if it is
//a boolean and true, otherwise returns false
export const checkLoading = loading =>
	(typeof loading === 'boolean' && loading && 'is-loading') || '';

export const alert = (message = 'Saved successfully!') => {
	Alert.success(message, {
		position: 'top-right',
		effect: 'slide',
		onShow: function() {},
		beep: false,
		offset: 100
	});
};
