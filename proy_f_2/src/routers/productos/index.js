import { Router } from "express";
import { ProductosDao } from "../../dao/index.js";
import { verifyRole } from "../../middlewares/verifyRole.js";
import {
  DATE_UTILS,
  ERRORS_UTILS,
  JOI_VALIDATOR,
  LOGGER_UTILS,
} from "../../utils/index.js";

const router = Router();

// /api/products
router.get("", async (req, res) => {
  try {
    const product = await ProductosDao.getAll();
    if (!product || !product[0]) {
      return res.send({ error: ERRORS_UTILS.MESSAGES.NO_DATA});
    }

    res.send(product);
  } catch (error) {
    res.send({ error});
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const product = await ProductosDao.getById(id);
  if (!product) {
    return res.send({ error: ERRORS_UTILS.MESSAGES.NO_PRODUCT});
  }

  res.send(product);
});

router.post("/", verifyRole, async (req, res) => {
  try {
    console.log("agregando producto")
    const { title, description, code, thumbnail, price, stock } = req.body;
    console.log(ProductosDao)
    let product = await ProductosDao.getByCodigo(code)

    if (!product){
      product = await JOI_VALIDATOR.product.validateAsync({
        title,
        description,
        code,
        thumbnail,
        price,
        stock,
        timestamp: DATE_UTILS.getTimestamp(),
      });
      const createdProduct = await ProductosDao.save(product);
      res.send(createdProduct);
    } else{
      res.send({ error: ERRORS_UTILS.MESSAGES.EXISTING_PRODUCT})
    }

    

  } catch (error) {
    await LOGGER_UTILS.addLog(error);
    res.send(error);
  }
});

router.delete("/:id", verifyRole, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductosDao.getById(id)
    if (!product){
      res.send({ error: ERRORS_UTILS.MESSAGES.NO_PRODUCT})
    }
    await ProductosDao.deleteById(id);
    res.send({ success: true });
  } catch (error) {
    console.error(error);
    res.send({ error: "Ocurrio un error" });
  }
});

router.put("/:id", verifyRole, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, code, thumbnail, price, stock } = req.body;
    let product = await ProductosDao.getById(id)
    if (!product){
      return res.send({ error: ERRORS_UTILS.MESSAGES.NO_PRODUCT})
    }

    product = await JOI_VALIDATOR.product.validateAsync({
      title,
      description,
      code,
      thumbnail,
      price,
      stock,
      timestamp: DATE_UTILS.getTimestamp(),
    });

    const updated_product = await ProductosDao.update(id,product);
    res.send(updated_product);
  } catch (error) {
    console.error(error);
    res.send({ error: "Ocurrio un error" });
  }
});

export { router as ProductoRouter };