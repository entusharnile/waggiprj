const mongoose = require('mongoose');
const requireLogin = require('../../middlewares/requireLogin');

const Profile = mongoose.model('profiles');

module.exports = app => {
	app.post('/api/pet-profile', requireLogin, async (req, res) => {
		//prettier-ignore
		const {
      petName, petWeight, petCity, petDescription, petBreed, 
      petBirthDay, rabiesTag, microchipId, gender, petGender, petLicense
    } = req.body;
		console.log(microchipId);
		try {
			await Profile.findOneAndUpdate(
				{ _user: req.user.id },
				{
					$set: {
						/*Here currently we are dealing with first element of pet only so index is 0 
             It will become a variable in future*/
						'pet.0.name': petName,
						'pet.0.breed': petBreed,
						'pet.0.gender': petGender,
						'pet.0.birthday': petBirthDay,
						'pet.0.weight': petWeight,
						'pet.0.city': petCity,
						'pet.0.desc': petDescription,
						'pet.0.mchipId': microchipId,
						'pet.0.rabiesTag': rabiesTag,
						'pet.0.license': petLicense
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
	});

	app.get('/api/pet-profile', requireLogin, async (req, res) => {
		const profile = await Profile.findOne({ _user: req.user.id });
		res.send(profile.pet);
	});
};
