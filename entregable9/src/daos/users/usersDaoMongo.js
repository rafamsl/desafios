import ContenedorMongo from "../../contenedores/contenedorMongo.js"
import { UsersModel } from "../../models/index.js"

class UsersMongo extends ContenedorMongo {

    constructor() {
        super({
          name: UsersModel.UsersCollection,
          schema: UsersModel.UsersSchema
        });
      }
}


export {UsersMongo}
