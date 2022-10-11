const express = require('express');
const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
server.on('error', err => console.log(`Error: ${err}`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routerProductos = require('./routes/productos.js');
app.use('/api/productos', routerProductos);
app.use('/formularios', express.static(__dirname+'/public/index.html'));
