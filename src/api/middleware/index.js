export default (tokenService) => {
	const tokenValidation = async (req, res, next) => {
		try {
			const auth = req.header('Authorization');
			const token = auth
				? auth.replace('Bearer ', '')
				: undefined;
			if (await tokenService.isTokenValid(token)) {
				req.auth = await tokenService.decodeToken(token);
				req.auth.token = token;
				next();
			} else {
				res.status(400).send({ error: "Invalid Token" });
			}

		} catch (err) {
			res.status(err.code || 500).send({ error: err.message })
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

