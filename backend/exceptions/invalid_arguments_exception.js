export class invalidArgumentException extends Error {
    constructor() {
        super('Argumentos invalidos.');
        this.statusCode = 400;
    }
}