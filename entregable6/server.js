const express = require('express');
const path = require("path");
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const routerProductos = require('./routes/productos.js');
const { userConnected, userChangeAlias} = require('./handlers/user.handler.js')
const { newProduct } = require('./handlers/product.handler.js')
const { newMessage } = require('./handlers/message.handler.js')



const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer, {allowEIO3: true});
const PORT = process.env.PORT || 8080;
global.io = io

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use('/', routerProductos);




app.set('views', './public/views');
// app.set('view engine', 'pug');
app.use('/api', routerProductos);


io.on('connection', clienteNuevo => {
	// Agrego al usuario conectado
	userConnected(clienteNuevo, io)
	
	clienteNuevo.on('new product', newProd => {
		newProduct(clienteNuevo, io, newProd)
	})

	clienteNuevo.on('new msg', newMsg => {
		newMessage(clienteNuevo,io,newMsg)
	})
	clienteNuevo.on('change alias',alias => {
		userChangeAlias(clienteNuevo,io,alias)
	})
});

httpServer.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}`);
});