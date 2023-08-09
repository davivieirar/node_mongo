import { Usuario } from "../models/Usuario.js";


export class UsuarioController {
    static inserir = async (req, res) => {
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
      
      }

      static atualizar =  async (req, res) => {
        const id = req.params.id
        // desestruturação do body para acessar os atributos do objeto que será enviado
        const { nome, idade, ativo, email } = req.body;
      
        // crio o objeto usuario copiado do objeto do body
        const usuario = { nome, idade, ativo, email };
        console.log(usuario)
        const usuarioUpdated = await Usuario.updateOne({ _id: id }, usuario)
      
        res.status(200).json('Usuário atualizado')
      
      }

      static buscarTodos = async (req, res) => {
        const usuarios = await Usuario.find();
      
        if(usuarios.length === 0){
        res.status(422).json({msg: 'Nenhum usuário encontrado'})
        } else {
          res.status(200).json(usuarios)
        }
      
      }

      static buscarPorId = async (req, res) => {
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
      }

      static excluir = async (req, res) => {
        const id = req.params.id
        const usuario = await Usuario.findOne({ _id: id });
        
        if(usuario){
          await Usuario.deleteOne({ _id: usuario.id })
          res.status(200).json('Usuário deletado com sucesso')
        } else {
          res.status(422).json({msg: 'Usuário não encontrado!'})
        }
      }
}