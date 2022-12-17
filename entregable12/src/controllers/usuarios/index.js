import { UsuariosDao } from "../../dao/index.js";
import {
  DATE_UTILS,
  ERRORS_UTILS,
  JOI_VALIDATOR,
  LOGGER_UTILS,
  BCRYPT_UTILS
} from "../../utils/index.js";
import { CarritoController } from "../carritos/index.js";


async function getAll(req,res){
    try {
        const users = await UsuariosDao.getAll();
        if (!users || !users[0]) {
          return res.send({ error: ERRORS_UTILS.MESSAGES.NO_DATA});
        }
    
        res.send(users);
      } catch (error) {
        res.send({ error});
      }
}

async function getById(req,res){
    try{
        const { id } = req.params;

        const user = await UsuariosDao.getById(id);
        if (!user) {
            return res.send({ error: ERRORS_UTILS.MESSAGES.NO_USER});
        }
        res.send(user);
    } catch(error) {
        res.send({ error});
    }
}

async function save(req,res){
    try {
        console.log("agregando usuario")
        const {email, password } = req.body;

        let user = await UsuariosDao.getOne({email:email})
    
        if (!user){
          user = await JOI_VALIDATOR.user.validateAsync({
            email,
            password,
            timestamp: DATE_UTILS.getTimestamp(),
          })
          user.password = BCRYPT_UTILS.createHash(user.password)
          const createdUser = await UsuariosDao.save(user);
          res.send(createdUser);
        } else{
          res.send({ error: ERRORS_UTILS.MESSAGES.EXISTING_USER})
        }    
    
      } catch (error) {
        await LOGGER_UTILS.addLog(error);
        res.send(error);
      }
}

async function addCartToUser(req, cartId){
  const email = req.user.email
  const user = await UsuariosDao.getOne({email:email})
  if(user.carrito){
    CarritoController.deleteById(user.carrito)
  }
  user.carrito = cartId
  const updatedUser = await UsuariosDao.update(user._id, user)

}

async function deleteById(req,res){
    try {
        const { id } = req.params;
        const user = await UsuariosDao.getById(id)
        if (!user){
          res.send({ error: ERRORS_UTILS.MESSAGES.NO_USER})
        }
        await UsuariosDao.deleteById(id);
        res.send({ success: true });
      } catch (error) {
        console.error(error);
        res.send({ error: "Ocurrio un error" });
      }
}

async function editById(req,res){
    try {
        const { id } = req.params;
        const { email, password } = req.body;
        let user = await UsuariosDao.getOne({email:email})
    
        if (!user){
            user = await JOI_VALIDATOR.user.validateAsync({
            email,
            password,
            timestamp: DATE_UTILS.getTimestamp(),
          });
          const updatedUser = await UsuariosDao.update(id, user);
          res.send(updatedUser)
        }
      } catch (error) {
        console.error(error);
        res.send({ error: "Ocurrio un error" });
      }
}

export const UsuarioController = {getAll, getById,editById,save,deleteById, addCartToUser} 