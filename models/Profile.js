const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileSchema = new Schema({
	user: {
		displayName: {
			type: String,
			default: null
		},
		email: {
			type: String,
			default: null
		},
		mobile: {
			type: String,
			default: null
		},
		landline: {
			type: String,
			default: null
		},
		address: {
			type: String,
			default: null
		},
		postalCode: {
			type: String,
			default: null
		},
		imgUrl: {
			type: String,
			default: null
		}
	},
	pet: {
		type: Array,
		default: [
			{
				name: null,
				breed: null,
				gender: null,
				birthday: null,
				weight: null,
				city: null,
				desc: null,
				pic: null,
				qr: null,
				rabiesTag: null,
				mchipId: null,
				license: null,
				imgUrl: null,
				subscriptionStart:Date,
				subscriptionEnd:Date
			}
		]
	},
	alerts: [
		{
			name: String,
			frequency: Number,
			startDate: Date,
			endDate: Date,
			desc: String
		}
	],
	stepComplete: {
		type: Boolean,
		default: false
	},
	_user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('profiles', profileSchema);
