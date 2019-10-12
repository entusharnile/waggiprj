const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const bodyParser = require("body-parser");

//var flash = require('connect-flash');

require("./models/Subscription");
require("./models/User");
require("./models/Survey");
require("./models/Profile");
require("./models/Tag");
require("./services/passport");

//dev only, to clear console
//process.stdout.write('\x1B[2J\x1B[0f\u001b[0;0H');

mongoose.connect(keys.MongoURI);
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());
//app.use(flash());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);
require("./routes/profileRoutes")(app);
require("./routes/formRoutes")(app);
require("./routes/subscriptionRoutes")(app);
require("./routes/foundPet")(app);

if (process.env.NODE_ENV === "production") {
	//Expres will serve up prod assets
	app.use(express.static("client/build"));
	//serves index.html if route is not reconized
	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 4000;
app.listen(PORT);
