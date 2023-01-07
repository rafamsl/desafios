import { UsuariosDao, ProductosDao } from "../../dao/index.js"
import { BCRYPT_UTILS, DATE_UTILS, ERRORS_UTILS, JOI_VALIDATOR, LOGGER_UTILS } from "../../utils/index.js"
import { ProductController } from "../productos/index.js";
import {config} from "../../config/index.js"

async function getAllProducts(){
  try {
    LOGGER_UTILS.info_log("no_path", "getAllProducts")
    const product = await ProductosDao.getAll();
    return product
  } catch (error) {
    return error;
  }
}


async function viewLogin(req,res){
  LOGGER_UTILS.info_log(req.originalUrl, "viewLogin")
  res.render('login')
}
async function viewRegister(req,res){
  LOGGER_UTILS.info_log(req.originalUrl, "viewRegister")
  res.render('register')
}
async function home(req,res){
  LOGGER_UTILS.info_log(req.originalUrl, "home")
  const products = await getAllProducts()
  res.render("home", { username: req.user.email, products: products, server:process.pid, port:config.SERVER.PORT });
}

async function info(req,res){
  LOGGER_UTILS.info_log(req.originalUrl, "info")
  res.send(config.PROCESS)
}
async function view_new_product(req,res){
  LOGGER_UTILS.info_log(req.originalUrl, "view_new_product")
  res.render("new-product")
}
async function new_product(req,res){
  try {
    LOGGER_UTILS.info_log(req.originalUrl, "new_product")
    await ProductController.save(req,res)  
    res.render("home");
  } catch (error) {
    LOGGER_UTILS.error_log(req.originalUrl, "new_product", error)
    res.send({error:error})
  }
}

async function logout(req, res) {
  LOGGER_UTILS.info_log(req.originalUrl, "logout")
  req.logout(() => {res.redirect("/login")})
}
async function failureLogin(req,res){
  const error = req.flash("error")[0];
  LOGGER_UTILS.warn_log(req.originalUrl, "failureRegister", "User Login Error")
  res.render("login-error", {error : error});
}
async function failureRegister(req,res){
  const error = req.flash("error")[0];
  LOGGER_UTILS.warn_log(req.originalUrl, "failureRegister", "User Registration Error")
  res.render("register-error", {error : error});
}

async function register(req,res){
  LOGGER_UTILS.info_log(req.originalUrl, "register")
  try { 
    const {email, password } = req.body;
    let user = await UsuariosDao.getOne({email:email})

    if (!user){
      user = await JOI_VALIDATOR.user.validateAsync({
      email,
      password,
      timestamp: DATE_UTILS.getTimestamp(),
      })
      user.password = BCRYPT_UTILS.createHash(user.password)
      const createdUser = await UsuariosDao.save(user);
      res.render("login", {message : "User created"})
    } else{
      res.send({ error: ERRORS_UTILS.MESSAGES.EXISTING_USER})
    }    

  } catch (error) {
    LOGGER_UTILS.error_log(req.originalUrl, "register", error)
    res.send(`Sorry we had an error => ${error.message}`);
  }
}


export const LoginController = {viewLogin, viewRegister, home, logout, failureLogin, failureRegister, register, view_new_product, new_product, info}