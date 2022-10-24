const {Productos} = require('../model/models.js')

const newProduct = async (socket, io, newProduct) => {
    await Productos.save(newProduct)
    const allProduct = await Productos.getAll()
    // Propago los productos en todos los sockets
    io.sockets.emit('all products', allProduct)
  }
  
  module.exports = {
    newProduct
  }