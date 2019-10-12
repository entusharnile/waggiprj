const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Subscription = mongoose.model('subscriptions');

module.exports = app => {
  
  app.get('/api/subscriptions/all-subscriptions', async (req, res) => {
    const subscriptionplans = await Subscription.find({}, function(err, subscription){
      if(err){
        console.log(err);
      }
    });
    res.send(subscriptionplans);
  });
};