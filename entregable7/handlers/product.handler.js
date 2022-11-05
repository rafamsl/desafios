const {Productos} = require('../model/models.js')

const newProduct = async (socket, io, newProduct) => {
    try{
      await Productos.save(newProduct,"mysql")
      const allProduct = await Productos.getAll("mysql")
      // Propago los productos en todos los sockets
      io.sockets.emit('all products', allProduct)
    } catch(error){
      console.log(error)
    }
  }
  
  module.exports = {
    newProduct
  }