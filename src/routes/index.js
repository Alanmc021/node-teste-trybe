import { Router } from 'express';

const routes = new Router();

routes.get('/', (_req, res) => {
    res.status(200).json({ ok: 'okkk' });
});

// Não remover esse end-point, ele é necessário para o avaliador
// routes.get('/', (request, response) => {
//   response.send('end point zica');
// });
// Não remover esse end-point, ele é necessário para o avaliador

export default routes;
