import { MessagesDao, UsersDao } from "../../daos/index.js";
import {
  DATE_UTILS,
  ERRORS_UTILS,
  LOGGER_UTILS
} from "../../utils/index.js";
import { UserController } from "../users/index.js";

const home = async (req,res) =>{
  res.render("index.html")
}

const getAll = async (req, res) => {
  try {
    const message = await MessagesDao.getAll();
    if (!message || !message[0]) {
      return res.send({ error: ERRORS_UTILS.MESSAGES.NO_DATA});
    }

    return(message)
  } catch (error) {
    await LOGGER_UTILS.addLog(error);
  }
};

// const getTest = async (req,res) => {
//   const limit = req.query
//   const products = []
  
//   for (let index = 1; index < limit; index++) {
//     const product = FAKER.createFakeProduct()
//     products.push(product)}

//   res.send(products); 
// }

const getById = async (req, res) => {
  const { id } = req.params;

  const message = await MessagesDao.getById(id);
  if (!message) {
    return res.send({ error: ERRORS_UTILS.MESSAGES.NO_DATA});
  }

  res.send(message);
};

const save = async (req, res) => {
  try {
    console.log("agregando message")
    const { text, author } = req.body;

    // find if user exists
    let user = await UsersDao.getbyEmail(author.email)

    // if not, create a user
    if (!user){
      user = await UsersDao.save(author)
    }

    const message = {
      text: text,
      author: user,
      timestamp: DATE_UTILS.getTimestamp()
    }
    const savedMessage = await MessagesDao.save(message)
    res.send(savedMessage)
  } catch (error) {
    await LOGGER_UTILS.addLog(error);
    res.send(error);
  }
};

const save_from_front = async (newMsg) => {
  try {
    console.log("agregando message")

    // find if user exists
    let user = await UserController.getByEmail(newMsg.email)
    // if not, create a user
    
    if (!user){
      let author = {
        nombre: newMsg.nombre,
        apellido: newMsg.apellido,
        edad: newMsg.edad,
        email: newMsg.email,
        avatar: newMsg.avatar
      }
      user = await UsersDao.save(author)
    }
    const savedMessage = await MessagesDao.save({author:user, text:newMsg.text, timestamp:newMsg.timestamp})
  } catch (error) {
    await LOGGER_UTILS.addLog(error);
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await MessagesDao.getById(id)
    if (!message){
      res.send({ error: ERRORS_UTILS.MESSAGES.NO_DATA})
    }
    await MessagesDao.deleteById(id);
    res.send({ success: true });
  } catch (error) {
    console.error(error);
    res.send({ error: "Ocurrio un error" });
  }
};

// const edit = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { text, author } = req.body;
//     let message = await MessagesDao.getById(id)
//     if (!message){
//       return res.send({ error: ERRORS_UTILS.MESSAGES.NO_DATA})
//     }

//     message = await JOI_VALIDATOR.message.validateAsync({
//         nombre,
//         apellido,
//         edad,
//         email,
//         avatar,
//         timestamp: DATE_UTILS.getTimestamp(),
//     });

//     const updated_user = await MessagesDao.update(id,message);
//     res.send(updated_user);
//   } catch (error) {
//     console.error(error);
//     res.send({ error: "Ocurrio un error" });
//   }
// };

export const MessagesController = {getAll, getById, save, deleteById, save_from_front,home}