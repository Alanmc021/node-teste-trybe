const express = require('express');
const bodyParser = require('body-parser');
// const { join } = require('path');

// const errorMiddleware = require('../middlewares/error');
const userControllers = require('../controllers/user');
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

module.exports = app;