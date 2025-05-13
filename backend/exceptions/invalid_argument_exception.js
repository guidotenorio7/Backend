export class InvalidArgumentException extends Error {
    constructor(){
        super('Argumentos invalidos.');
        this.statusCode = 400;
    }
}