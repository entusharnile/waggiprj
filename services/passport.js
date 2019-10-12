const passport = require('passport');
const GoogleStartegy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
var bcrypt = require('bcryptjs');
const PasswordUtil = require('../utils').PasswordUtil;

const User = mongoose.model('users');
const Profile = mongoose.model('profiles');

const userAlreadyExist = async email => {
	const exist = await User.findOne({ accountId: email });
	if (exist) return true;
	return false;
};

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStartegy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: keys.googleDevCallback || '/auth/google/callback',
			proxy: true
		},
		async (accessToken, refreshTocken, profile, done) => {
			const existingUser = await User.findOne({
				accountId: profile.id
			});

			if (existingUser) {
				return done(null, existingUser);
			}
			const user = await new User({
				accountId: profile.id,
				displayName: profile.displayName
			}).save();
			console.log(user.id);

			//here we took 'userProfile' instead of 'profile' because the variable 'profile'
			//is already in use
			const userProfile = await new Profile({ _user: user.id }).save();
			done(null, user);
		}
	)
);

passport.use(
	new FacebookStrategy(
		{
			clientID: keys.facebookClientID,
			clientSecret: keys.facebookClientSecret,
			callbackURL: keys.facebookDevCallback || '/auth/facebook/callback',
			proxy: true
		},
		async (accessToken, refreshTocken, profile, done) => {
			const existingUser = await User.findOne({
				accountId: profile.id
			});

			if (existingUser) {
				return done(null, existingUser);
			}
			const user = await new User({
				accountId: profile.id,
				displayName: profile.displayName
			}).save();
			done(null, user);
		}
	)
);

passport.use(
	new LocalStrategy((username, password, done) => {
		User.findOne({ accountId: username }, function(err, user) {
			if (err) {
				return done(err);
			}
			if (user) {
				const passwordsMatch = bcrypt.compareSync(password, user.password);
				if (passwordsMatch) return done(null, user);
				return done(null, false);
			}
			return done(null, false);
		});
	})
);

// passport.use(
// 	new LocalStrategy((username, password, done) => {
// 		User.findOne({ accountId: username }, function(err, user) {
// 			if (err) {
// 				return done(err);
// 			}
// 			if (user) {
// 				const passwordsMatch = bcrypt.compareSync(password, user.password);
// 				if (passwordsMatch) return done(null, user);
// 				const error = new Error('password mismatch');
// 				error.name = 'PasswordMismatch';
// 				return done(error);
// 			}
// 			const error = new Error('account doesnt exist');
// 			error.name = 'AccountDoesntExist';
// 			return done(error);
// 		});
// 	})
// );

passport.use(
	'signup',
	new LocalStrategy(async (username, password, done) => {
		if (await userAlreadyExist(username)) {
			console.log('user exist');
			return done(null, false);
		}
		console.log('user not exist');
		const hashedPwd = await PasswordUtil.getHasedPassword(password);
		const user = new User({
			accountId: username,
			password: hashedPwd
		});
		user.save().then(user => {
			done(null, user);
		});
	})
);
