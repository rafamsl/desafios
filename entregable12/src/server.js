import express  from 'express'
import {config} from './config/index.js';
import { CarritoRouter, ProductoRouter, LoginRouter, AuthRouter, ChildRouter } from './routers/index.js';
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { ALL_HANDLERS } from "./handlers/index.js"
import session from 'express-session';
import MongoStore from 'connect-mongo'
import passport from "passport"
import flash from "connect-flash"
import handlebars from "express-handlebars";
import {PassportAuth} from "./middlewares/passport/index.js"


const app = express();
const httpServer = HttpServer(app);
const io = new IOServer(httpServer, {allowEIO3: true});
global.io = io
const mongoOptions={useNewUrlParser:true, useUnifiedTopology:true}


app.use(flash())
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


// FRONTEND

const hbs = handlebars.engine({
	extname: '.hbs',
	defaultLayout: 'index.hbs'
  });
app.engine("hbs", hbs);
app.set("view engine", "hbs");
app.set("views", "./views");




// passport -> where can i store this? 
PassportAuth.init()
app.use(passport.initialize());
app.use(passport.session());


// ROUTES
app.use("/api/carritos",CarritoRouter)
app.use("/api/productos",ProductoRouter)
app.use("/api/auth",AuthRouter)
app.use("",LoginRouter)
app.use("/api/randoms",ChildRouter)

// WEBSOCKET

io.on('connection', clienteNuevo => {
	// Agrego al usuario conectado
	ALL_HANDLERS.userConnected(clienteNuevo, io)
	
	clienteNuevo.on('new product', newProd => {
		ALL_HANDLERS.newProduct(clienteNuevo, io, newProd)
	})

});

// SERVER
httpServer.listen(config.SERVER.PORT, () => {
	console.log(`Server running on PORT ${config.SERVER.PORT}`);
});




export { app}