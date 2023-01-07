import { Router } from "express";
import {CarritoController} from "../../controllers/index.js"

const router = Router();

// /api/carritos
router.get("/", CarritoController.getAll);

router.get("/:id", CarritoController.getById);

router.post("/", CarritoController.save);

router.post("/:cartId/productos", CarritoController.addToCart);

router.delete("/:id", CarritoController.deleteCart);

router.delete("/:cartId/productos/:productId", CarritoController.removeFromCart)

export { router as CarritoRouter };