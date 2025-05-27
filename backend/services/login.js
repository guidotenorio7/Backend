import { InvalidCredentialsException } from '../exceptions/invalid_credentials_exceptions.js'
import { InvalidArgumentException } from '../exceptions/invalid_arguments_exception.js';
import { UserService } from './user.js';
import { getDependency } from '../libs/dependencies.js';

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

    /*if(credentials.username !== 'admin'){
       throw new InvalidCredentialsException();
    }*/

    if(credentials.password !== user.password){
    throw new InvalidCredentialsException();
    }

    return{
    token:'Token de acceso'
    };
}
}
