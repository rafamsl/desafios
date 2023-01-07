import { config } from "../config/index.js";
import { ProductosDao } from "../dao/index.js";
import { LOGGER_UTILS } from "../utils/index.js";


const verifyNotLogin = async (req, res, next) => {
  if (req.isAuthenticated()){
    LOGGER_UTILS.info_log(req.originalUrl, "verifyNotLogin")
    const products = await ProductosDao.getAll()
    return res.render("home",{ username: req.user.username, products: products, server:config.PROCESS.PID, port:config.SERVER.PORT })
    }
  next();
};


export { verifyNotLogin };