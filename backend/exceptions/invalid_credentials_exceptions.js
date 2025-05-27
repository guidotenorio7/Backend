export class InvalidCredentialsException extends Error {
    constructor() {
        super('Credenciales inválidas.');
        this.name = 'InvalidCredentialsException';
        this.statusCode = 403;
    }
}