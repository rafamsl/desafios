import Router from "express"
import { UsuarioController } from "../../controllers/index.js"
import passport from "passport"

const router = Router()

router.post("/register", UsuarioController.save)
router.post("/login", passport.authenticate("login"),async (req,res) =>{
    const user = req.user
    res.send({succes:true, user: user})
})
router.get("/login", async(req,res) => {
    if (req.user){
        const user = req.user
        const email = user.email
        res.send(`logged as ${email}`)
    } else {
        res.send("not logged in")
    }
} )

router.get("/loginGithub", passport.authenticate("github"), async (req,res) =>{
    const user = req.user
    res.send({success: true, message: `logged as ${user}`})
})
router.get("/github", passport.authenticate("github"), async(req,res) => {
    res.send("callback from github")
})

export {router as AuthRouter} 
