import { getDependency } from '../libs/dependencies.js';
import { InvalidArgumentException } from '../exceptions/invalid_arguments_exception.js';

export class FacturacionController {
  static async createInvoice(req, res) {
    try {
      // Extraer usuario del JWT (del middleware de autenticación)
      const userId = req.user?.userId;
      const username = req.user?.username;

      if (!userId || !username) {
        return res.status(401).json({ error: 'No autorizado' });
      }

      const invoiceData = {
        ...req.body,
        createdBy: username,
      };

      const FacturacionService = getDependency('FacturacionService');
      const result = await FacturacionService.createInvoice(invoiceData);

      return res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error('FacturacionController.createInvoice:', error);
      return res.status(error.statusCode || 400).json({
        error: error.message,
      });
    }
  }

  static async getInvoiceStatus(req, res) {
    try {
      const { uuid } = req.params;
      if (!uuid) {
        return res.status(400).json({ error: 'UUID requerido' });
      }

      const FacturacionService = getDependency('FacturacionService');
      const result = await FacturacionService.getInvoiceStatus(uuid);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error('FacturacionController.getInvoiceStatus:', error);
      return res.status(error.statusCode || 400).json({
        error: error.message,
      });
    }
  }

  static async listInvoices(req, res) {
    try {
      const username = req.user?.username;
      if (!username) {
        return res.status(401).json({ error: 'No autorizado' });
      }

      const { status } = req.query;
      const filters = {};
      if (status) {
        filters.status = status;
      }

      const FacturacionService = getDependency('FacturacionService');
      const invoices = await FacturacionService.listInvoices(username, filters);

      return res.status(200).json({
        success: true,
        data: invoices,
      });
    } catch (error) {
      console.error('FacturacionController.listInvoices:', error);
      return res.status(error.statusCode || 400).json({
        error: error.message,
      });
    }
  }
}
