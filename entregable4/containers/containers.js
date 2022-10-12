class Contenedor{
    constructor() {
        this.productos = [];
    }

    getAll() {
        return this.productos;
    }
    getById(number) {
        let object = this.productos.find(obj => obj.id === +number);
        if (object === undefined){
            throw new Error("Producto no encontrado");
        }
        return object;
      }

    save(object) {
        /// Comparar cada producto con object, para ver si ya existe
        this.productos.forEach(producto => {
            /// deletar id, para poder comparar
            if (object.thumbnail === producto.thumbnail){
                throw new Error("Producto ya existente");
            }
        });
        /// generar nuevo id
        const len = this.productos.length;
        const id = len === 0 ? 1 : this.productos[len - 1].id + 1;

        /// subir objecto
        object.id = id;
        this.productos.push(object);
        return object.id;
    }

    update(number, data) {
        
        const objectIndex = this.productos.findIndex((obj) => obj.id == number)
        if (objectIndex === -1) {
          throw new Error("Producto no encontrado");
        }
        this.productos[objectIndex] = data;
        this.productos[objectIndex].id = number;
        return "Producto actualizado";
    }

    deleteById(number) {
        const objectIndex = this.productos.findIndex((obj) => obj.id == number)
        if (objectIndex === -1) {
          throw new Error("Producto no encontrado");
        }
        this.productos.splice(objectIndex,1);
        return "Producto eliminado";
      }

}


module.exports = Contenedor;
