const mongoose = require("mongoose");
const Profile = mongoose.model("profiles");
const keys = require("../config/keys");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(keys.sendGridKey);

module.exports = app => {
	app.post("/api/found-pet", async (req, res) => {
		const { description, latitude, longitude, tag } = req.body;

		const profile = await Profile.findOne({ "pet.0.qr": tag });
		//comment
		const msg = {
			to: profile.user.email,
			from: "hello@waggi.com",
			subject: "Your lost pet has been found",
			html: `
				<h2>Someone has found your pet</h2>
				<p><strong>Description:</strong> ${description}</p>
				<br />
				<p><strong>Latitude:</strong> ${latitude}</p>
				<p><strong>Latitude:</strong> ${longitude}</p>
				<p><a href="http://maps.google.com/maps?q=${latitude},${longitude}">Click here</a> to see the location on map</p>
				`
		};

		try {
			await sgMail.send(msg);
			res.send({ success: "email sent" });
		} catch (e) {
			console.log(e);
			res.send(e);
		}
	});
};
