const bcrypt = require('bcryptjs');
const Users = require('../api/users/users-model');

function regulate() {
	const error = {
		message: 'Invalid credentials',
	}

	return async (req, res, next) => {
		try {

			if (!req.session || !req.session.user) {
				return res.status(401).json(error);
			}

			// if we reach this point, the user is considered authorized!
			next();
		} catch (err) {
			next(err);
		}
	}
}

module.exports = regulate;