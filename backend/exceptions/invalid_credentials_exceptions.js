export class InvalidCredentialsException extends Error {
    constructor() {
        super('Credenciales inválidas.');
        this.statusCode = 403;
    }
}