import { config } from "../config/index.js";
import { ProductosDao } from "../dao/index.js";

const verifyNotLogin = async (req, res, next) => {
  if (req.isAuthenticated()){
    const products = await ProductosDao.getAll()
    return res.render("home",{ username: req.user.username, products: products, server:config.PROCESS.PID, port:config.SERVER.PORT })
    }
  next();
};


export { verifyNotLogin };