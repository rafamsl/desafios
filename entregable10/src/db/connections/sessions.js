import session from 'express-session';
import MongoStore from 'connect-mongo'
import { config } from '../../config/index.js';
import { app } from "../../server.js"

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

const sesion = "session created"
export default sesion