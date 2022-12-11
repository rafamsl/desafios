const verifyLogin = (req, res, next) => {
    if (!req.isAuthenticated()){
        return res.render("login")
      }
    next();
  };

  
export { verifyLogin };