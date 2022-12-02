import { getAll, newUser, userExists, deleta, update } from '../models/usuario.model';
import validation from './schema.yup';

// const yup = require('yup');

const todos = async () => {
    const users = await getAll();
    return users;
};

const criar = async ({ req }) => {
    const { email, password, name, role } = req.body;

    const usuario = await userExists({ email });

    if (usuario) return 'Invalid entries. Try again.';

    const schema = validation;   

    try {
        await schema.validate(req.body);
    } catch (err) {
        return ({
            erro: true,
            mensagem: err.errors,
        });
    }

    const user = await newUser({ email, password, name, role });

    return user;
};

const deletar = async ({ id }) => {
    const usuario = await userExists({ id });

    if (!usuario) return { message: 'User not found' };
    const user = await deleta({ id });
    return user;
};

const atualizar = async ({ id, email, senha }) => {
    const usuario = await userExists({ id });
    if (!usuario) return { message: 'User not found' };

    const user = await update({ id, email, senha });
    return user;
};

const login = async () => null;

export { todos, login, criar, deletar, atualizar };