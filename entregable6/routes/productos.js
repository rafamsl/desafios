const express = require('express');
const {Productos} = require('../model/models.js')
const router = express.Router();

// const producto_1 = { "title": "Escuadra",
// "price": 125.45,
// "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"};
// Productos.save(producto_1);


router.get('', (req, res) => {
    console.log(Productos)
    const productos = Productos.getAll();
    const page = "productos"
    res.render('index.pug',{productos, page});
})

router.get('/nuevo', (req, res) => {
    const productos = Productos.getAll()
    const page = "formulario"
    res.render('index.pug',{page})
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    try {
        const productos = [Productos.getById(id)];
        const page = "productos"
        res.render('index.pug',{productos, page});
    } catch (Error) {
        res.status(400).send(Error.message);
    }

})
router.post('', (req, res) => {
    const { title, price, thumbnail } = req.body;
    try {
        Productos.save({title, price, thumbnail});
        console.log("nuevo producto agregado ruta")
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
        Productos.deleteById(id);
        res.redirect('/api/productos');
    } catch(Error) {
        res.status(400).send(Error.message);
    }
})

module.exports = router;