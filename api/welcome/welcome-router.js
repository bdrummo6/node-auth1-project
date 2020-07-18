const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		res.json({ message: 'Welcome to the API for Node Auth Project 1!' });
	} catch (err) {
		next(err);
	}
})

module.exports = router;