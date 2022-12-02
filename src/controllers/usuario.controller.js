import { todos, criar, deletar, atualizar } from '../services/usuario.services';

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
    // const { email, password, name, role } = req.body;    
    const result = await criar({ req });
    return res.status(201).json({ result });
};

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

export { getAll, login, createUser, deleteUser, updateUser };