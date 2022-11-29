import { config } from "./../config/index.js"
import { ProductosFirebase, ProductosFS, ProductosMemoria, ProductosMongo } from "./products/index.js"
import { MessagesFirebase, MessagesFS, MessagesMemoria, MessagesMongo } from "./messages/index.js"
import { UsersFirebase, UsersFS, UsersMemoria, UsersMongo} from "./users/index.js"
import { MongoDBService } from "../db/connections/mongoseconnection.js"


const getSelectedDaos = () => {
  switch (config.DAO) {
    case "mongo": {
      MongoDBService.init();
      return {
        ProductosDao: new ProductosMongo(),
        MessagesDao: new MessagesMongo(),
        UsersDao: new UsersMongo(),
      };
    }
    case "fs": {
      return {
        ProductosDao: new ProductosFS(
          config.DATABASES.filesystem.PRODUCTS_FILENAME
        ),
        MessagesDao: new MessagesFS(
          config.DATABASES.filesystem.MESSAGES_FILENAME
        ),
        UsersDao: new UsersFS(
          config.DATABASES.filesystem.USERS_FILENAME
        )
      };
    }
    case "memory": {
      return {
        ProductosDao: new ProductosMemoria(),
        MessagesDao: new MessagesMemoria(),
        UsersDao: new UsersMemoria()
      };
    }
    case "firebase": {
      return {
        ProductosDao: new ProductosFirebase(config.DATABASES.firebase.PRODUCTS_FILENAME),
        MessagesDao: new MessagesFirebase(config.DATABASES.firebase.MESSAGES_FILENAME),
        UsersDao: new UsersFirebase(config.DATABASES.firebase.USERS_FILENAME)
      }
    }
  }
};

const { ProductosDao, MessagesDao, UsersDao } = getSelectedDaos();

export { ProductosDao, MessagesDao, UsersDao }





