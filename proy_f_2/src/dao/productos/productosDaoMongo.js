import ContenedorMongo from "../../contenedores/contenedorMongo.js"
import { ProductModel} from "../../models/model_producto.js"

class ProductosMongo extends ContenedorMongo {

    constructor() {
        super({
          name: ProductModel.ProductsCollection,
          schema: ProductModel.ProductSchema,
        });
      }
}


export {ProductosMongo}
