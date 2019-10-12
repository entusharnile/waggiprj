const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	code: String,
	isUsed: {
		type: Boolean,
		default: false
	}
});

mongoose.model('tags', userSchema);
