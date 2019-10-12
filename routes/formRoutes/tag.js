const mongoose = require('mongoose');
const requireLogin = require('../../middlewares/requireLogin');

const Tag = mongoose.model('tags');
const Profile = mongoose.model('profiles');
const User = mongoose.model('users');
var moment = require('moment');

module.exports = app => {
	app.post('/api/tag', requireLogin, async (req, res) => {
		//set all the primary sign up steps are completed
		await User.findOneAndUpdate(
			{ _id: req.user.id },
			{
				$set: {
					stepComplete: true
				}
			},
			function(err, doc) {
				if (err) {
					console.log(err);
				} else {
				}
			}
		);

		const tag = await Tag.findOne({ code: req.body.tag });
		if (tag) {
			if (tag.isUsed) {
				res.send({ err: 'used' });
			} else {
				const profile = await Profile.findOne({ _user: req.user.id });
				date = new Date();
				try {
					await Tag.findOneAndUpdate(
						{ code: req.body.tag },
						{
							$set: {
								isUsed: true
							}
						},
						function(err, doc) {
							if (err) {
								console.log(err);
							} else {
							}
						}
					);

					await Profile.findOneAndUpdate(
						{ _user: req.user.id },
						{
							$set: {
								'pet.0.qr': req.body.tag,
								'pet.0.subscriptionStart': date,
								'pet.0.subscriptionEnd': moment(new Date())
									.add(3, 'months')
									.toDate()
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
				} catch (err) {
					console.log(err);
					res.status(422).send(err);
				}
			}
		} else {
			res.send({ err: 'invalid' });
		}
	});
	app.get('/api/tag', requireLogin, async (req, res) => {
		const profile = await Profile.findOne({ _user: req.user.id });
		res.send(profile.pet[0].qr);
	});
};
