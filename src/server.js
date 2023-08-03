import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import { Usuario } from './models/Usuario.js';

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json())

const HOST = 'localhost'
const PORT = 5000

//endpoint inicial
app.get('/', async (req, res) => {
  res.send('Servidor Rodando!')
})

app.post('/usuario', async (req, res) => {
  // desestruturação do body para acessar os atributos do objeto que será enviado
  const { nome, idade, ativo, email } = req.body;

  // crio o objeto usuario copiado do objeto do body
  const usuario = { nome, idade, ativo, email };

  const usuarioDB = await Usuario.create(usuario) 

  
  console.log("consultou", req.body)
  res.status(201).json({
    data: usuarioDB,
    msg: "Usuário criado com sucesso"
  })

})

app.get('/usuario', async (req, res) => {
  const usuarios = await Usuario.find();

  res.status(200).json(usuarios)

})

app.get('/usuario/:id', async (req, res) => {
  const id = req.params.id
  const usuarios = await Usuario.findOne({ _id: id });

  res.status(200).json(usuarios)

})

app.delete('/usuario/:id', async (req, res) => {
  const id = req.params.id
  const usuario = await Usuario.findOne({ _id: id });

  await Usuario.deleteOne({ _id: usuario.id })

  res.status(200).json('Usuário deletado com sucesso')

})

app.put('/usuario/:id', async (req, res) => {
  const id = req.params.id
  // desestruturação do body para acessar os atributos do objeto que será enviado
  const { nome, idade, ativo, email } = req.body;

  // crio o objeto usuario copiado do objeto do body
  const usuario = { nome, idade, ativo, email };
  console.log(usuario)
  const usuarioUpdated = await Usuario.updateOne({ _id: id }, usuario)

  res.status(200).json('Usuário atualizado')

})

const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
console.log(DB_USER, DB_PASS)

//conectando no banco Mongo Atlas
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.lffg5r6.mongodb.net/dc_fs12?retryWrites=true&w=majority`
)



.then(() => {
    console.log('DB conectado com sucesso!')
})
.catch(error => {
    console.log("Erro ao conectar ao DB", error)
})

app.listen(PORT, () => {
  console.log(`Example app listening on port http://${HOST}:${PORT}`)
})

