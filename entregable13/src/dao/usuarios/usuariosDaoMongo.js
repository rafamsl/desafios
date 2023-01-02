import ContenedorMongo from "../../contenedores/contenedorMongo.js"
import { UserModel } from "../../models/index.js"

class UsuariosMongo extends ContenedorMongo {

    constructor() {
        super({
          name: UserModel.UserCollection,
          schema: UserModel.UserSchema,
        });
      }
    
    
}


export {UsuariosMongo}
