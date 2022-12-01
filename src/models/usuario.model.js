// import { ObjectId } from 'mongodb';
// import jwt from 'jsonwebtoken';
// import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'mongodb';
import connection from './mongoConnection';

const getAll = async () => {
    const db = await connection();
    return db.collection('users').find().toArray();
};

const newUser = async ({ email, senha }) => {
    const db = await connection();
    const user = await db.collection('users').insertOne({ email, senha });
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

const login = async () => null;

export { getAll, newUser, login, userExists, deleta, update };