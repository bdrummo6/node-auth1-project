const db = require('../../data/dbConfig');

// Finds every users id and username from users table in database
function find() {
	return db('users').select('id', 'username');
}

module.exports = {
	find
}


