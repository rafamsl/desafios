const verifyNotLogin = (req, res, next) => {
  if (req.isAuthenticated()){
      return res.render("home",{ username: req.user.username })
    }
  next();
};


export { verifyNotLogin };