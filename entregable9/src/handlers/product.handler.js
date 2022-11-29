import { ProductosDao } from "../daos/index.js"


const newProduct = async (socket, io, newProduct) => {
    try{
      let product = await ProductosDao.getByCodigo(newProduct.code)

      if(!product){
        product = await JOI_VALIDATOR.product.validateAsync({
          newProduct,
          timestamp: DATE_UTILS.getTimestamp(),
        });
      }
      await ProductosDao.save(product)
      const allProduct = await ProductosDao.getAll()
      // Propago los productos en todos los sockets
      io.sockets.emit('all products', allProduct)
    } catch(error){
      console.log(error)
    }
  }
  
  export {newProduct}
 