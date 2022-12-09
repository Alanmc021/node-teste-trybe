import { Router } from 'express';
import path from 'path';
import upload from '../middleware/uploadImage';
import VerififyToken from '../middleware/usuarios.middleware';
import {
    createUser,
    deleteUser,
    updateUser,
    createAdmin,
} from '../controllers/usuario.controller';
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

const routes = new Router();

const express = require('express');

routes.post('/login', requestLogin);
routes.post('/users', createUser);
routes.delete('/usuario/:id', deleteUser);
routes.put('/usuario/:id', updateUser);
routes.post('/recipes', VerififyToken, createRecipe);
routes.get('/recipes', getAll);
routes.get('/recipes/:id', getById);
routes.delete('/recipes/:id', VerififyToken, deleteRecipe);
routes.put('/recipes/:id', VerififyToken, updateRecipe);
routes.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
routes.put('/recipes/:id/image', VerififyToken, upload.single('image'), uploadImage);

routes.get('/recipesImage/:id', getImageById);

routes.post('/users/admin', VerififyToken, createAdmin);

// Não remover esse end-point, ele é necessário para o avaliador
routes.get('/', (request, response) => {
    response.send('');
});
// Não remover esse end-point, ele é necessário para o avaliador

export default routes;
