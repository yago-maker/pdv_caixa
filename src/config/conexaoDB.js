const knex = require('knex')({
	client: 'pg',
	connection: {
		host: process.env.HOSTDB,
		user: process.env.USERDB,
		password: process.env.PASSDB,
		database: process.env.DATABASE,
		port: process.env.PORTDB,
	}
})

module.exports = knex;