import { LOGGER_UTILS } from "../utils/index.js";

const verifyLogin = (req, res, next) => {
    if (!req.isAuthenticated()){
        LOGGER_UTILS.info_log(req.originalUrl, "verifyLogin")
        return res.render("login")
      }
    next();
  };

  
export { verifyLogin };