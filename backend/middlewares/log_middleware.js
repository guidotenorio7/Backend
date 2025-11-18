export function logMiddleware(req, res, next){
  const date = new Date()
    .toISOString()
    .replace('T', ' ')
    .replace('Z', ' ');

  const ip = req.ip;
  const request = req.method + ' ' + (req.originalUrl || req.url);

  // Clonar el body para no mutar req.body y enmascarar password si existe
  const safeBody = (req.body && typeof req.body === 'object') ? { ...req.body } : req.body;
  if (safeBody && typeof safeBody === 'object' && 'password' in safeBody) {
    safeBody.password = '********';
  }

  let bodyText;
  try {
    bodyText = JSON.stringify(safeBody);
  } catch (e) {
    bodyText = '[unserializable body]';
  }

  // Enmascarar Authorization header si existe
  const safeHeaders = { ...req.headers };
  if (safeHeaders.authorization) {
    const parts = String(safeHeaders.authorization).split(' ');
    safeHeaders.authorization = parts[0] + ' ****';
  }

  console.log(`[${date}] ${ip} ${request} headers=${JSON.stringify(safeHeaders)} body=${bodyText}`);

  next();
}
