import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  uuid: {
    type: String,
    unique: true,
    required: true,
  },
  localId: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  pointOfSale: {
    type: Number,
    required: true,
  },
  cbteTipo: {
    // Tipo de comprobante (AFIP): 1=Factura A, 6=Factura B, etc.
    type: Number,
    required: true,
  },
  docTipo: {
    // Tipo de documento cliente: 80=CUIT, 86=CUIL, etc.
    type: Number,
    required: true,
  },
  docNro: {
    type: String,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  clientEmail: String,
  items: [
    {
      description: String,
      quantity: Number,
      unitPrice: Number,
      subtotal: Number,
    },
  ],
  subtotal: {
    type: Number,
    required: true,
  },
  taxAmount: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    // pending, sent, accepted, rejected
    type: String,
    enum: ['pending', 'sent', 'accepted', 'rejected'],
    default: 'pending',
  },
  cae: String,
  caeExpiration: Date,
  afipResponse: mongoose.Schema.Types.Mixed,
  afipObservations: [String],
  attempts: {
    type: Number,
    default: 0,
  },
  lastAttemptAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('invoices', invoiceSchema);
