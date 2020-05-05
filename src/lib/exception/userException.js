import { Exception } from './exception';

export class UserException extends Exception {
    constructor(message, code) {
        super(message || 'Operation failed', code);
    }
}