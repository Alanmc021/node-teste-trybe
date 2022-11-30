// const express = require('express');

// const app = express();

// // Não remover esse end-point, ele é necessário para o avaliador
// app.get('/', (request, response) => {
//   response.send();
// });
// // Não remover esse end-point, ele é necessário para o avaliador

// module.exports = app;

import express from 'express';
import routes from '../routes';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
