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

/* GET All /usuarios */
app.get('/usuarios', async (req, res) => {
  const usuarios = await Usuario.find();

  if(usuarios.length === 0){
  res.status(422).json({msg: 'Nenhum usuário encontrado'})
  } else {
    res.status(200).json(usuarios)
  }

})


/* GET by Id /usuario/:id */
app.get('/usuario/:id', async (req, res) => {
  const id = req.params.id
  // Se o tamanho do id for menor que o padrão, imprime mensagem de tamanho inválido (Número padrão de caracteres: 24)
  if(id.length !== 24){
    res.status(422).json({msg: 'Tamanho inválido do id'})
    return
  }

  const usuario = await Usuario.findOne({ _id: id });

  // Se o id não for encontrado, será impressa uma mensagem informando
  if(usuario){
    res.status(200).json(usuario)
  } else {
    res.status(422).json({msg: 'Usuário não encontrado!'})
  }


})

/* DELETE by Id /usuario/:id */
app.delete('/usuario/:id', async (req, res) => {
  const id = req.params.id
  const usuario = await Usuario.findOne({ _id: id });
  
  if(usuario){
    await Usuario.deleteOne({ _id: usuario.id })
    res.status(200).json('Usuário deletado com sucesso')
  } else {
    res.status(422).json({msg: 'Usuário não encontrado!'})
  }

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

