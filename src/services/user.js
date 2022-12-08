import { newUser, userExists, confirmeUserAndPassword } from '../models/user';
import { validationUser, validationLogin } from './schema.yup';

const create = async ({ req }) => {
    const { name, email, password, role } = req.body;
    const userConfirm = await userExists({ email });
    if (userConfirm) return ({ erro: 409, message: 'Email already registered' });

    const schema = validationUser;

    try {
        await schema.validate(req.body);
    } catch (err) {
        return ({ erro: 400, message: 'Invalid entries. Try again.' });
    }

    const user = await newUser({ name, email, password, role });

    return { user };
};

const login = async ({ req }) => {
    const { email, password } = req.body;

    const schema = validationLogin;

    try {
        await schema.validate(req.body);
    } catch (err) {
        return { erro: 402, message: 'All fields must be filled' };
    }

    const userExist = await confirmeUserAndPassword(email, password);
    if (userExist.erro === 401) return (userExist);
    if (userExist.erro === 200) return (userExist);  

    return userExist;
};

export {
    create,
    login,
};