export const required = value => (value ? undefined : 'Required');

export const email = value =>
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
		? 'Invalid email address'
		: undefined;

export const minLength = value =>
	value && value.length < 8 ? 'Must be 8 characters or more' : undefined;
