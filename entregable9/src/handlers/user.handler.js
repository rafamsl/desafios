import { ProductController, MessagesController, UserController } from '../controllers/index.js'
import { MessagesDao, ProductosDao, UsersDao } from '../daos/index.js'
import { normalizar_objects, messagesSchema } from "../normalizr/index.js"

const userConnected = async (socket, io) => {
    console.log("Usuario conectado: ", socket.id)
    // await UserController.save()
    const allMsg = await MessagesDao.getAll()
    const normalizedMsg = await normalizar_objects(allMsg,messagesSchema)
    const allUser = await UsersDao.getAll()
    const allProducts = await ProductosDao.getAll()
    io.sockets.emit('all users', allUser)
    io.sockets.emit('all messages', normalizedMsg)
    io.sockets.emit('all products', allProducts)
  }

// const userChangeAlias = async (socket, io, alias) => {
//     const user = await UsersDao.getBySocketId(socket.id)
//     const userUpdated = {...user, name: alias}
//     await UsersDao.update(user.id, userUpdated)
//     const allUser = await UsersDao.getAll()
//     io.sockets.emit('all users', allUser)
//   }
  
  export {userConnected}
  