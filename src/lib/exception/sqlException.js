import { Exception } from './exception';

export class SqlException extends Exception {
    constructor(message) {
        super(message || 'Database Error');
    }
}