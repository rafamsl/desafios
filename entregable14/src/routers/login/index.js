import { Router } from "express";
import { LoginController } from "../../controllers/login/index.js";
import { verifyLogin } from "../../middlewares/verifyLogin.js";
import { verifyNotLogin } from "../../middlewares/verifyNotLogin.js";
import passport from "passport";
import compression from "compression"


const router = Router();

router.get("", verifyNotLogin, LoginController.viewLogin);
router.get("/login", verifyNotLogin, LoginController.viewLogin);
router.post("/login", verifyNotLogin, passport.authenticate("login", 
{ 
    successRedirect: '/home',
    failureRedirect: '/failureLogin',
    failureFlash: true 
}))
router.get("/register", verifyNotLogin, LoginController.viewRegister);
router.post("/register", verifyNotLogin, LoginController.register)
router.get("/home", verifyLogin, compression(), LoginController.home)
router.get("/new_product", verifyLogin, LoginController.view_new_product)
router.post("/new_product", verifyLogin, LoginController.new_product)
router.get("/logout", verifyLogin, LoginController.logout)
router.get("/failureLogin", verifyNotLogin, LoginController.failureLogin)
router.get("/failureRegister", verifyNotLogin, LoginController.failureRegister)
router.get("/info", verifyLogin, compression(), LoginController.info)

export {router as LoginRouter}