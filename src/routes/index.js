import { Router } from 'express';
import VerififyToken from '../middleware/usuarios.middleware';
import { getAll, createUser, deleteUser, updateUser } from '../controllers/usuario.controller';
import { requestLogin } from '../models/usuario.model';

const routes = new Router();

// routes.get('/', (_req, res) => {
//     res.status(200).json({ ok: 'okkk' });
// });
// Não remover esse end-point, ele é necessário para o avaliador
routes.get('/', (request, response) => {
    response.send('teste');
});
// Não remover esse end-point, ele é necessário para o avaliador

routes.get('/login', requestLogin);

routes.get('/usuarios', VerififyToken, getAll);

routes.post('/criarUsuario', VerififyToken, createUser);

routes.delete('/usuario/:id', VerififyToken, deleteUser);

routes.put('/usuario/:id', VerififyToken, updateUser);

export default routes;
