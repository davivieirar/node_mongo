import express from "express";
import { UsuarioController } from "../controller/usuarioController.js";

export const routerUsuario = express.Router();

routerUsuario
  .post('/usuario', UsuarioController.inserir)
  .get('/usuarios', UsuarioController.buscarTodos)
  .get('/usuario/:id', UsuarioController.buscarPorId)
  .delete('/usuario/:id', UsuarioController.excluir)
  .put('/usuario/:id',UsuarioController.inserir)

