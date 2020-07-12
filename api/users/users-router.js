const express = require('express');
const Users = require('./users-model');

const router = express.Router();

// Retrieves list of users from database
router.get('/users', async (req, res, next) => {
	try {
		res.json(await Users.find());
	} catch(err) {
		next(err);
	}
})

// Adds a new user to the database
router.post('/register', async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await Users.findBy({ username }).first();

		if (user) {
			return res.status(409).json({
				message: 'Username already exists!',
			})
		}

		const newUser = await Users.add({
			username,
			password
		})

		res.status(201).json(newUser);
	} catch(err) {
		next(err);
	}
})

module.exports = router;