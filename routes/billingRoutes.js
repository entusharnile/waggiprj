const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

const mongoose = require('mongoose');
const Profile = mongoose.model('profiles');
const User = mongoose.model('users');
var moment = require('moment');

module.exports = app => {
	app.post('/api/stripe', async (req, res) => {
		const { amount, token, packageName } = req.body;
		const charge = await stripe.charges.create({
			amount: amount,
			currency: 'usd',
			description: `charge for ${packageName} packageName`,
			source: token.id
		});

		const profileInit = await Profile.findOne({ _user: req.user.id });

		//get existing subscription end date and add months as per package paid for
		var subEndInit = profileInit.pet[0].subscriptionEnd;
		var subEndNew = subEndInit;

		if (packageName === 'annual') {
			subEndNew = moment(new Date(subEndInit))
				.add(12, 'months')
				.toDate();
		} else if (packageName === 'semi-annual') {
			subEndNew = moment(new Date(subEndInit))
				.add(6, 'months')
				.toDate();
		}

		console.log(subEndNew);

		const profile = await Profile.findOneAndUpdate(
			{ _user: req.user.id },
			{
				$set: {
					'pet.0.subscriptionEnd': subEndNew
				}
			},
			{ upsert: true, new: true },
			function(err, doc) {
				if (err) {
					console.log(err);
				} else {
					res.send(doc);
				}
			}
		);
	});
};
