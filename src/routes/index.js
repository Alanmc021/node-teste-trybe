import { Router } from 'express';
import { getAll } from '../controllers/usuario.controller';

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
export default routes;
