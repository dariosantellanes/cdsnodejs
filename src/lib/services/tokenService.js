import jwt from 'jsonwebtoken';
import { TokenException } from '../exception/tokenException';

export class TokenService {
    constructor(repository) {
        this.repository = repository;
    }

    async generateToken(userId) {
        try {
            const opts = {
                expiresIn: "2hr",
                issuer: process.env.JWT_KEY
            }

            return await jwt.sign(
                { userId },
                process.env.JWT_KEY,
                opts);

        } catch (err) {
            console.error(err);
            throw new TokenException('An error ocurred creating a token', 500);
        }
    }

    async decodeToken(token) {
        try {
            return await jwt.verify(token, process.env.JWT_KEY);
        } catch (err) {
            console.error(err);
            throw new TokenException('Invalid Token', 400);
        }
    }

    async invalidateToken(token) {
        try {
            await this.repository.add(token);
        } catch (err) {
            console.error(err);
            throw new TokenException('Invalid Token', 400);
        }
    }

    async isTokenValid(token) {
        let exists = await this.repository.exists(token);
        return !exists.value;
    }
}

