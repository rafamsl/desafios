const express = require('express');
const {Productos} = require('../model/models.js')
const router = express.Router();

// const producto_1 = { "title": "Escuadra",
// "price": 125.45,
// "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"};
// Productos.save(producto_1);


router.get('/all', async (req, res) => {
    const productos = await Productos.getAll("mysql")
    res.json({productos})
    // res.render('index.pug',{productos, page});
})

// router.get('/nuevo', async (req, res) => {
//     const productos = await Productos.getAll()
//     const page = "formulario"
//     res.render('index.pug',{page})
// })

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const productos = await Productos.getById(id);
        res.json({productos})
        // res.render('index.pug',{productos, page});
    } catch (Error) {
        res.status(400).send(Error.message);
    }

})
router.post('', async (req, res) => {
    const { title, price, thumbnail } = req.body;
    try {
        await Productos.save({title, price, thumbnail},"mysql");
        const productos = Productos.getAll();
        res.json({productos})
    } catch (Error) {
        res.status(400).send(Error.message);
    }  
})

router.put('/:id', async (req,res) => {
    const id = req.params.id;
    const producto = req.body;
    try {
        const output = await Productos.update(id,producto);
        res.status(200).json(output);
    } catch (Error) {
        res.status(400).send(Error.message);
    }
})

router.delete('/:id', (req,res) => {
    const id = req.params.id;
    try {
        Productos.deleteById(id);
        const productos = Productos.getAll()
        res.json({productos})
        // res.redirect('/api/productos');
    } catch(Error) {
        res.status(400).send(Error.message);
    }
})

module.exports = router;