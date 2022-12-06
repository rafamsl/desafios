import { __dirname } from "../server.js";

const verifyLogin = (req, res, next) => {
    if (!req.session){
      console.log("no session created")
      if(!req.query.name){
        console.log("no name available")
        return res.redirect("/login")
      }
        const name = req.query.name 
        req.session.name = name
        console.log(req.session)
    }
    next();
  };

  
export { verifyLogin };