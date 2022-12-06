import { __dirname } from "../../server.js";

async function login(req,res){
    if (req.session){
        res.sendFile("/public/index.html", { root: __dirname });
    } else{
        res.sendFile("/public/login.html", { root: __dirname })
    }
}

async function home(req,res){
    res.sendFile("/public/index.html", { root: __dirname })
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

export const LoginController = {login, home, logout}