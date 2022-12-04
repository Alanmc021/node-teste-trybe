import { Router } from 'express';
import VerififyToken from '../middleware/usuarios.middleware';
import { createUser, deleteUser, updateUser } from '../controllers/usuario.controller';
import {
    createRecipe,
    getAll,
    getById,
    deleteRecipe,
    updateRecipe,
    uploadImage,
    getImageById,
} from '../controllers/recipes.controller';
import { requestLogin } from '../models/usuario.model';
// import single from '../middleware/uploadImage';

const routes = new Router();

const express = require('express');

const path = require('path');

const upload = require('../middleware/uploadImage');

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
routes.put('/recipes/:id', VerififyToken, updateRecipe);

// receita imagens 
routes.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
// routes.put('/recipes/:id/image', VerififyToken, single('image'), uploadImage);
routes.put('/recipes/:id/image', upload.single('image'), uploadImage);

routes.get('/recipesImage/:id', getImageById);

export default routes;
