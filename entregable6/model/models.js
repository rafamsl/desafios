const fs = require('fs');

class Contenedor{
    constructor(filename) {
        this.archivo = `./db/${filename}.txt`
    }

    readData(path) {
        const data = JSON.parse(fs.readFileSync(path, 'utf-8')||'[]');
        return data;
    }
    writeData(objects) {
        fs.writeFileSync(this.archivo, JSON.stringify(objects, null, 2));
    }

    getAll() {
        try {
            const data =  this.readData(this.archivo);
            return data
        } catch (error) {
            if(error.code === 'ENOENT') {
                this.writeData([]);
            }
            return [];
        }
    }
    getById(number) {
        const info = this.getAll()
        const object = info.find(obj => obj.id === +number);
        if (object === undefined){
            throw new Error("Producto no encontrado");
        }
        return object
    }

    getBySocketId(socketId) {
        const info = this.getAll()
        const object = info.find(obj => obj.socketId === socketId);
        if (object === undefined){
            throw new Error("Usuario no encontrado");
        }
        return object
    }



    save(object) {
        /// Comparar cada producto con object, para ver si ya existe
        const info = this.getAll();
        info.forEach(producto => {
            if (object.thumbnail){
                if (object.thumbnail === producto.thumbnail){
                    throw new Error("Producto ya existente");
                }
            }
            
        });
        /// generar nuevo id
        const len = info.length;
        const id = len === 0 ? 1 :info[len - 1].id + 1;

        /// subir objecto
        object.id = id;
        info.push(object);
        this.writeData(info);
        return id;
    }

    update(number, data) {
        const info = this.getAll();
        const objectIndex = info.findIndex((obj) => obj.id == +number);
        if (objectIndex === -1) {
            throw new Error("Producto no encontrado");
        }
        info[objectIndex] = data;
        info[objectIndex].id = number;
        this.writeData(info);
        return "Producto actualizado"
    }

    deleteById(number) {
        const info = this.getAll();
        const objectIndex = info.findIndex((obj) => obj.id == number);
        if (objectIndex === -1) {
            throw new Error("Producto no encontrado");
        }
        info.splice(objectIndex,1);
        this.writeData(info);
        return "Producto borrado"
    }
}

let Productos = new Contenedor("productos")
let Usuarios = new Contenedor("usuarios")
let Mensajes = new Contenedor("mensajes")

module.exports = {
    Productos,
    Usuarios,
    Mensajes
}
