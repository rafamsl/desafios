import {ProductosDao } from '../dao/index.js'

const userConnected = async (socket, io) => {
    console.log("Usuario conectado: ", socket.id)
    const allProducts = await ProductosDao.getAll()
    io.sockets.emit('all products', allProducts)
  }
  
export {userConnected}
  