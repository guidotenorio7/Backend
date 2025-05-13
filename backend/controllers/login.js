import {loginService} from '../services/login.js';

export function login(app){
    app.post(
        '/login',
        async(req, res)=> res.send(result), loginService(req.body)
               
    )
}