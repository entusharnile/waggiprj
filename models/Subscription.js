const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
	name: String,
	slug: String,
	duration: Number,//duration in months
	price: Number, //price in cents
	desc: String
});

const Subscription = mongoose.model('subscriptions', SubscriptionSchema);
module.exports = Subscription;