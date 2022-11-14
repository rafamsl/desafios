import { Router } from 'express'
import { verifyRole } from '../middlewares/admin.js';
import {Productos} from '../models/models.js'
import {
    DATE_UTILS,
    ERRORS_UTILS,
    LOGGER_UTILS,
    JOI_VALIDATOR
} from "../utils/index.js"

const router = Router();


router.get('/', async (req, res) => {
    try {
        const productos = await Productos.getAllFromDB();
        if (!productos) {
            res.send({error: ERRORS_UTILS.MESSAGES.NO_PRODUCT})
        }
        res.send({productos});
        
    } catch (e) {
        await LOGGER_UTILS.addLog(e)
        res.status(400).send(e.message);
    }
})

router.get('/:id', async (req, res) => {
    
    try {
        const id = req.params.id
        const producto = await Productos.getBy("id",id);
        res.json({producto})
    } catch (Error) {
        await LOGGER_UTILS.addLog(Error)
        res.status(400).send(Error.message);
    }
})
router.post('', verifyRole, async (req, res) => {
    
    try {
        // enrich product
        const producto = req.body;
        producto.timestamp = DATE_UTILS.getTimestamp()
        
        
        // save to DB
        await Productos.insert(validate_product);
        res.json({validate_product})
    } catch (Error) {
        await LOGGER_UTILS.addLog(Error)
        res.status(400).send(Error.message);
    }
    
})

router.put('/:id', verifyRole, async (req,res) => {
    
    try {
        // enrich product
        const id = req.params.id;
        const producto = req.body;
        producto.timestamp = DATE_UTILS.getTimestamp()

        // validate product
        const validate_product = await JOI_VALIDATOR.product.validateAsync({producto})

        // check if exists
        const check_product = await Productos.getBy("codigo",validate_product.codigo)
        if (!check_product.id){
            res.send({error: ERRORS_UTILS.MESSAGES.NO_PRODUCT})
        }

        // save to DB
        const output = await Productos.modify(id,validate_product);
        res.json({output});
    } catch (Error) {
        await LOGGER_UTILS.addLog(Error)
        res.status(400).send(Error.message);
    }
})

router.delete('/:id', verifyRole, async (req,res) => {
    try {
        const id = req.params.id;
        const producto = await Productos.getBy("id",id)

        // check if product exists
        if (!producto.id){
            res.send({error: ERRORS_UTILS.MESSAGES.NO_PRODUCT})
        }

        // borrar
        await Productos.deleteById(id)
        res.send("Producto borrado")
    } catch(Error) {
        await LOGGER_UTILS.addLog(Error)
        res.status(400).send("Ocurrio un error");
    }
})

router.get("*", (req, res, next) => {
    try{
        req.status = 401
        throw new Error("Metodo no implementado")
    } catch(error){
        next(error)
    }});

export {router as routerProductos}