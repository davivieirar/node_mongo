import express from "express";
import { routerUsuario } from "./usuarioRoutes.js";

export const routes = (app) => {
    app.get('/', (req, res) => {
        res.send('Servidor Rodando!')
      })

    app.use(express.json(), routerUsuario)


}

