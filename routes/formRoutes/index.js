module.exports = app => {
	require('./owner-profile')(app);
	require('./pet-profile')(app);
	require('./tag')(app);
	require('./alert')(app);
	require('./image-upload')(app);
};
