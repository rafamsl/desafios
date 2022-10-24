const {Productos, Usuarios, Mensajes} = require('../model/models.js')

const userConnected = async (socket, io) => {
    console.log("Usuario conectado: ", socket.id)
    await Usuarios.save({ name: null, socketId: socket.id})
    const allMsg = await Mensajes.getAll()
    const allUser = await Usuarios.getAll()
    const allProducts = await Productos.getAll()
    io.sockets.emit('all users', allUser)
    io.sockets.emit('all messages', allMsg)
    io.sockets.emit('all products', allProducts)
  }

const userChangeAlias = async (socket, io, alias) => {
    const user = await Usuarios.getBySocketId(socket.id)
    console.log(user)
    const userUpdated = {...user, name: alias}
    await Usuarios.update(user.id, userUpdated)
    const allUser = await Usuarios.getAll()
    io.sockets.emit('all users', allUser)
  }
  
  module.exports = {
    userConnected,
    userChangeAlias
  }