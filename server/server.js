// server.js

var express = require("express");
var morgan = require("morgan");

module.exports.start = (options) => {
	return new Promise((resolve, reject) => {
		// Ensure repository and port is provided
		if(!opions.repository) throw new Error("A server must be started with a connected repository");
		if(!options.port) throw new Error("A server must be started with a port");
		
		// Create the app, add some logging
		var app = express();
		app.use(morgan('dev'));

		require('../api/products')(app, options);

		// Start the app, creating a running server which we return
		var server = app.listen(options.port, () => {
			resolve(server);
		});
	});
};
