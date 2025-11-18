import { getDependency } from '../libs/dependencies.js';
import crypto from 'crypto';
import { InvalidArgumentException } from '../exceptions/invalid_arguments_exception.js';

/**
 * FacturacionService
 * Gestiona la integración con AFIP (WSAA y WSFE)
 * Para usar en producción, completa con el cliente SOAP real
 */
export class FacturacionService {
  constructor(config = {}) {
    this.cuit = config.cuit || process.env.AFIP_CUIT;
    this.certPath = config.certPath || process.env.AFIP_CERT_PATH;
    this.keyPath = config.keyPath || process.env.AFIP_KEY_PATH;
    this.isHomologacion = config.isHomologacion !== false; // Homologación por defecto
    this.ta = null; // Token de autorización WSAA
    this.taExpiration = null;
  }

  /**
   * Autentica contra WSAA (paso 1)
   * Obtiene un TA (token + sign) para usar en WSFE
   * En producción, implementa con node-soap o librería AFIP
   */
  async authenticate() {
    console.log('FacturacionService: Authenticating with WSAA...');

    if (this.ta && this.taExpiration && Date.now() < this.taExpiration) {
      console.log('FacturacionService: Using cached TA');
      return this.ta;
    }

    // TODO: Implementar autenticación real con WSAA
    // Pasos:
    // 1. Leer certificado y clave privada
    // 2. Crear CMS firmado con OpenSSL
    // 3. Enviar a WSAA (https://wsaa.afip.gov.ar/ws/services/LoginCms o homologación)
    // 4. Parsear respuesta y extraer token + sign
    // 5. Guardar TA y expiración

    // Simulación para desarrollo:
    this.ta = {
      token: 'mock-token-' + crypto.randomBytes(16).toString('hex'),
      sign: 'mock-sign-' + crypto.randomBytes(16).toString('hex'),
    };
    this.taExpiration = Date.now() + 12 * 60 * 60 * 1000; // 12 horas

    console.log('FacturacionService: TA obtained (mock for development)');
    return this.ta;
  }

  /**
   * Crea una factura en AFIP (paso 2)
   * Valida y persiste localmente, luego envía a WSFE
   */
  async createInvoice(invoiceData) {
    console.log('FacturacionService: Creating invoice...');

    // Validar entrada
    if (!invoiceData.pointOfSale || !invoiceData.cbteTipo || !invoiceData.docNro) {
      throw new InvalidArgumentException(
        'Faltan campos requeridos: pointOfSale, cbteTipo, docNro'
      );
    }

    if (!invoiceData.items || invoiceData.items.length === 0) {
      throw new InvalidArgumentException('La factura debe contener al menos un item');
    }

    const InvoiceModel = getDependency('InvoiceModel');
    const UserService = getDependency('UserService');

    // Obtener usuario actual (desde token en contexto, aquí simulado)
    const currentUsername = invoiceData.createdBy || 'admin';
    const user = await UserService.getSingleOrNullByUsername(currentUsername);
    if (!user) {
      throw new InvalidArgumentException('Usuario no encontrado');
    }

    // Calcular totales
    const subtotal = invoiceData.items.reduce(
      (sum, item) => sum + (item.quantity * item.unitPrice),
      0
    );
    const taxAmount = invoiceData.taxAmount || 0;
    const total = subtotal + taxAmount;

    // Crear documento local
    const newInvoice = new InvoiceModel({
      uuid: crypto.randomUUID(),
      localId: await this._getNextLocalId(invoiceData.pointOfSale),
      createdBy: currentUsername,
      pointOfSale: invoiceData.pointOfSale,
      cbteTipo: invoiceData.cbteTipo,
      docTipo: invoiceData.docTipo,
      docNro: invoiceData.docNro,
      clientName: invoiceData.clientName,
      clientEmail: invoiceData.clientEmail,
      items: invoiceData.items,
      subtotal,
      taxAmount,
      total,
      status: 'pending',
    });

    await newInvoice.save();
    console.log('FacturacionService: Invoice saved locally with uuid:', newInvoice.uuid);

    // Enviar a AFIP (async, puedes usar una cola/job)
    this._sendToAFIP(newInvoice).catch((err) => {
      console.error('FacturacionService: Error sending to AFIP:', err);
    });

    return {
      uuid: newInvoice.uuid,
      localId: newInvoice.localId,
      status: newInvoice.status,
      total: newInvoice.total,
    };
  }

  /**
   * Envía la factura a WSFE (step 3)
   * Se ejecuta asincronamente
   */
  async _sendToAFIP(invoice) {
    try {
      await this.authenticate();

      console.log(`FacturacionService: Sending invoice ${invoice.uuid} to AFIP...`);

      // TODO: Implementar llamada a WSFE
      // Pasos:
      // 1. Construir FECAEReq
      // 2. Enviar a FECAESolicitar (WSFE)
      // 3. Parsear respuesta
      // 4. Guardar CAE y estado

      // Simulación para desarrollo:
      const mockCAE = '123456789012';
      const mockExpiration = new Date();
      mockExpiration.setDate(mockExpiration.getDate() + 14);

      invoice.cae = mockCAE;
      invoice.caeExpiration = mockExpiration;
      invoice.status = 'accepted';
      invoice.afipResponse = {
        FeCabResp: { Resultado: 'A' },
        FeDetResp: [{ Concepto: 1, DocTipo: invoice.docTipo, DocNro: invoice.docNro }],
      };
      invoice.attempts = 1;
      invoice.lastAttemptAt = new Date();
      invoice.updatedAt = new Date();

      await invoice.save();
      console.log(
        `FacturacionService: Invoice ${invoice.uuid} accepted. CAE: ${mockCAE}`
      );
    } catch (error) {
      console.error(`FacturacionService: Error sending invoice ${invoice.uuid}:`, error);
      invoice.status = 'rejected';
      invoice.attempts = (invoice.attempts || 0) + 1;
      invoice.lastAttemptAt = new Date();
      invoice.afipObservations.push(error.message);
      invoice.updatedAt = new Date();
      await invoice.save();
    }
  }

  /**
   * Obtiene el siguiente localId para una caja (pointOfSale)
   */
  async _getNextLocalId(pointOfSale) {
    const InvoiceModel = getDependency('InvoiceModel');
    const lastInvoice = await InvoiceModel.findOne({
      pointOfSale,
    }).sort({ localId: -1 });

    return (lastInvoice?.localId || 0) + 1;
  }

  /**
   * Consulta el estado de una factura
   */
  async getInvoiceStatus(uuid) {
    const InvoiceModel = getDependency('InvoiceModel');
    const invoice = await InvoiceModel.findOne({ uuid });

    if (!invoice) {
      throw new InvalidArgumentException('Factura no encontrada');
    }

    return {
      uuid: invoice.uuid,
      localId: invoice.localId,
      status: invoice.status,
      cae: invoice.cae,
      caeExpiration: invoice.caeExpiration,
      total: invoice.total,
      attempts: invoice.attempts,
      lastAttemptAt: invoice.lastAttemptAt,
      observations: invoice.afipObservations,
    };
  }

  /**
   * Lista todas las facturas de un usuario
   */
  async listInvoices(createdBy, filters = {}) {
    const InvoiceModel = getDependency('InvoiceModel');
    const query = { createdBy, ...filters };
    return await InvoiceModel.find(query).sort({ createdAt: -1 });
  }
}
