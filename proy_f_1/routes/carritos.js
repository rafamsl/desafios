import express from 'express'
import {Carritos} from '../models/models.js'
const router = express.Router();

router.post('', async (req, res) => {
    try {
        const id = await Carritos.save();
        res.json({id})
    } catch (Error) {
        res.status(400).send(Error.message);
    }
    
})



router.get('/', async (req, res) => {
    try {
        const carritos = await Carritos.getAll();
        res.json({carritos});
    } catch (e) {
        res.status(400).send(e.message);
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const carrito = await Carritos.getById(id);
        res.json({carrito})
    } catch (Error) {
        res.status(400).send(Error.message);
    }
})

router.get('/:id/productos', async (req, res) => {
    const id = req.params.id
    try {
        const carrito = await Carritos.getById(id);
        const productos = carrito.productos
        res.json({productos})
    } catch (Error) {
        res.status(400).send(Error.message);
    }
})

router.post('/:id/productos',  async (req, res) => {
    const id = req.params.id
    const producto = req.body
    try {
        const carrito =  await Carritos.addObjects(id,producto)
        if(carrito.productos){
            const productos = carrito.productos
            res.json({productos})
        } else{
            res.send("No hay stock")
        }
        
    } catch (Error) {
        res.status(400).send(Error.message);
    }
})

router.delete('/:id/productos/:id_prod', async (req, res) => {
    const id_carrito = req.params.id
    const id_producto = req.params.id_prod
    try { 
        const updated_carrito = await Carritos.removeObjects(id_carrito,id_producto)
        res.json({updated_carrito})
    } catch (Error) {
        res.status(400).send(Error.message);
    }
})

router.delete('/:id', async (req, res) => {
    const id_carrito = req.params.id
    try { 
        await Carritos.deleteCarrito(id_carrito)
        res.json("Carrito borrado")
    } catch (Error) {
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
