import { Router } from "express";
import { LoginController } from "../../controllers/login/index.js";
import { verifyLogin } from "../../middlewares/verifyLogin.js";
import { verifyNotLogin } from "../../middlewares/verifyNotLogin.js";
import passport from "passport";


const router = Router();

router.get("/login", verifyNotLogin, LoginController.viewLogin);
router.post("/login", verifyNotLogin, passport.authenticate("login", 
{ 
    successRedirect: '/home',
    failureRedirect: '/failureLogin',
    failureFlash: true 
}))
router.get("/register", verifyNotLogin, LoginController.viewRegister);
router.post("/register", verifyNotLogin, LoginController.register)
router.get("/home", verifyLogin, LoginController.home)
router.get("/logout", verifyLogin, LoginController.logout)
router.get("/failureLogin", verifyNotLogin, LoginController.failureLogin)
router.get("/failureRegister", verifyNotLogin, LoginController.failureRegister)

export {router as LoginRouter}