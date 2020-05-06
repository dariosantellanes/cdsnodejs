import '@babel/polyfill'

import { Dao } from './lib/data/sqliteDB';
import { UserRepository } from './lib/data/userRepository';
import { MovieRepository } from './lib/data/movieRepository';
import { TokenRepository } from './lib/data/tokenRepository';

import { UserService } from './lib/services/userService';
import { MovieService } from './lib/services/movieService';
import { TokenService } from './lib/services/tokenService';

import { startServer } from './lib/server';

const init = async () => {

	try {
		//Build database object
		const dao = new Dao();

		//Build database repos
		const userRepository = new UserRepository(dao);
		const movieRepository = new MovieRepository(dao);
		const tokenRepository = new TokenRepository(dao);

		//Build services
		const userService = new UserService(userRepository);
		const movieService = new MovieService(movieRepository);
		const tokenService = new TokenService(tokenRepository);

		//Create tables if not exists
		await userRepository.createTable();
		await movieRepository.createTable();
		await tokenRepository.createTable();

		startServer(tokenService, userService, movieService);
	} catch (err) {
		console.error(err);
	}
}

init();