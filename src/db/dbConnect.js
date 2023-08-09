import mongoose from "mongoose"


const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
console.log(DB_USER, DB_PASS)

//conectando no banco Mongo Atlas
export default mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.lffg5r6.mongodb.net/dc_fs12?retryWrites=true&w=majority`
)
.then(() => {
    console.log('DB conectado com sucesso!')
})
.catch(error => {
    console.log("Erro ao conectar ao DB", error)
})

