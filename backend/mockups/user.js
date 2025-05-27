export class UserMockup {

    static user = [
        {
            username: 'admin',
            password: '1234',
            name: 'Admin',
            email: 'admin@fake.com',
        },
        {
            username: 'operator',
            password: '12345',
            name: 'operador',
            email: 'operator@fake.com',
        },
    ];

    static async getSingleOrNullByUsername(username){
        return this.user.find(u => u.username == username);
    }
}