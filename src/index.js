import '@babel/polyfill'

import { Dao } from './lib/data/sqliteDB';
import { UserRepository } from './lib/data/userRepository';

import { UserService } from './lib/services/userService';
import { TokenService } from './lib/services/tokenService';

import { startServer } from './lib/server';

const init = async () => {

	try {
		const dao = new Dao();
		const userRepository = new UserRepository(dao);
		const userService = new UserService(userRepository);
		const tokenService = new TokenService();

		//create tables if not exists
		await userRepository.createTable();
		startServer(userService, tokenService);
	} catch (err) {
		console.error(err);
	}
}

init();