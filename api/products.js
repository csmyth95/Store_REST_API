// products.js
//
// Defines the products api. Add to a server by calling:
// require('./products')
'use strict';

// Only exports - adds the API to the app with the given options
module.exports = (app, options) => {
	// TODO: Add more API's in time
	app.get('/products', (req, res, next) => {
		options.repository.getProducts().then((products) => {
			res.status(200).send(products.map((product) => { return {
					name: product.name,
					description: product.description,
					price: product.price
				};
			}));
		}).catch(next);
	});

	app.get('/search', (req, res) => {
		// get the name
		var name = req.query.name;
		if (!name) {
			throw new Error("When searching for a product, the name must be specified, e.g '/search?name=Destiny 2'.");
		}

		// get the product from the repository
		options.repository.getUserByName(name).then((product) => {
			if (!product) {
				res.status(404).send('Product not found');
			} else {
				res.status(200).send({
					name: product.name,
					description: product.description,
					price: product.price
				});
			}
		}).catch(next);
	});
};
