import jwt from 'jsonwebtoken';
import { TokenException } from '../exception/tokenException';

export class TokenService {
    constructor() { }

    generateToken(userId) {
        try {
            const opts = {
                expiresIn: "2hr",
                issuer: process.env.JWT_KEY
            }

            return jwt.sign(
                { userId },
                process.env.JWT_KEY,
                opts);

        } catch (err) {
            console.error(err);
            throw new TokenException('An error ocurred creating a token', 500);
        }
    }

    decodeToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_KEY);
        } catch (err) {
            console.error(err);
            throw new TokenException('Invalid Token', 400);
        }
    }
}

