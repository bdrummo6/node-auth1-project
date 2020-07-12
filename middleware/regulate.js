const bcrypt = require('bcryptjs');
const Users = require('../api/users/users-model');

function regulate() {
	const error = {
		message: 'Invalid credentials',
	}

	return async (req, res, next) => {
		try {
			const { username, password } = req.headers;
			// make sure the values are not empty
			if (!username || !password) {
				return res.status(401).json(error);
			}

			const user = await Users.findBy({ username }).first();
			// make sure the user exists in the database
			if (!user) {
				return res.status(401).json(error);
			}

			const isMatch = await bcrypt.compare(password, user.password);
			// make sure the password is correct
			if (!isMatch) {
				return res.status(401).json(error);
			}

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