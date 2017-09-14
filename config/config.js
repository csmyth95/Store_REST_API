// config.js
//
// Simple app configuration
module.exports = {
	port: process.env.PORT || 8101,
	db: {
		host: process.env.DATABASE_HOST || '127.0.0.1',
		database: 'products',
		user: 'products_service',
		password: 'test_pass',
		port: 3306
	}
};
