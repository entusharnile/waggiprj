const mongoose = require('mongoose');
const multer = require('multer');
const AWS = require('aws-sdk');
const Profile = mongoose.model('profiles');
const keys = require('../../config/keys');

/*Amazon s3 config*/
AWS.config.update({
	accessKeyId: keys.awsAccessKeyId,
	secretAccessKey: keys.awsSecretAccessKey
});

const s3 = new AWS.S3();

/*Multer config; memory storage keeps file data in a buffer*/
const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 52428800 } // file size limitation in bytes
});
//const config = upload.single('theseNamesMustMatch');

// const uploadFile = (req, res) => {
// 	console.log(req);
// };
// module.exports = uploadFile;

module.exports = app => {
	app.post('/api/upload', upload.single('theseNamesMustMatch'), (req, res) => {
		s3.putObject(
			{
				Bucket: 'waggi',
				Key: `${req.user._id}.jpg`,
				Body: req.file.buffer,
				ACL: 'public-read'
			},
			async (err, ETag) => {
				if (err) {
					console.log(err);
					res.send(err);
				} else {
					await Profile.findOneAndUpdate(
						{ _user: req.user.id },
						{
							new: true,
							$set: {
								'pet.0.rabiesTag': req.user.id
							}
						},
						function(err, doc) {
							if (err) {
								console.log(err);
							} else {
								res.send(doc);
							}
						}
					);
				}
			}
		);
	});
};
