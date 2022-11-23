import { Router } from "express";
import { CarritosDao, ProductosDao } from "../../dao/index.js";
import { verifyRole } from "../../middlewares/verifyRole.js";
import {
  DATE_UTILS,
  ERRORS_UTILS,
  LOGGER_UTILS,
} from "../../utils/index.js";

const router = Router();

// /api/carritos
router.get("/", async (req, res) => {
  try {
    const carrito = await CarritosDao.getAll();

    if (!carrito || !carrito[0]) {
      return res.send({ error: ERRORS_UTILS.MESSAGES.NO_DATA});
    }

    res.send(carrito);
  } catch (error) {
    res.send({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const carrito = await CarritosDao.getById(Number(id));

  if (!carrito) {
    return res.send({ error: ERRORS_UTILS.MESSAGES.NO_CART});
  }

  res.send(carrito);
});

router.post("/", async (req, res) => {
  try {
    const carrito = {
      productos : [],
      timestamp: DATE_UTILS.getTimestamp()
    }
    
    const createdCarrito = await CarritosDao.save(carrito);
    const id = createdCarrito.id
    res.json({id})

  } catch (error) {
    await LOGGER_UTILS.addLog(error);
    res.send(error);
  }
});

router.post("/:cartId/productos", async (req, res) => {
  const { productId, stockRequest } = req.body;
  const { cartId } = req.params;
  

  const cart = await CarritosDao.getById(cartId);
  // Chequear que hay carrito
  if (!cart){
    return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART });
  }
  const product = await ProductosDao.getById(productId)
  
  // Chequear que hay producto
  if (!product){
    return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT });
  }
  const originalStock = product.stock
    
  // Chequear que hay stock
  if (product.stock < stockRequest)
    return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_STOCK + " " + product.stock});

  // Chequear que el producto ya no este en el carrito
  const productoExistente = cart.productos.findIndex(obj => obj.id == +productId);
  if (productoExistente != -1){
    cart.productos[productoExistente].stock += stockRequest
  } else {
    product.stock = stockRequest
    cart.productos.push(product);
  }

  // Actualizar carrito
  const updatedCart = await CarritosDao.update(cartId, cart);

  res.send({ success: true, cart: updatedCart });

  // Actualizar stock del producto despues de responder al cliente
  product.stock = originalStock - stockRequest
  await ProductosDao.update(productId,product)

});

router.delete("/:id", verifyRole, async (req, res) => {
  try {
    const { id } = req.params;
    const carrito = await CarritosDao.getById(id)
    if (!carrito){
      return res.send({ error: ERRORS_UTILS.MESSAGES.NO_CART})
    }
    // Borrar carrito
    await CarritosDao.deleteById(id);
    res.send({ success: true });

    // Devolver stock de cada producto
    const productos = carrito.productos
    if (!productos){
      return
    }
    for (const producto of productos) {
      const stockProduct = await ProductosDao.getById(producto.id)
      stockProduct.stock += producto.stock
      await ProductosDao.update(producto.id, stockProduct)
    }
    console.log("stock actualizado")

  } catch (error) {
    console.error(error);
    res.send({ error: "Ocurrio un error" });
  }
});

router.delete("/:cartId/productos/:productId", async (req, res) => {
  const { cartId, productId } = req.params;
  const carrito = await CarritosDao.getById(cartId)

  // chequear que hay carrito
  if (!carrito){
    return res.send({ error: ERRORS_UTILS.MESSAGES.NO_CART})
  }
  
  // Chequear que hay producto
  if (!carrito.productos[0]){
    return res.send({ error: ERRORS_UTILS.MESSAGES.NO_PRODUCT})
  }
  const productoIndex = carrito.productos.findIndex(obj => obj.id == productId);
  let removedProduct = carrito.productos[productoIndex]
  if (productoIndex === -1){
    const prod_codigo = ProductosDao.getById(productId).codigo
    const productoIndex2 = carrito.productos.findIndex(obj => obj.codigo == prod_codigo)
    removedProduct = carrito.productos[productoIndex2]
    if (productoIndex2 === -1){
      return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT });
    };
  }  

  // Actualizar carrito
  carrito.productos.splice(productoIndex,1)
  await CarritosDao.update(cartId,carrito)
  res.send({ success: true })

  // Actualizar stock
  const stockProduct = await ProductosDao.getById(productId)
  console.log(removedProduct)
  stockProduct.stock += removedProduct.stock
  await ProductosDao.update(productId, stockProduct)
  
  
})

export { router as CarritoRouter };