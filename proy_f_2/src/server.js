import express  from 'express'
import {config} from './config/index.js';
import { CarritoRouter } from './routers/index.js';
import { ProductoRouter } from './routers/productos/index.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/carritos",CarritoRouter)
app.use("/api/productos",ProductoRouter)



const server = app.listen(config.SERVER.PORT, () => console.log(`Server running on port ${server.address().port}`));
server.on('error', err => console.log(`Error: ${err}`))