import jwt from 'jsonwebtoken';


export class TokenService {
    constructor() { }

    generateToken(email) {
        const opts = {
            expiresIn: "1hr",
            issuer: process.env.JWT_KEY
        }

        return jwt.sign(
            { email },
            process.env.JWT_KEY,
            opts);
    }

    decodeToken(token) {
        return jwt.verify(token, process.env.JWT_KEY);
    }
}

