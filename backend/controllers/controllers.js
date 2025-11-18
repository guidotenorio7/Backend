import { login } from './login.js';
import { user } from './user.js';
import { facturacion } from './facturacion_routes.js';

export function controllers(app) {
  login(app);
  user(app);
  facturacion(app);
}