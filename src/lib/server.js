import http from 'http';
import express from 'express';
import helmet from 'helmet';
import routes from '../api/routes'
import bodyParser from 'body-parser';
import bodyParserError from 'bodyparser-json-error';

const startServer = (tokenService, userService, movieService) => {
	let app = express();
	app.server = http.createServer(app);
	app.use(helmet());
	app.use(bodyParser.json({
		limit: (process.env.BODY_LIMIT)
	}));

	app.use('/api', routes({
		tokenService,
		userService,
		movieService
	}));

	app.use(bodyParserError.beautify({
		status: 400,
		res: { msg: 'Invalid JSON string' }
	}));

	app.use('*', (req, res) => {
		res.status(404).send();
	});

	app.server.listen(process.env.PORT, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
}

export { startServer };