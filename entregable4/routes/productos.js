const express = require('express');
const Contenedor = require('../containers/containers.js')
const router = express.Router();

let Productos = new Contenedor();

const producto_1 = { "title": "Escuadra",
"price": 125.45,
"thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"};

Productos.save(producto_1);
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
    try {
        const output = Productos.update(id,producto);
        res.status(200).send(output);
    } catch (Error) {
        res.status(400).send(Error.message);
    }
})

router.delete('/:id', (req,res) => {
    const id = req.params.id;
    try {
        const output = Productos.deleteById(id);
        res.send(output);
    } catch(Error) {
        res.status(400).send(Error.message);
    }
})

module.exports = router;