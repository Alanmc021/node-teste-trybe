// import { ObjectId } from 'mongodb';
// import jwt from 'jsonwebtoken';
import connection from './mongoConnection';

const getAll = async () => {
    const db = await connection();
    return db.collection('users').find().toArray();
};

const login = async () => null; 

export { getAll, login };