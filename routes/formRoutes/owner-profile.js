const mongoose = require("mongoose");
const requireLogin = require("../../middlewares/requireLogin");
const Profile = mongoose.model("profiles");

module.exports = app => {
	app.post("/api/owner-profile", requireLogin, async (req, res) => {
		const { name, phone, address, email } = req.body;
		try {
			await Profile.findOneAndUpdate(
				{ _user: req.user.id },
				{
					upsert: true,
					$set: {
						"user.displayName": name,
						"user.mobile": phone,
						"user.email": email,
						"user.address": address
					}
				},
				{ new: true },
				function(err, doc) {
					if (err) {
						console.log(err);
					} else {
						if (!doc) {
							/*
                Document is not found, so creating new document, assigning values to it
                and saving it
              */
							let profile = new Profile();
							profile.user = {
								displayName: name,
								mobile: phone,
								email: email,
								address: address
							};
							profile._user = req.user.id;
							profile.save().then(doc => {
								res.send(doc);
							});
						} else {
							res.send(doc);
						}
					}
				}
			);
		} catch (err) {
			console.log(err);
			res.status(422).send(err);
		}
	});

	app.get("/api/owner-profile", requireLogin, async (req, res) => {
		const owner = await Profile.findOne({ _user: req.user.id });
		res.send(owner);
	});
};
