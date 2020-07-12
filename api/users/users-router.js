const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require('./users-model');
const regulate = require("../../middleware/regulate");

const router = express.Router();

// Retrieves list of users from database
router.get('/users', regulate(), async (req, res, next) => {
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
			});
		}

		const newUser = await Users.add({
			username,
			password: await bcrypt.hash(password, 12), // hash the password with a time complexity of '12'
		})


		res.status(201).json(newUser);
	} catch(err) {
		next(err);
	}
})

// Logs in a registered user
router.post('/login', async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await Users.findBy({ username }).first();

		// Checks if username is in the database
		if (!user) {
			return res.status(401).json({
				message: 'Invalid Credentials',
			});
		}

		// Use bcrypt to hash the password again and compare the input password with the one in the database
		const isMatch = await bcrypt.compare(password, user.password)

		// Checks is input password is correct
		if (!isMatch) {
			return res.status(401).json({
				message: 'Invalid Credentials',
			});
		}

		// Creates a new login session for the user and sends back a session id
		req.session.user = user;

		res.json({
			message: `${user.username} you logged in successfully!`,
		});
	} catch(err) {
		next(err);
	}
})

module.exports = router;