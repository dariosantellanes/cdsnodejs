import { Exception } from './exception';

export class TokenException extends Exception {
    constructor(message, code) {
        super(message || 'Operation failed', code);
    }
}