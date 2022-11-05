const fs = require('fs')
const { options_prod, options_msg } = require('../options/options.js')
const connection_prod = require('knex')(options_prod)
const connection_msg = require('knex')(options_msg)


class Contenedor{
    async crear_tabla_prod(){
        await connection_prod.schema.createTable(this.prod_tabla, table => {
            table.string('title',15).notNullable()
            table.string('thumbnail',255).notNullable()
            table.float('price')
            table.increments('id').notNullable()
        })
        .then(a => console.log(a))
        .catch(e => console.log(e.sqlMessage))
    }
    async crear_tabla_msg(){
        await connection_msg.schema.createTable(this.msg_tabla, table => {
            table.string('msg').notNullable()
            table.string('socketId').notNullable()
            table.string('createdAt')
            table.increments('id').notNullable()
        })
        .then(a => console.log(a + "tabla creada"))
        .catch(e => console.log(e))
    }
    
    constructor(filename) {
        this.archivo = `./DB/${filename}.txt`
        this.prod_tabla = "productos"
        this.msg_tabla = "mensaje"
    }

    async insert(tabla,objects,connection){
        await connection
        .from(tabla)
        .insert(objects)
        .then(data => console.log(data + "objectos guardados"))
        .catch(error => console.log(error))
    }

    async getAllFromDB(tabla,connection){
        return await connection
        .from(tabla)
        .select("*")
        .then(data => { return data} )
        .catch(error => {return error})
    }

    readData(path) {
        const data = JSON.parse(fs.readFileSync(path, 'utf-8')||'[]');
        return data;
    }
    writeData(objects) {
        fs.writeFileSync(this.archivo, JSON.stringify(objects, null, 2));
    }


    async getAll(db) {
        try {
            if(db==="mysql"){
                const info = await this.getAllFromDB(this.prod_tabla,connection_prod)
                return info
            }
            if(db==="sqlite3"){
                const info = await this.getAllFromDB(this.msg_tabla,connection_msg)
                return info
            }
            const data =  await this.readData(this.archivo);
            return data
        } catch (error) {
            if(error.code === 'ENOENT') {
                this.writeData([]);
            }
            return [];
        }
    }
    async getById(number) {
        const info = await this.getAll()
        const object = info.find(obj => obj.id === +number);
        if (object === undefined){
            throw new Error("Producto no encontrado");
        }
        return object
    }

    async getBySocketId(socketId) {
        const info = await this.getAll()
        const object = info.find(obj => obj.socketId === socketId);
        if (object === undefined){
            throw new Error("Usuario no encontrado");
        }
        return object
    }



    async save(object,db) {
        /// Comparar cada producto con object, para ver si ya existe
        const info = await this.getAll(db);
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

        

        object.id = id;

        /// subir objecto
        if (db === "mysql"){
            this.insert(this.prod_tabla,[object],connection_prod)
        }
        else if (db === "sqlite3"){
            this.insert(this.msg_tabla,[object],connection_msg)
        } else{
            info.push(object);
            this.writeData(info);
        }
        
        return id;
    }

    async update(number, data, db) {
        const info = await this.getAll();
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
try {
    Productos.crear_tabla_prod()}
catch(error){
    console.log(error)
}

let Mensajes = new Contenedor("mensajes")
try {
    Mensajes.crear_tabla_msg()}
catch(error){
    console.log(error)
}
let Usuarios = new Contenedor("usuarios")
module.exports = {
    Productos,
    Usuarios,
    Mensajes
}
