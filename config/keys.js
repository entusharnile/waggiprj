//keys.js - figure out what set of credentils to be used
if (process.env.NODE_ENV === "production") {
	//we are in production - return production credentials
	module.exports = require("./prod");
} else {
	//we are in development - return dev credentials
	module.exports = require("./dev");
}
