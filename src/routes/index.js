import { Router } from 'express';
import VerififyToken from '../middleware/usuarios.middleware';
import { createUser, deleteUser, updateUser } from '../controllers/usuario.controller';
import { createRecipe, getAll, getById, deleteRecipe } from '../controllers/recipes.controller';
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
// routes.get('/usuarios', getAll);
routes.post('/criarUsuario', createUser);
routes.delete('/usuario/:id', deleteUser);
routes.put('/usuario/:id', updateUser);

// receitas
routes.post('/recipes', VerififyToken, createRecipe);
routes.get('/recipes', getAll);
routes.get('/recipes/:id', getById);
routes.delete('/recipes/:id', VerififyToken, deleteRecipe);

export default routes;
