import express  from 'express'
import { ProductoRouter } from './routers/index.js';
import path from "path"
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { ALL_HANDLERS } from "./handlers/index.js"

const __dirname = "/Users/rafaellima/Documents/Backend/Coder House/desafios/entregable10/"
const app = express();
const httpServer = HttpServer(app);
const io = new IOServer(httpServer, {allowEIO3: true});
const PORT = process.env.PORT || 8080;
global.io = io

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos",ProductoRouter)
app.use(express.static(__dirname+"/public"))

io.on('connection', clienteNuevo => {
	// Agrego al usuario conectado
	ALL_HANDLERS.userConnected(clienteNuevo, io)
	
	clienteNuevo.on('new product', newProd => {
		ALL_HANDLERS.newProduct(clienteNuevo, io, newProd)
	})

});

httpServer.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}`);
});