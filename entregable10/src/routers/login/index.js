import { Router } from "express";
import { LoginController } from "../../controllers/login/index.js";
import { verifyLogin } from "../../middlewares/verifyLogin.js";



const router = Router();

router.get("/login", LoginController.login);

router.get("/home", verifyLogin, LoginController.home)

router.get("/logout", LoginController.logout)

export {router as LoginRouter}