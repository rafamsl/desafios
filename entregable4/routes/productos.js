const express = require('express');
const Contenedor = require('../containers/containers.js')
const router = express.Router();

let Productos = new Contenedor();

router.get('/', (req, res) => {
    const productos = Productos.getAll();
    res.send({ productos });
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    try {
        const producto = Productos.getById(id);
        res.status(200).send({ producto });
    } catch (Error) {
        res.status(400).send(Error.message);
    }

})
router.post('/', (req, res) => {
    const { title, price, thumbnail } = req.body;
    try {
        const id = Productos.save({title, price, thumbnail});
        res.status(200).send(`Producto agregado. id = ${id}`);
    } catch (Error) {
        res.status(400).send(Error.message);
    }
    
})

router.put('/:id', (req,res) => {
    const id = req.params.id;
    const producto = req.body;
    const output = Productos.update(id,producto);
    res.status(200).send(output);
})

router.delete('/:id', (req,res) => {
    const id = req.params.id;
    const output = Productos.deleteById(id);
    res.send(output);
})

module.exports = router;