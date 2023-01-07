import { __dirname } from "../../server.js";

async function login(req,res){
    console.log(req.session)
    if (req.session.name){
        return home(req,res)
    } else{
        res.sendFile("/public/login.html", { root: __dirname })
    }
}

async function execute_login(req,res){
    const nombre = req.query.nombre
    req.session.nombre = nombre
    return home(req,res)
}

async function home(req,res){
    res.sendFile("/public/index.html", { root: __dirname, nombre: req.session.nombre })
}

async function logout(req,res){
    try {
        if (req.session){
            req.session.destroy();
        }
		res.sendFile("/public/login.html", { root: __dirname });
	} catch (error) {
		res.send(500,' '+ error );
	}
}

export const LoginController = {login, home, logout, execute_login}