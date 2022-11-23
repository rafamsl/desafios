import { config } from "./../config/index.js"
import { CarritosFirebase, CarritosFS, CarritosMemoria, CarritosMongo } from "./carritos/index.js"
import { ProductosFirebase, ProductosFS, ProductosMemoria, ProductosMongo } from "./productos/index.js"
import { MongoDBService } from "../db/connections/mongoseconnection.js"


const getSelectedDaos = () => {
  switch (config.DAO) {
    case "mongo": {
      MongoDBService.init();
      return {
        ProductosDao: new ProductosMongo(),
        CarritosDao: new CarritosMongo(),
      };
    }
    case "fs": {
      return {
        ProductosDao: new ProductosFS(
          config.DATABASES.filesystem.PRODUCTS_FILENAME
        ),
        CarritosDao: new CarritosFS(
          config.DATABASES.filesystem.CARTS_FILENAME
        ),
      };
    }
    case "memory": {
      return {
        ProductosDao: new ProductosMemoria(),
        CarritosDao: new CarritosMemoria()
      };
    }
    case "firebase": {
      return {
        ProductosDao: new ProductosFirebase(config.DATABASES.firebase.PRODUCTS_FILENAME),
        CarritosDao: new CarritosFirebase(config.DATABASES.firebase.CARTS_FILENAME)
      }
    }
    case "mongo":{
      return {
        ProductosDao: new ProductosFirebase(config.DATABASES.firebase.PRODUCTS_FILENAME),
        CarritosDao: new CarritosFirebase(config.DATABASES.firebase.CARTS_FILENAME)
      }
    }
  }
};

const { ProductosDao, CarritosDao } = getSelectedDaos();

export { ProductosDao, CarritosDao }





