import { Router } from 'express';
import { getAll, createUser, deleteUser, updateUser } from '../controllers/usuario.controller';

const routes = new Router();

// routes.get('/', (_req, res) => {
//     res.status(200).json({ ok: 'okkk' });
// });
// Não remover esse end-point, ele é necessário para o avaliador
routes.get('/', (request, response) => {
    response.send('teste');
});
// Não remover esse end-point, ele é necessário para o avaliador
routes.get('/usuarios', getAll);

routes.post('/criarUsuario', createUser);

routes.delete('/usuario/:id', deleteUser);

routes.put('/usuario/:id', updateUser);
export default routes;
