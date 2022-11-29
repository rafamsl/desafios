import { Router } from "express";
import { MessagesController } from "../controllers/index.js";

const router = Router();

router.get('/home', MessagesController.home)

export { router as ViewsRouter };