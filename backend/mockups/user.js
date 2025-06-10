export class UserMockup {

    static user = [
        {
            username: 'admin',
            hashedPassword: '$2b$10$zQclfHEaEclgJ3JpyCfQ6.sc1HcJWBVuMKzNTr6sVxh8e7SOTXRwe',
            name: 'Admin',
            email: 'admin@fake.com',
        },
        {
            username: 'operator',
            hashedPassword: '$2b$10$zQclfHEaEclgJ3JpyCfQ6.sc1HcJWBVuMKzNTr6sVxh8e7SOTXRwe12345',
            name: 'Operador',
            email: 'operator@fake.com',
        },
    ];

    static async getSingleOrNullByUsername(username){
        return this.user.find(u => u.username == username);
    }
}