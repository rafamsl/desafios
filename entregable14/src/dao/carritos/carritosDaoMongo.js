import ContenedorMongo from "../../contenedores/contenedorMongo.js"
import { CartModel } from "../../models/model_carrito.js"

class CarritosMongo extends ContenedorMongo {

    constructor() {
        super({
          name: CartModel.CartCollection,
          schema: CartModel.CartSchema,
        });
      }
    
    async getById(id) {
        const response = await this.model.findById(id).populate("productos");
    
        return response;
    }
}


export {CarritosMongo}
