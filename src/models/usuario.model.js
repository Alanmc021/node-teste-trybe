/* eslint-disable keyword-spacing */
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import connection from './mongoConnection';
import validation from './schema.yup';

const SECRET = 'paranguaricutirimiruarum';

const getAll = async () => {
    const db = await connection();
    return db.collection('users').find().toArray();
};

const newUser = async ({ email, password, name, role }) => {
    const db = await connection();
    const user = await db.collection('users').insertOne({ email, password, name, role });
    const { insertedId: _id } = user;
    return { email, _id };
};

const userExists = async ({ email, id }) => {
    const db = await connection();
    let user = null;
    if (id) {
        user = await db.collection('users').findOne({ _id: ObjectId(id) });
    } else {
        user = await db.collection('users').findOne({ email });
    }
    return user;
};

const deleta = async ({ id }) => {
    const db = await connection();
    await db.collection('users').deleteOne({ _id: ObjectId(id) });
    return { id };
};

const update = async ({ id, email, senha }) => {
    const db = await connection();
    await db.collection('users').updateOne({ _id: ObjectId(id) }, { $set: { email, senha } });
    return { id, email };
};

const login = async ({ email, password }) => {
    const db = await connection();
    const user = await db.collection('users').findOne({ email, password });
    return user;
};

// eslint-disable-next-line max-lines-per-function
const requestLogin = async (req, res) => {
    const { email, password } = req.body;

    const schema = validation;

    try{
        await schema.validate(req.body);
      // eslint-disable-next-line space-before-blocks
      }catch (err){
        return res.status(400).json({
          erro: true,
          mensagem: err.errors,
        });
      }

    const usuario = await login({ email, password });

    if (!usuario) return res.status(401).json({ message: 'Incorrect username or password' });

    const { _id } = usuario;

    const newToken = jwt.sign(
        {
            userId: _id,
            email,
        },
        SECRET,
        {
            expiresIn: 1440,
        },
    );

    return res.status(201).json({ token: newToken });
};

export { getAll, newUser, login, userExists, deleta, update, requestLogin };