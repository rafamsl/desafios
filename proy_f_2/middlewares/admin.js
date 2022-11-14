const verifyRole = (req, res, next) => {
    const IS_ADMIN = false
    if (req.query.admin){
        IS_ADMIN = true}

    if (!IS_ADMIN) return res.send({ error: "Usuario no autorizado" });

  next();
};

export { verifyRole };