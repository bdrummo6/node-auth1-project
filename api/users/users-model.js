const db = require('../../data/dbConfig');

module.exports = {
	find,
	findBy,
	findById,
	add
}

// Finds every users id and username from users table in database
function find() {
	return db('users').select('id', 'username');
}

// Finds user with the specified id
function findById(id) {
	return db('users').select('id', 'username').where({ id }).first();
}

// Find by specified criteria
function findBy(filter) {
	return db('users').select('id', 'username', 'password').where(filter);
}

// Adds user to the database
async function add(user) {
	const [id] = await db('users').insert(user);
	return findById(id);
}

