const mongoose = require('mongoose');
const multer = require('multer');
const AWS = require('aws-sdk');
const Profile = mongoose.model('profiles');
const keys = require('../../config/keys');
const requireLogin = require('../../middlewares/requireLogin');
const util = require('util');
const { ObjectID } = require('mongodb');

// Amazon s3 config
AWS.config.update({
	accessKeyId: keys.awsAccessKeyId,
	secretAccessKey: keys.awsSecretAccessKey
});

const s3 = new AWS.S3();

// Multer config; memory storage keeps file data in a buffer
const upload = multer({
	storage: multer.memoryStorage(),
	// file size limitation in bytes
	//current linit 2MB
	limits: { fileSize: 2048000 }
});

const deleteFileFromS3 = key => {
	const params = { Bucket: 'waggi', Key: key };
	s3.deleteObject(params, function(err, data) {
		if (err) console.log(err, err.stack);
	});
};

module.exports = app => {
	app.post(
		'/api/owner-upload',
		requireLogin,
		upload.single('theseNamesMustMatch'),
		async (req, res) => {
			const owner = await Profile.findOne({ _user: req.user.id });
			const imgUrl = owner.user.imgUrl;
			if (imgUrl) {
				await deleteFileFromS3(imgUrl);
			}
			fileKey = `${new ObjectID()}.jpg`;

			s3.putObject(
				{
					Bucket: 'waggi',
					Key: fileKey,
					Body: req.file.buffer,
					ACL: 'public-read'
				},
				async (err, ETag) => {
					if (err) {
						res.send(err);
					} else {
						await Profile.findOneAndUpdate(
							{ _user: req.user.id },
							{
								$set: {
									'user.imgUrl': fileKey
								}
							},
							{ new: true },
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
		}
	);

	app.post(
		'/api/pet-upload',
		requireLogin,
		upload.single('theseNamesMustMatch'),
		async (req, res) => {
			const owner = await Profile.findOne({ _user: req.user.id });
			const imgUrl = owner.pet[0].imgUrl;
			if (imgUrl) {
				await deleteFileFromS3(imgUrl);
			}

			fileKey = `${new ObjectID()}.jpg`;

			s3.putObject(
				{
					Bucket: 'waggi',
					Key: fileKey,
					Body: req.file.buffer,
					ACL: 'public-read'
				},
				async (err, ETag) => {
					if (err) {
						res.send(err);
					} else {
						await Profile.findOneAndUpdate(
							{ _user: req.user.id },
							{
								$set: {
									'pet.0.imgUrl': fileKey
								}
							},
							{ new: true },
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
		}
	);

	// app.post(
	// 	'/api/pet-upload',
	// 	requireLogin,
	// 	upload.single('theseNamesMustMatch'),
	// 	(req, res) => {
	// 		s3.putObject(
	// 			{
	// 				Bucket: 'waggi',
	// 				Key: `${req.user._id}-pet.jpg`,
	// 				Body: req.file.buffer,
	// 				ACL: 'public-read'
	// 			},
	// 			async (err, ETag) => {
	// 				if (err) {
	// 					console.log(err);
	// 					res.send(err);
	// 				} else {
	// 					await Profile.findOneAndUpdate(
	// 						{ _user: req.user.id },
	// 						{
	// 							$set: {
	// 								'pet.0.imgUrl': `${req.user.id}-pet`
	// 							}
	// 						},
	// 						{ new: true },
	// 						function(err, doc) {
	// 							if (err) {
	// 								console.log(err);
	// 							} else {
	// 								res.send(doc);
	// 							}
	// 						}
	// 					);
	// 				}
	// 			}
	// 		);
	// 	}
	// );
};
