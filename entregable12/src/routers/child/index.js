import { Router } from "express";
import { verifyLogin } from "../../middlewares/verifyLogin.js";
const router = Router();
import {fork} from "child_process";
import { config } from "../../config/index.js";

router.get("", (req,res)=>{
    const cant = req.query.cant || config.CHILD.RANDOM
    const child = fork("../src/controllers/child/index.js")
    child.send({key: "number", value : cant})
    child.on("message",(message)=>{
        console.log("message received")
        res.send(message)
        child.send({key: "status"})
    })
    child.on("exit",(code)=>{
        console.log("child exited on code ", code)
        if (code === null || code === 0){
            res.send("Number too big")
        }
    })
    child.on("error",(error)=>{
        console.log("child failed on error ", error)
    })
    });

export {router as ChildRouter}