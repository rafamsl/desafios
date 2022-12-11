import { config } from "../config/index.js"
import { CarritosFirebase, CarritosFS, CarritosMemoria, CarritosMongo } from "./carritos/index.js"
import { ProductosFirebase, ProductosFS, ProductosMemoria, ProductosMongo } from "./productos/index.js"
import { UsuariosMongo } from "./usuarios/index.js"
import { MongoDBService } from "../db/connections/mongoseconnection.js"



const getSelectedDaos = () => {
  switch (config.DAO) {
    case "mongo": {
      MongoDBService.init();
      return {
        ProductosDao: new ProductosMongo(),
        CarritosDao: new CarritosMongo(),
        UsuariosDao: new UsuariosMongo()
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
        UsuariosDao: new UsuariosMongo()
      };
    }
    case "memory": {
      return {
        ProductosDao: new ProductosMemoria(),
        CarritosDao: new CarritosMemoria(),
        UsuariosDao: new UsuariosMongo()
      };
    }
    case "firebase": {
      return {
        ProductosDao: new ProductosFirebase(config.DATABASES.firebase.PRODUCTS_FILENAME),
        CarritosDao: new CarritosFirebase(config.DATABASES.firebase.CARTS_FILENAME),
        UsuariosDao: new UsuariosMongo()
      }
    }
  }
};

const selectedDaos = getSelectedDaos()
const { ProductosDao, CarritosDao, UsuariosDao } = selectedDaos;
export { ProductosDao, CarritosDao,UsuariosDao }





