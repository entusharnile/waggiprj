const mongoose = require('mongoose');
const { Schema } = mongoose;
var bcrypt = require('bcryptjs');

const userSchema = new Schema({
	accountId: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	password: {
		type: String,
		trim: true
	},
	stepComplete: {
		type: Boolean,
		default: false
	},
	forgotPassword: {
		token: String,
		expiryDate: Date
	}
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

mongoose.model('users', userSchema);