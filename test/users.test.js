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
          email: 'erickjaquin@gmail.com',
          password: '12345678',
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);      
        expect(result).toBe('Invalid entries. Try again.');
      });
  });

  it('Será validado que o campo "email" é obrigatório', async () => {
    await frisby
      .post(`${url}/users/`,
        {
          name: 'Erick Jacquin',
          password: '12345678',
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result).toBe('Invalid entries. Try again.');
      });
  });

  it('Será validado que não é possível cadastrar usuário com o campo email inválido', async () => {
    await frisby
      .post(`${url}/users/`,
        {
          name: 'Erick Jacquin',
          email: 'erickjaquin',
          password: '12345678',
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result).toBe('Invalid entries. Try again.');
      });
  });

  it('Será validado que o campo "senha" é obrigatório', async () => {
    await frisby
      .post(`${url}/users/`,
        {
          name: 'Erick Jacquin',
          email: 'erickjaquin',
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result).toBe('Invalid entries. Try again.');
      });
  });

  it('Será validado que o campo "email" é único', async () => {
    await frisby
      .post(`${url}/users/`,
        {
          name: 'Erick Jacquin',
          email: 'erickjaquin@gmail.com',
          password: '12345678',
          role: 'User'
        })
      .expect('status', 201);

    await frisby
      .post(`${url}/users/`,
        {
          name: 'Erick Jacquin',
          email: 'erickjaquin@gmail.com',
          password: '12345678',
          role: 'User'
        })
      .expect('status', 409)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result).toBe('Email already registered');
      });
  });

  it('Será validado que é possível cadastrar usuário com sucesso', async () => {
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
        const result = JSON.parse(body);
        expect(result.user.name).toBe('Erick Jacquin');
        expect(result.user.email).toBe('erickjaquin@gmail.com');
        expect(result.user).not.toHaveProperty('password');
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
        const result = JSON.parse(body);
        expect(result.user.name).toBe('Erick Jacquin');
        expect(result.user.email).toBe('erickjaquin@gmail.com');
        expect(result.user.role).toBe('user');
        expect(result.user).not.toHaveProperty('password');
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
    const users = [
      {
        name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin'
      },
      {
        name: 'Erick Jacquin',
        email: 'erickjacquin@gmail.com',
        password: '12345678',
        role: 'user',
      },
    ]
    await db.collection('users').insertMany(users);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Será validado que o campo "email" é obrigatório', async () => {
    await frisby
      .post(`${url}/login/`,
        {
          password: '12345678',
        })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('All fields must be filled');
      });
  });

  it('Será validado que o campo "password" é obrigatório', async () => {
    await frisby
      .post(`${url}/login/`,
        {
          email: 'erickjaquin@gmail.com',
        })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('All fields must be filled');
      });
  });

  it('Será validado que não é possível fazer login com um email inválido', async () => {
    await frisby
      .post(`${url}/login`,
        {
          email: 'erickjaqu222in@3.com',
          password: '123456782323',
        })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);     
        expect(result.message).toBe('Incorrect user name or password');
      });
  });

  it('Será validado que não é possível fazer login com uma senha inválida', async () => {
    await frisby
      .post(`${url}/login`,
        {
          email: 'erickjacquin@gmail.com',
          password: '1234562323',
        })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);        
        expect(result.message).toBe('Incorrect user name or password');
      });
  });

  it('Será validado que é possível fazer login com sucesso', async () => {
    await frisby
      .post(`${url}/login`,
        {
          email: 'erickjacquin@gmail.com',
          password: '12345678',
        })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);      
        expect(result.token).not.toBeNull();        
      });
  });

})