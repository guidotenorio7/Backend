export function logMiddleware(req, res, next){
    const date = new Date()
    .toISOString()
    .replace('T', ' ')
    .replace('Z', ' ');

    const ip = req.ip;

    const request = req.method + ' ' + req.url;

    const body = JSON.stringify({...req.body});
    if (body.password) {
        body.password = '********';
    }

    const bodyText = JSON.stringify(req.body);

    console.log(`[${date}] ${ip} ${request} ${body}`);

    next();
}
