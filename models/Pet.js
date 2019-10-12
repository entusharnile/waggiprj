const mongoose = require('mongoose');
const { Schema } = mongoose;

const petSchema = new Schema({
	name: String,
	breed: String,
	gender: String,
	birthday: String,
	weight: String,
	city: String,
	description: String,
	rabiesTag: String,
	microchipId: String,
	licene: String,
	_user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('pets', petSchema);
