const mongoose = require('mongoose');
const requireLogin = require('../../middlewares/requireLogin');

const Profile = mongoose.model('profiles');

module.exports = app => {
	app.post('/api/alert', requireLogin, async (req, res) => {
		const newAlert = {
			name: req.body.name,
			frequency: req.body.frequency,
			startDate: req.body.startDate,
			endDate: req.body.endDate,
			desc: req.body.desc
		};
		Profile.findOne({ _user: req.user.id }).then(profile => {
			/*Need to improve this. Using this approach as it was
	          doing mutiple insertions for single request*/
			profile.alerts.push(newAlert);
			profile.save().then(doc => {
				res.send(doc);
			});
		});
	});

	app.delete('/api/alert', requireLogin, async (req, res) => {
		Profile.findOneAndUpdate(
			{ _user: req.user.id },
			{
				$pull: {
					alerts: {
						_id: req.body.id
					}
				}
			},
			{ new: true } //return updated document instead of old one
		).then(doc => {
			res.send(doc);
		});
	});

	app.put('/api/alert', requireLogin, async (req, res) => {
		Profile.findOneAndUpdate(
			{ _user: req.user.id, 'alerts._id': req.body._id },
			{
				'alerts.$.name': req.body.name,
				'alerts.$.frequency': req.body.frequency,
				'alerts.$.startDate': req.body.startDate,
				'alerts.$.endDate': req.body.endDate,
				'alerts.$.desc': req.body.desc
			},
			{ new: true }
		).then(doc => {
			res.send(doc);
		});
	});
};
