//prod.js - production keys here
module.exports = {
	googleClientID: process.env.GOOGLE_CLIENT_ID,
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,

	facebookClientID: process.env.FACEBOOK_CLIENT_ID,
	facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET,

	awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
	awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

	MongoURI: process.env.MONGO_URI,
	cookieKey: process.env.COOKIE_KEY,

	stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
	stripeSecretKey: process.env.STRIPE_SECRET_KEY,

	sendGridKey: process.env.SEND_GRID_KEY,
	redirectDomain: process.env.REDIRECT_DOMAIN
};
