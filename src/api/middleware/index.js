export default (tokenService) => {
	const tokenValidation = async (req, res, next) => {
		try {
			const auth = req.header('Authorization');
			const token = auth.replace('Bearer ', '');
			req.auth = tokenService.decodeToken(token);
			next();
		} catch (error) {
			res.status(err.code || 400).send({ error: 'Invalid Token' })
		};
	}

	const schemaValidation = (schema) => {
		return async (req, res, next) => {
			const results = schema(req.body);
			if (results.error) {
				res.status(400).send({ errors: { validation: results.error.details.map(x => x.message) } });
			} else {
				next();
			}
		}
	}

	return {
		tokenValidation,
		schemaValidation
	}
}

