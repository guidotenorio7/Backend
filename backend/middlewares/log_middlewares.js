export function logmiddleware(req,res,next){
    const date = (new date())
    .toISOString()
    .replace(/T/,'');
    

    console.log(`[${date}]${req.ip}${req.method}${req.url}`);
}