const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlertSchema = new Schema({
	name: String,
	frequency: String,
	startDate: String,
	endDate: String,
	desc: String
});

const Alert = mongoose.model('alert', AlertSchema);
module.exports = Alert;