# Facturador AFIP - Documentación

## Descripción

El facturador está integrado en tu API y permite crear, gestionar y consultar facturas sincronizadas con AFIP sin necesidad de acceder manualmente a la plataforma de AFIP.

## Requisitos

1. **CUIT de la empresa** - Necesario para identificar el emisor ante AFIP.
2. **Certificado y clave privada** - Obtenidos de https://www.afip.gob.ar/ws/
   - Descargar certificado (CRT)
   - Descargar clave privada (PEM)
3. **Variables de entorno** - Configuradas en `.env` (ver `.env.example`)

## Configuración

### 1. Obtenér certificados de AFIP

- Ve a: https://www.afip.gob.ar/ws/
- Descarga el certificado (`.crt`) y la clave privada (`.pem`)
- Colócalos en una carpeta segura (por ejemplo `./certs/`)
- **No commits** estos archivos al repositorio

### 2. Variables de entorno

Copia `.env.example` a `.env.local` y completa:

```javascript
AFIP_CUIT=20123456789
AFIP_CERT_PATH=./certs/certificado.crt
AFIP_KEY_PATH=./certs/clave_privada.pem
AFIP_ENV=homologacion  // o 'production'
JWT_KEY=tu-clave-secreta
```

### 3. Implementación de WSAA/WSFE

El servicio actualmente incluye:
- **Mock para desarrollo** - Simula respuestas AFIP
- **Estructura lista** - Para integrar cliente SOAP real

Para producción, implementa:

```javascript
// En facturacion.js, método authenticate()
// Usa: npm install node-soap
// O: npm install afip (librería específica)

// Pasos:
// 1. Leer certificado/clave
// 2. Firmar con OpenSSL/crypto
// 3. Enviar a WSAA
// 4. Obtener token (TA)
// 5. Guardar y reutilizar
```

## Endpoints

### 1. Crear Factura

**POST** `/api/facturacion`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Body:**
```json
{
  "pointOfSale": 0001,
  "cbteTipo": 1,
  "docTipo": 80,
  "docNro": "20123456789",
  "clientName": "Cliente Ejemplo",
  "clientEmail": "cliente@example.com",
  "items": [
    {
      "description": "Producto 1",
      "quantity": 2,
      "unitPrice": 100
    },
    {
      "description": "Producto 2",
      "quantity": 1,
      "unitPrice": 50
    }
  ],
  "taxAmount": 25.5
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "uuid": "abc-123-def",
    "localId": 1,
    "status": "pending",
    "total": 275.5
  }
}
```

### 2. Obtener Estado de Factura

**GET** `/api/facturacion/:uuid`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "uuid": "abc-123-def",
    "localId": 1,
    "status": "accepted",
    "cae": "123456789012",
    "caeExpiration": "2025-01-30T00:00:00Z",
    "total": 275.5,
    "attempts": 1,
    "lastAttemptAt": "2025-06-16T10:30:00Z"
  }
}
```

### 3. Listar Facturas del Usuario

**GET** `/api/facturacion?status=accepted`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Query Params:**
- `status` (opcional): pending, sent, accepted, rejected

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "uuid": "abc-123-def",
      "localId": 1,
      "status": "accepted",
      "total": 275.5,
      "createdAt": "2025-06-16T10:30:00Z"
    }
  ]
}
```

## Estados de Factura

- **pending** - Guardada localmente, aguardando envío a AFIP
- **sent** - Enviada a AFIP, aguardando respuesta
- **accepted** - Aceptada por AFIP (CAE asignado)
- **rejected** - Rechazada por AFIP

## Tipos de Comprobante (cbteTipo)

- `1` - Factura A (responsables inscriptos)
- `6` - Factura B (consumidores finales)
- `3` - Nota de Débito A
- `8` - Nota de Débito B
- Etc. (consulta catalogos AFIP)

## Tipos de Documento (docTipo)

- `80` - CUIT
- `86` - CUIL
- `89` - CDI
- Etc. (consulta catalogos AFIP)

## Reintentos

Si AFIP rechaza una factura, el sistema automáticamente reintentará:
- Cada 5 minutos (configurable)
- Máx 3 intentos (configurable)
- Los detalles del error se guardan en `afipObservations`

## Testing en Homologación

1. Usa `AFIP_ENV=homologacion` en `.env.local`
2. Usa certificados de homologación
3. Prueba el flujo completo
4. Verifica CAEs en https://www.afip.gob.ar/ws/

## Producción

1. Cambia `AFIP_ENV=production`
2. Usa certificados de producción (descargados en homologación exitosa)
3. Implementa reintentos con Batchs/Cola
4. Monitorea logs y errores
5. Backup diario de facturas emitidas

## Troubleshooting

| Error | Causa | Solución |
|-------|-------|----------|
| "Certificado no válido" | Cert/Key incorrectos | Verifica rutas en .env y que existan los archivos |
| "Token WSAA expirado" | TA no renovado | El sistema lo renueva automáticamente cada 12h |
| "Factura duplicada" | localId repetido | Sistema lo previene; verifica estado en BD |
| "Documento cliente inválido" | docNro mal formateado | Valida formato CUIT/CUIL |

## Próximos Pasos

1. Implementa autenticación real con WSAA (node-soap o librería AFIP)
2. Agrega cola de reintentos (Bull + Redis)
3. Tests end-to-end en homologación
4. Descarga/visualización de comprobantes (PDF)
5. Webhooks para notificaciones de estado

---

Para dudas sobre AFIP, ver: https://www.afip.gob.ar/ws/
