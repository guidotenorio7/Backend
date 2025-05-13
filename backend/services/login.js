export async function loginService(credentials){
    if(!credentials
        ||!credentials.username
        ||credentials.password
        || typeof credentials.username != 'string'
        || typeof credentials.password != 'string'
    )
        throw new invalidargumentexceptions();
        
    }
    if(username !== 'admin'){
        return{
            error: ' credenciales invalidas.',
        
    };
}

if(password !== '1234'){
    return{
        error:'credenciales invalidas',
    };
}

return{
    token:'token de acceso'
};
