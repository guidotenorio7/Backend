export function errorHandlerMiddleware(err, req, res, next){
console.error(err);

res.send({
    error: err.constructor.name,
    message: err.message,
})
}