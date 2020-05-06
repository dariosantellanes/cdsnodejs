import { Exception } from './exception';

export class MovieException extends Exception {
    constructor(message, code) {
        super(message || 'Operation failed', code);
    }
}