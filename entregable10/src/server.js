import express  from 'express'
import {config} from './config/index.js';
import { CarritoRouter, ProductoRouter, LoginRouter } from './routers/index.js';
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { ALL_HANDLERS } from "./handlers/index.js"
import session from 'express-session';
import MongoStore from 'connect-mongo'

 
const __dirname = "/Users/rafaellima/Documents/Backend/Coder House/desafios/entregable10/"
const app = express();
const httpServer = HttpServer(app);
const io = new IOServer(httpServer, {allowEIO3: true});
const PORT = process.env.PORT || 8080;
global.io = io
const mongoOptions={useNewUrlParser:true, useUnifiedTopology:true}

app.use(session({
	store:MongoStore.create({
		mongoUrl: config.DATABASES.mongo.url,
		mongoOptions,
		ttl:600,
		collectionName:'sessions'
	}),
	secret:'secret',
	resave: false,
	saveUninitialized: false
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/carritos",CarritoRouter)
app.use("/api/productos",ProductoRouter)
app.use("",LoginRouter)
app.use(express.static(__dirname+"/public"))

io.on('connection', clienteNuevo => {
	// Agrego al usuario conectado
	ALL_HANDLERS.userConnected(clienteNuevo, io)
	
	clienteNuevo.on('new product', newProd => {
		ALL_HANDLERS.newProduct(clienteNuevo, io, newProd)
	})

});

httpServer.listen(config.SERVER.PORT, () => {
	console.log(`Server running on PORT ${PORT}`);
});




export {__dirname, app}