import { addDependency } from './libs/dependencies.js';
import { UserService } from './services/user.js';
import { LoginService } from './services/login.js';
import { FacturacionService } from './services/facturacion.js';
import UserModel from './models/user.js';
import InvoiceModel from './models/invoice.js';
import config from './config.js';

export default function configureDependencies() {
  addDependency('UserService', UserService);
  addDependency('LoginService', LoginService);
  addDependency('UserModel', UserModel);
  addDependency('InvoiceModel', InvoiceModel);
  
  const facturacionService = new FacturacionService({
    cuit: config.AFIP_CUIT,
    certPath: config.AFIP_CERT_PATH,
    keyPath: config.AFIP_KEY_PATH,
    isHomologacion: config.AFIP_ENV !== 'production',
  });
  addDependency('FacturacionService', facturacionService);
}