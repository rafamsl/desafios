import ContenedorMongo from "../../contenedores/contenedorMongo.js"
import { ProductModel } from "../../models/index.js"

class ProductosMongo extends ContenedorMongo {

    constructor() {
        super({
          name: ProductModel.ProductsCollection,
          schema: ProductModel.ProductSchema,
        });
      }
}


export {ProductosMongo}
