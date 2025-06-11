export class ForbiddenException extends Error {
  constructor() {
    super('Acceso prohibido.');
    this.name = 'ForbiddenException';
    this.statusCode = 401;
  }
}