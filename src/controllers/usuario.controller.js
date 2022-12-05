import { todos, criar, deletar, atualizar, adminCreate } from '../services/usuario.services';

const rescue = require('express-rescue');

const getAll = async (req, res) => {
    const users = await todos();

    const id = '_id';

    const newList = users.map((user) => (
        {
            email: user.email,
            _id: user[`${id}`],
            name: user.name,
            role: user.role,
            password: user.password,

        }
    ));

    return res.status(200).json(newList);
};

const createUser = async (req, res) => {
    const result = await criar({ req });
    if (result.erro === true) return res.status(400).json({ erro: result.mensagem });
    return res.status(201).json({ result });
};

const createAdmin = rescue(async (req, res) => {
    const { id } = req.params;
    const { userId, role } = req;
    const result = await adminCreate({ id, req, userId, role });
    if (result === 'Email') res.status(403).json({ res: 'Email already exists' });
    if (result === false) res.status(403).json({ res: 'Only admins can register new admins' });
    if (result === true) res.status(201).json({ res: 'adm criando' });
});

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await deletar({ id });
    return res.status(200).json(user);
};

const updateUser = async (req, res) => {
    const { email, senha } = req.body;
    const { id } = req.params;
    const user = await atualizar({ id, email, senha });
    res.status(200).json(user);
};

const login = async () => null;

export {
    getAll,
    login,
    createUser,
    deleteUser,
    updateUser,
    createAdmin,
};