const express = require('express');
const Users = require('./users-model');

const router = express.Router();

// Retrieves list of users from database
router.get('/users', async (req, res, next) => {
	try {
		res.json(await Users.get());
	} catch(err) {
		next(err);
	}
})

module.exports = router;