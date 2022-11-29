import { Router } from "express";
import { ProductController } from "../controllers/index.js";
import { verifyRole } from "../middlewares/verifyRole.js"

const router = Router();

router.get('/all', ProductController.getAll)
router.get('/:id', ProductController.getById)
router.get('/productos-test', ProductController.getTest)
router.post('', verifyRole, ProductController.save)
router.put('/:id', verifyRole, ProductController.edit)
router.delete('/:id', verifyRole, ProductController.deleteById)

export { router as ProductoRouter };