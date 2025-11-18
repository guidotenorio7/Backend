import { FacturacionController } from './facturacion.js';

export function facturacion(app) {
  // Crear factura
  app.post('/facturacion', FacturacionController.createInvoice);

  // Obtener estado de una factura
  app.get('/facturacion/:uuid', FacturacionController.getInvoiceStatus);

  // Listar facturas del usuario
  app.get('/facturacion', FacturacionController.listInvoices);
}
