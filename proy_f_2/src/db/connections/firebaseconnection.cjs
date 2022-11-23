"use strict";

const admin = require("firebase-admin");

const serviceAccount = require("./firebaseconfig.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firebaseconnect = async()=>{
	try{
		const db= admin.firestore();
		console.log('FIREBASE CONECTADO')
		return db
	}
	catch(e){
		console.log('ERROR AL CONECTAR A FIREBASE ',e)
	}

}

module.exports = firebaseconnect;