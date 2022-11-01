import express  from 'express'
import path from "path"

import routerProductos from './routes/productos.js'
import routerCarritos from './routes/carritos.js'
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarritos);

app.get("*", (req, res, next) => {
    try{
        req.status = 401
        throw new Error("Metodo no implementado")
    } catch(error){
        next(error)
    }});

app.use((err, req, res, next) => {
    res.status(req.status);
    res.json({ error: err.message, descripcion : 'ruta ' + req.path + ' método ' + req.method});
  });

const server = app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
server.on('error', err => console.log(`Error: ${err}`));


// Tests realizados

// 1. Llamar un carrito que no existe - OK
// 2. Llamar un producto que no existe - OK
// 3. Crear un producto - Ok
// 4. Crear un carrito - Ok
// 5. Agregar un producto al carrito - ok
// 6. Agregar un producto fuera de stock al carrito - ok
// 7. Deletar un producto del carrito - ok
// 8. Borrar todo el carrito - ok