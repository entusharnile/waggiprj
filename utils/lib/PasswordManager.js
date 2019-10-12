var bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('users');
var saltRounds = 10;

exports.getHasedPassword = async function(passwordText) {
	const hashedPassword = await new Promise((resolve, reject) => {
		bcrypt.hash(passwordText, saltRounds, function(err, hash) {
			if (err) reject(err);
			resolve(hash);
		});
	});

	return hashedPassword;
};

exports.comparePasswords = async function(username, password) {
	const hashedPassword = await new Promise((resolve, reject) => {
		User.findOne({ accountId: username }).then(function(user) {
			if (user) {
				bcrypt.compare(password, user.get('password'), function(err, resp) {
					if (err) resolve(false);
					if (resp) resolve(user);
					else resolve(false);
				});
			} else {
				resolve(false);
			}
		});
	});
	return hashedPassword;
};

exports.passwordsMatch = (plainPassword, hashedPassword) => {
	const result = bcrypt.compareSync(plainPassword, hashedPassword);
	return result;
};
