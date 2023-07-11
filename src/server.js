import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express()

const HOST = 'localhost'
const PORT = 5000

//endpoint inicial
app.get('/', (req, res) => {
  res.send('Hello World!')
})

const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
console.log(DB_USER, DB_PASS)

//conectando no banco Mongo Atlas
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.lffg5r6.mongodb.net/usuario?retryWrites=true&w=majority`
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

