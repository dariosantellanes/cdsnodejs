
import { UserException } from '../exception/userException';
import bcrypt from 'bcrypt';

export class UserService {
    constructor(repository) {
        this.repository = repository;
    }

    async registerUser(params) {
        let exists = await this.repository.exists(params.email);
        if (exists.value) {
            throw new UserException('User exists', 400);
        }
        params.password = await bcrypt.hash(params.password, parseInt(process.env.SALTROUNDS || 10, 10));
        await this.repository.add(params);
    }

    async loginUser(params) {
        let exists = await this.repository.exists(params.email);
        if (!exists.value) {
            throw new UserException('User does not exists', 400);
        }
        let user = await this.repository.get(params.email);
        if (!await bcrypt.compare(params.password, user.password)) {
            throw new UserException('Invalid password', 400);
        }
        return user;
    }
}