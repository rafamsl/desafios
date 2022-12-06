const session = require('express-session');
const MongoStore=require('connect-mongo')
const MongoURI=process.env.MONGO_URI||'mongodb://localhost:477'
const mongoOptions={useNewUrlParser:true, useUnifiedTopology:true}

const sesiones={
    mongo:session({
        store:MongoStore.create({
            mongoUrl:`${MongoURI}?dbName=session`,
            mongoOptions,
            ttl:60,
            collectionName:'sessions'
        }),
        secret:'secret',
        resave: false,
        saveUninitialized: false
    })}

export {sesiones}