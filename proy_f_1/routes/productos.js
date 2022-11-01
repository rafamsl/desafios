import express from 'express'
import {Productos} from '../models/models.js'
const router = express.Router();

function admin(req,res,next){
    console.log("ejecutando admin")
    if (req.query.admin){
        req.admin = true
    } else{
        try{
            req.status = 401
            throw new Error("Usuario no es admin -> add ?admin=true to your request :)")
        } catch(error){
            next(error)
        }
    }
    next()
}


router.get('/', async (req, res) => {
    try {
        const productos = await Productos.getAll();
        res.json({productos});
    } catch (e) {
        res.status(400).send(e.message);
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const productos = await Productos.getById(id);
        res.json({productos})
    } catch (Error) {
        res.status(400).send(Error.message);
    }
})
router.post('', admin, async (req, res) => {
    const producto = req.body;
    try {
        await Productos.save(producto);
        const productos = await Productos.getAll();
        res.json({productos})
    } catch (Error) {
        res.status(400).send(Error.message);
    }
    
})

router.put('/:id', admin, async (req,res) => {
    const id = req.params.id;
    const producto = req.body;
    try {
        const output = await Productos.update(id,producto);
        res.json({output});
    } catch (Error) {
        res.status(400).send(Error.message);
    }
})

router.delete('/:id', admin, async (req,res) => {
    const id = req.params.id;
    try {
        await Productos.deleteById(id);
        const productos = await Productos.getAll()
        res.json({productos})
    } catch(Error) {
        res.status(400).send(Error.message);
    }
})

router.get("*", (req, res, next) => {
    try{
        req.status = 401
        throw new Error("Metodo no implementado")
    } catch(error){
        next(error)
    }});

export default router