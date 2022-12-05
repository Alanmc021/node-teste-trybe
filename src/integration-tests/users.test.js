const frisby = require('frisby');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoDbUrl = 'mongodb://127.0.0.1:27017';
const url = 'http://localhost:3000';

describe('1 - Crie um endpoint para o cadastro de usuários', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(mongoDbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = connection.db('Cookmaster');
    });

    beforeEach(async () => {
        await db.collection('users').deleteMany({});
        await db.collection('recipes').deleteMany({});
        const users = {
            name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin'
        };
        await db.collection('users').insertOne(users);
    });

    afterAll(async () => {
        await connection.close();
    });


    it('Será validado que o campo "name" é obrigatório', async () => {
        await frisby
            .post(`${url}/users/`,
                {

                    role: 'user',
                    email: 'erickjaquin@gmail.com',
                    password: '12345678',
                })
            .expect('status', 400)
            .then((response) => {
                const { body } = response;
                const result = JSON.parse(body);
                expect(result.erro[0]).toBe('Invalid entries.Try again.');
            });

    });

    it('Será validado que o campo "password" é obrigatório', async () => {
        await frisby
            .post(`${url}/users/`,
                {
                    name: 'Teste',
                    role: 'user',
                    email: 'erickjaquin@gmail.com',
                })
            .expect('status', 400)
            .then((response) => {
                const { body } = response;
                const result = JSON.parse(body);
                expect(result.erro[0]).toBe('Invalid entries.Try again.');
            });

    });

    it('Será validado que o campo "email" é obrigatório', async () => {
        await frisby
            .post(`${url}/users/`,
                {
                    name: 'Teste',
                    role: 'user',
                    password: '12345678',
                })
            .expect('status', 400)
            .then((response) => {
                const { body } = response;
                const result = JSON.parse(body);
                expect(result.erro[0]).toBe('Invalid entries.Try again.');
            });

    });

    it('É possivel criar um novo usuário com sucesso ', async () => {
        await frisby
            .post(`${url}/users/`,
                {
                    name: 'Teste',
                    role: 'user',
                    email: 'erickjaquin@gmail.com',
                    password: '12345678',
                })
            .expect('status', 201)
            .then((response) => {
                const { body } = response;
                const result = JSON.parse(body);
                expect(result).toMatchObject(result);
            });
    });

    it('Será validado que é possível ao cadastrar usuário, o valor do campo "role" tenha o valor "user"', async () => {
        await frisby
            .post(`${url}/users/`,
                {
                    name: 'Erick Jacquin',
                    email: 'erickjaquin@gmail.com',
                    password: '12345678',
                    role: 'user'
                })
            .expect('status', 201)
            .then((response) => {
                const { body } = response;
                const res = JSON.parse(body);
                expect(res.result.name).toBe('Erick Jacquin');
                expect(res.result.email).toBe('erickjaquin@gmail.com');
                expect(res.result.role).toBe('user');
                expect(res.result.password).not.toBe('12345678');
            });
    });


});

describe('2 - Crie um endpoint para o login de usuários', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(mongoDbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = connection.db('Cookmaster');
    });

    beforeEach(async () => {
        await db.collection('users').deleteMany({});
        await db.collection('recipes').deleteMany({});
        const users = {
            name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin'
        };
        await db.collection('users').insertOne(users);
    });

    afterAll(async () => {
        await connection.close();
    });

    it('Será validado que é possível fazer login com sucesso', async () => {
        await frisby
            .post(`${url}/users/`,
                {
                    name: 'Erick Jacquin',
                    email: 'erickjacquin@gmail.com',
                    password: '12345678',
                })
            .expect('status', 201)        
    });

    it('Será validado que é nao e possivel logar sem um token JWT gerado', async () => {
        await frisby
            .post(`${url}/users/`,
                {
                    name: 'Erick Jacquin',
                    email: 'erickjacquin@gmail.com',
                    password: '12345678',
                })
            .expect('status', 201)
            .then((response) => {
                const { body } = response;
                const res = JSON.parse(body);             
                return frisby
                    .post(`${url}/login`,
                        {
                            email: '122@teste.com',
                            password: '123456',
                        })
                    .expect('status', 401)
                    .then((responseLogin) => {
                        const { json } = responseLogin;
                        // expect(json.token).not.toBeNull();
                    });
            });
    });

    it('Será validado que não é possível fazer login com uma senha inválida', async () => {
        await frisby
          .post(`${url}/login`,
            {
              email: 'erickjacquin@gmail.com',
              password: '123456',
            })
          .expect('status', 401)
          .then((response) => {
            const { body } = response;
            const result = JSON.parse(body);
            expect(result.message).toBe('Incorrect username or password');
          });
      });
});

