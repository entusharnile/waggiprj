const passport = require('passport');
const mongoose = require('mongoose');
const Profile = mongoose.model('profiles');
const User = mongoose.model('users');
const PasswordUtil = require('../utils').PasswordUtil;
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

const keys = require('../config/keys');
const crypto = require('crypto');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(keys.sendGridKey);

module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);
	app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
		//redirect to signup steps if the steps are not completed
		//else redirect to dashboard
		if (!req.user.stepComplete) {
			res.redirect('/owner-profile');
		} else {
			res.redirect('/edit');
		}
	});

	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {
		if (!req.user.stepComplete) {
			res.redirect('/owner-profile');
		} else {
			res.redirect('/edit');
		}
	});

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});
	app.get('/api/current_user', (req, res) => {
		res.send(safeUser(req));
	});

	app.post('/api/validateuserlogin', async (req, res) => {
		const matchingUser = await PasswordUtil.comparePasswords(
			req.body.params.email,
			req.body.params.password
		);

		if (matchingUser) {
			res.send(matchingUser);
		} else {
			res.send(false);
		}
	});

	app.post('/api/signupnativeuser', async (req, res) => {
		if (userAlreadyExist(req.body.email)) {
			res.send({ error: 'user already exist' });
		} else {
			const hashedPwd = await PasswordUtil.getHasedPassword(req.body.password);
			const user = await new User({
				accountId: req.body.email,
				password: hashedPwd
			}).save(function(err, data) {
				if (data) {
					res.send(data);
				} else {
					const errorArray = { results: err.code };
					res.send(errorArray);
				}
			});
		}
	});

	app.post('/api/forgot-password', async (req, res) => {
		const user = await User.findOne({ accountId: req.body.email });

		if (user) {
			const token = crypto.randomBytes(32).toString('hex');
			let expiryDate = new Date();
			expiryDate.setHours(expiryDate.getHours() + 24);

			user.forgotPassword = {
				token: token,
				expiryDate: expiryDate
			};

			const msg = {
				to: user.accountId,
				from: 'tech@awebdigital.co',
				subject: 'Waggi Forgot Password',
				html: `
				<h2>Password reset link for Waggi</h2>
				<p>click <a href="${keys.redirectDomain}/password-reset/${token}">here</a></p>
				<p>This link is valid for next 24hrs</p>
				`
			};

			try {
				await sgMail.send(msg);
				user.save().then(user => {
					res.send({ success: 'email sent' });
				});
			} catch (e) {
				res.send(e);
			}
		} else {
			res.send({ error: "email doesn't exist" });
		}
	});

	app.post('/api/password-reset', async (req, res) => {
		const user = await User.findOne({ 'forgotPassword.token': req.body.token });
		if (user) {
			if (user.forgotPassword.expiryDate > new Date()) {
				const hashedPwd = await PasswordUtil.getHasedPassword(req.body.password);
				user.password = hashedPwd;
				user.forgotPassword = undefined;
				user.save().then(user => {
					res.send({ success: 'password has been reset' });
				});
			} else {
				res.send({ error: 'token has expired' });
			}
		} else {
			res.send({ error: 'link is expired' });
		}
	});

	app.post('/auth/login', passport.authenticate('local'), (req, res) => {
		res.send(safeUser(req));
	});

	// app.post('/auth/login', (req, res) => {
	// 	return passport.authenticate('local', (err, user) => {
	// 		if (err) {
	// 			if (err.name === 'PasswordMismatch') {
	// 				return res.send({
	// 					error: 'password mismatch'
	// 				});
	// 			}
	// 			if (err.name === 'AccountDoesntExist') {
	// 				return res.send({
	// 					error: 'account doesnt exist'
	// 				});
	// 			}
	// 		}
	// 		return res.send(user);
	// 	})(req, res);
	// });
	const safeUser = req => {
		if (req.user) {
			req.user.password = undefined;
		}
		return req.user;
	};
	app.post('/auth/signup', passport.authenticate('signup'), (req, res) => {
		res.send(safeUser(req));
	});
};
