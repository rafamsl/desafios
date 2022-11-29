import fs from 'fs'

class ContenedorFS{
    constructor(fileName) {
        this.archivo = `./db/${fileName}.json`;
    }

    async readData() {
        const data = await fs.promises.readFile(this.archivo, "utf8");
        return JSON.parse(data);
    }
    async writeData(objects) {
        try{
            await fs.promises.writeFile(this.archivo, JSON.stringify(objects, null, 2));
        } catch (error){
            console.log(error)
        }
        
    }


    async getByCodigo(codigo){
        const info = await this.getAll()
        const object = info.find(obj => obj.code == codigo)
        if (object === undefined){
            return null
        }
        return object
    }

    async getAll() {
    try {
        const data = await this.readData()
        return data;
    } catch (error) {
        if (error.code === "ENOENT") {
            await this.writeData([])
            return null;
        }
        console.log(error);
    }
    }
   async getById(number) {
        const info = await this.getAll()
        const object = info.find(obj => obj.id == +number);
        return object
    }

    async save(object) {
        console.log(object)
        /// Comparar cada producto con object, para ver si ya existe
        const info = await this.getAll();

        /// generar nuevo id
        const len = info.length;
        const id = len === 0 ? 1 :info[len - 1].id + 1;

        /// subir objecto
        object.id = +id;
        info.push(object);
        await this.writeData(info);
        return object;
    }

   async update(number, data) {
        const info = await this.getAll();
        const objectIndex = info.findIndex((obj) => obj.id == number);
        if (objectIndex === -1) {
            return null
        }
        info[objectIndex] = data;
        info[objectIndex].id = +number;
        await this.writeData(info);
        return info[objectIndex] 
    }

    async deleteById(number) {
        const info = await this.getAll();
        const objectIndex = info.findIndex((obj) => obj.id == number);
        if (objectIndex === -1) {
            return null
        }
        info.splice(objectIndex,1);
        await this.writeData(info);
        return "Objeto borrado"
    }
}
export default ContenedorFS

// export const Productos = new Contenedor("productos")

// class Carrito extends Contenedor {
    
//     async save(){
//         const carrito = {"productos" : []}
//         const id = await super.save(carrito)
//         return id
//     }

//     check_stock(order){
//         const producto = Productos.getByCodigo(order.codigo)
//         if(order.stock > producto.stock) {
//             return false
//         } else {
//             return true
//         }
//     }
//     compile_carrito(order, carrito){
//         const producto_existente = carrito.productos.findIndex(obj => obj.codigo == order.codigo)
//             if(producto_existente === -1){
//                 carrito.productos.push(order)
//              } else {
//                 carrito.productos[producto_existente].stock += order.stock
//             }
//         return carrito
//     }

//     update_stock(amount_order, operation, producto){
//         if(operation === "compra"){
//             producto.stock -= amount_order
//         }  
//         if(operation === "devolucion")
//         {
//             producto.stock += amount_order
//         }
        
//         Productos.update(producto.id,producto)
//     }

//     enrich_order(order,producto){
//         for (const property in producto) {
//             if (property != "stock"){
//                 order[property] = producto[property]
//             }
//           }
//         return order
//     }

//     deleteProduct(productos, id_producto){
//         const prodIndex = productos.findIndex((obj) => obj.id == id_producto);
//         if (prodIndex === -1) {
//             throw new Error("Producto no encontrado");
//         }
//         const returned_stock = productos[prodIndex].stock
//         productos.splice(prodIndex,1);
//         return productos, returned_stock
//     }

//     async addObjects(id, order){
//         order = order[0]
//         // check producto
//         let producto = ""
//         try {
//             producto = await Productos.getByCodigo(order.codigo)
//         } catch(Error){
//             return Error
//         }
        
//         // check_stock
//         if(this.check_stock(order,id) === false){
//             return "no hay stock"
//         }

//         // enrich order
//         order = this.enrich_order(order,producto)
//         // get original carrito
//         const carrito = super.getById(id)
//         // compile_carrito
//         const updated_carrito = this.compile_carrito(order,carrito)
//         // update_carrito
//         super.update(id,carrito)
//         // update_stock
//         this.update_stock(order.stock,"compra", producto)
//         return updated_carrito
        
//     }

//     async removeObjects(id_carrito, id_producto){
//         // get original carrito
//         const carrito = await super.getById(id_carrito) //DUPLICADO
//         const producto = await Productos.getById(id_producto)
//         // if not carrito -> throw error
//         // find and remove product in carrito
//         let returned_stock = 0
//         carrito.productos, returned_stock = await this.deleteProduct(carrito.productos,id_producto)
//         // if product not in carrito -> throw error
//         // update stock
//         await this.update_stock(returned_stock,"devolucion",producto)
//         // update carrito
//         try{
//             await super.update(id_carrito,carrito)
//             return carrito
//         }catch(Error){
//             return Error
//         }
        
//     }

//     async deleteCarrito(id_carrito){
//         const carrito = await super.getById(id_carrito)   
//         const productos = carrito.productos
//         productos.forEach(producto => {
//             this.removeObjects(id_carrito,producto.id)
//         })
//         super.deleteById(id_carrito)
//         return
//     }

// }

// export const Carritos = new Carrito("carritos")

