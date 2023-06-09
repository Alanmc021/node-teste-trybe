/* eslint-disable keyword-spacing */
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import connection from './mongoConnection';
import validation from './schema.yup';

const SECRET = 'hdHJHJDJ893399HYHHLll232344';

const confirmeUserAndPassword = async (email, password) => {
    const db = await connection();
    const user = await db.collection('users').findOne({ email, password });
    if (!user) return ({ erro: 401, message: 'Incorrect user name or password' });
    const { _id, role } = user;  
    const newToken = jwt.sign({ userId: _id, email, role }, SECRET, { expiresIn: 1440 });
    return ({ token: newToken });
};

const newUser = async ({ name, email, password, role }) => {
    const db = await connection();
    const user = await db.collection('users').insertOne({ email, password, name, role });
    const { insertedId: _id } = user;
    return { email, _id, name, role };
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

const login = async (email, password) => {
    const db = await connection();
    const user = await db.collection('users').findOne({ email, password });
    if (!user) return ({ erro: 400, message: 'Invalid entries. Try again.' });
    return user;
};

const requestLogin = async (req, res) => {
    const { email, password } = req.body;
    const schema = validation;

    try {
        await schema.validate(req.body);
    } catch (err) {
        return res.status(401).json({ mensagem: err.errors });
    }
    const usuario = await login({ email, password });

    if (!usuario) return res.status(401).json({ message: 'Incorrect user name or password' });
    const { _id, role } = usuario;

    const newToken = jwt.sign({ userId: _id, email, role }, SECRET, { expiresIn: 1440 });
    return res.status(200).json({ token: newToken });
};

export { newUser, login, userExists, deleta, update, requestLogin, confirmeUserAndPassword };