import { UsersDao } from "../../daos/index.js";

import {
  DATE_UTILS,
  ERRORS_UTILS,
  JOI_VALIDATOR,
  LOGGER_UTILS
} from "../../utils/index.js";


// /api/products
const getAll = async (req, res) => {
  try {
    const user = await UsersDao.getAll();
    if (!user || !user[0]) {
      return res.send({ error: ERRORS_UTILS.MESSAGES.NO_DATA});
    }

    res.send(user);
  } catch (error) {
    res.send({ error});
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

const getByEmail = async(email) =>{
  try {
    const users = await UsersDao.getAll();
    const user = users.find(user => user.email == email)
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    await LOGGER_UTILS.addLog(error);
    res.send(error);
  }
}

const getById = async (req, res) => {
  const { id } = req.params;

  const user = await UsersDao.getById(id);
  if (!user) {
    return res.send({ error: ERRORS_UTILS.MESSAGES.NO_DATA});
  }

  res.send(user);
};

const save = async (req, res) => {
  try {
    console.log("agregando user")
    const { nombre, apellido, edad, email, avatar } = req.body;
    let user = await UsersDao.getByEmail(email)

    if (!user){
      user = await JOI_VALIDATOR.user.validateAsync({
        nombre,
        apellido,
        edad,
        email,
        avatar,
        timestamp: DATE_UTILS.getTimestamp(),
      });
      const createdUser = await UsersDao.save(user);
      res.send(createdUser);
    } else{
      res.send({ error: ERRORS_UTILS.MESSAGES.EXISTING_USER})
    }
  } catch (error) {
    await LOGGER_UTILS.addLog(error);
    res.send(error);
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UsersDao.getById(id)
    if (!user){
      res.send({ error: ERRORS_UTILS.MESSAGES.NO_DATA})
    }
    await UsersDao.deleteById(id);
    res.send({ success: true });
  } catch (error) {
    console.error(error);
    res.send({ error: "Ocurrio un error" });
  }
};

const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, edad, email, avatar } = req.body;
    let user = await UsersDao.getById(id)
    if (!user){
      return res.send({ error: ERRORS_UTILS.MESSAGES.NO_DATA})
    }

    user = await JOI_VALIDATOR.user.validateAsync({
        nombre,
        apellido,
        edad,
        email,
        avatar,
        timestamp: DATE_UTILS.getTimestamp(),
    });

    const updated_user = await UsersDao.update(id,user);
    res.send(updated_user);
  } catch (error) {
    console.error(error);
    res.send({ error: "Ocurrio un error" });
  }
};

export const UserController = {getAll, getById, save, deleteById, edit,getByEmail}