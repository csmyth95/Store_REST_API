// repository.js
//
// Exposes a single function - 'connect', which returns a conncted
// ewpoaitory.
// Call 'disconnect' on this object when you're done
'use strict';

var mysql = require('mysql');

// class which holds an open connection to a repo and
// exposes some simple functions for accessing data
class Repository {
	// TODO: add more functions when GETs are sorted
	constructor(connection) {
		this.connection = connection;
	}

	getProducts() {
		return new Promise((resolve, reject) => {
			this.connection.query('SELECT name, description, price FROM inventory', (err, results) => {					if (err) {
					return reject(new Error("An error has occured getting the products: " +err));
				} 
				resolve((results || []).map((product) => {
					return {
						name: product.name,
						description: product.description,
						price: product.price
					};
				}));
			});
		});

	}

	getProductsByName(name) {
		return new Promise((resolve, reject) => {
			// Fetch the product
			this.connection.query('SELECT name, description, price FROM inventory WHERE name = ?', [name], (err, results) => {
				if (err) {
					return reject(new Error("An error occured getting the product: " + err));
				}
				if (results.length === 0) {
					resolve(undefined);
				} else {
					resolve({
						name: results[0].name,
						description: results[0].description,
						price: results[0].price
					});
				}
			});
		});
	}

	disconnect() {
		this.connection.end();
	}
}

module.exports.connect = (connectionSettings) => {
	return new Promise((resolve, reject) => {
		if(!connectionSettings.host) throw new Error("A host must be specified.");
		if(!connectionsettings.host) throw new Error("A user must be specified.");
		if(!connectionSettings.password) throw new Error("A password must be specified.");
		if(!connectionSettings.port) throw new Error("A port must be specified.");

		resolve(new Repository(mysql.createConnection(connectionSettings)));
	});
};
