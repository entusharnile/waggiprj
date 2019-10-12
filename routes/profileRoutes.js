const Path = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Profile = mongoose.model("profiles");
const User = mongoose.model("users");

module.exports = app => {
  app.post("/api/profile", requireLogin, async (req, res) => {
    // prettier-ignore
    const {
        name, email, phone, lipsumz,
        petName, petType, petBreed, petAge,
        houseNo, street, city, zip
      } = req.body;

    const profile = {
      user: {
        displayName: name,
        email,
        phone,
        address
      },
      pet: {
        name: petName,
        breed: petBreed,
        age: petAge
      },
      _user: req.user.id
    };
    try {
      //await profile.save();
      await Profile.findOneAndUpdate(
        { _user: req.user.id }, // find a document with that filter
        profile, // document to insert when nothing was found
        { upsert: true, new: true }, // options
        function(err, doc) {
          if (err) {
            console.log(err);
          } else {
            res.send(doc);
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.status(422).send(err);
    }
  });

  app.get("/api/profile", requireLogin, async (req, res) => {
    const profile = await Profile.findOne({ _user: req.user.id });
    res.send(profile);
  });

  app.get("/api/pet/:qrcode", async (req, res) => {
    const profile = await Profile.find(
      { "pet.qr": req.params.qrcode },
      {
        //1 means include, 0 means exclude from result
        "pet.name": 1,
        "user.displayName": 1,
        "user.email": 1,
        "user.mobile": 1,
        "pet.imgUrl": 1,
        _id: 0
      }
    );
    res.send(profile);
  });

  //when user clicks skip button, note that user has finished initial steps
  app.get("/api/skip", async (req, res) => {
    console.log(res.body);
    await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $set: {
          stepComplete: true
        }
      },
      function(err, doc) {
        if (err) {
          console.log(err);
        } else {
          res.send({ success: true });
        }
      }
    );
  });
};
