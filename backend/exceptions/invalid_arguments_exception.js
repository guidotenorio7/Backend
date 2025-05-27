export class InvalidArgumentException extends Error {
    constructor() {
        super('Argumentos inválidos.');
        this.name = 'InvalidArgumentException';
        this.statusCode = 400;
    }
}