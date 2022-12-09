// import upload from '../middleware/uploadImage';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// const { join } = require('path');

// const errorMiddleware = require('../middlewares/error');
const userControllers = require('../controllers/user');
const recipeControllers = require('../controllers/recipe');
const verififyToken = require('../middleware/user.middleware');
const upload = require('../middleware/uploadImage');
// const recipeControllers = require('../controllers/recipes');
// const validateJWT = require('./auth/validateJWT');
// const uploadImg = require('../middlewares/uploadImg');

const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send('teste');
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', userControllers.createUser);
app.post('/login', userControllers.loginUser);
app.post('/recipes', verififyToken, recipeControllers.createRecipe);
app.get('/recipes', recipeControllers.getAll);
app.get('/recipes/:id', recipeControllers.getById);
app.put('/recipes/:id', verififyToken, recipeControllers.updateRecipe);
app.delete('/recipes/:id', verififyToken, recipeControllers.deleteRecipe);

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.put('/recipes/:id/image', verififyToken, upload.single('image'), recipeControllers.uploadImage);
app.get('/images/:id', recipeControllers.getImageById);

// Será validado que o projeto tem um arquivo de seed, com um comando para inserir um usuário root e verifico que é possível fazer login;

module.exports = app;