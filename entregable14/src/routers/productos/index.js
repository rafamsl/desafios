import { Router } from "express";
import { verifyRole } from "../../middlewares/verifyRole.js";
import { ProductController } from "../../controllers/productos/index.js";

const router = Router();

// /api/products
router.get("", ProductController.getAll);

router.get("/:id", ProductController.getById);

router.post("/", verifyRole, ProductController.save);

router.delete("/:id", verifyRole, ProductController.deleteById);

router.put("/:id", verifyRole, ProductController.editById);

export { router as ProductoRouter };