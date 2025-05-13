export class InvalidCredentialsException extends Error {
    constructor(){
        super('Argumentos invalidos.');
        this.statusCode = 403;
    }
}