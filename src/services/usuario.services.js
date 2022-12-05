import { getAll, newUser, userExists, deleta, update } from '../models/usuario.model';
import { validationUser } from './schema.yup';

const todos = async () => {
    const users = await getAll();
    return users;
};

const criar = async ({ req }) => {
    const { email, password, name, role } = req.body;
    const usuario = await userExists({ email });
    if (usuario) return 'Email is already registered';

    const schema = validationUser;

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
const adminCreate = async ({ req, role }) => {
    const { email, password, name, id } = req.body;

    const usuario = await userExists({ email });
    if (usuario) return { erro: 'Email already exists', statusCode: 403 };

    if (role === 'admin') {
        await newUser({ email, password, name, role });
        return { id, email, password, name, role };
    }
    return { erro: 'Only admins can register new admins', statusCode: 201 };
};

export {
    todos,
    criar,
    deletar,
    atualizar,
    adminCreate,
};