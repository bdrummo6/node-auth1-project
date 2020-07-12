const db = require('../../data/dbConfig');

// Finds every users id and username from users table in database
function get() {
	return db('users').select('id', 'username');
}

module.exports = {
	get
}


