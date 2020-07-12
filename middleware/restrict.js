
function restrict() {
	const error = {
		message: 'You shall not pass!',
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

module.exports = restrict;