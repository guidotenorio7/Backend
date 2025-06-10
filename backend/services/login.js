import { InvalidCredentialsException } from '../exceptions/invalid_credentials_exceptions.js'
import { InvalidArgumentException } from '../exceptions/invalid_arguments_exception.js';
import { getDependency } from '../libs/dependencies.js';
import bcrypt from 'bcrypt';
import config from '../config.js';

export class LoginService{
    static async login(credentials){
    if(!credentials
        ||!credentials.username
        ||!credentials.password
        || typeof credentials.username != 'string'
        || typeof credentials.password != 'string'
    ){
    throw new InvalidArgumentException();
    }

    const UserService = getDependency('UserService');
    const user = await UserService.getSingleOrNullByUsername(credentials.username);
    if (!user)
        throw new InvalidCredentialsException();

    /*
    console.log ('Calculando hash');
    const hash = bcrypt.hashSync('1234', 10);
    console.log(hash);
    console.log('Hash calculado');
    */

    if(!(await bcrypt.compare(credentials.password, user.hashedPassword))) 
        throw new InvalidCredentialsException();
    
    const jtw = config.jwtKey;(
        {
            userId: user.id,
            username: user.username,
            fullName: user.fullName,
        }
    )

    return{
    token:'Token de acceso'
    };
}
}
