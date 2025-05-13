export class InvalidCredentialsException extends Error {
    constructor(){
        super('Credenciales invalidas.');
        this.statusCode = 403;
    }
}