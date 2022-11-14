import { options } from "./db/options.js"

class Contenedor{
    constructor(tabla) {
        this.tabla = tabla
    }

    async insert(objects){
        return await options
        .from(this.tabla)
        .insert(objects)
        .then(data => {return data})
        .catch(error => {return error})
    }

    async modify(number,object){
        return await options
        .from(this.tabla)
        .where("id",number)
        .update(object)
        .then(data=>{return data})
        .catch(error => {return error})
    }

    async getAllFromDB(){
        return await options
        .from(this.tabla)
        .select("*")
        .then(data => { return data} )
        .catch(error => {return error})
    }

    async getBy(key, value){
        return await options
        .from(this.tabla)
        .select("*")
        .where(key,value)
        .then(data => {return data})
        .catch(error => {return error})
    }

    async getByCodigo(codigo){
        return await options
        .from(this.tabla)
        .select("*")
        .where("codigo",codigo)
        .then(data => {return data})
        .catch(error => {return error})
    }

    async deleteById(number){
        return await options
        .from(this.tabla)
        .where("id",number)
        .del()
        .then(data => {return data})
        .catch(error => {return error})
    }

    async getById(number) {
        return await options
        .from(this.tabla)
        .select("*")
        .where("id",number)
        .then(data => {return data})
        .catch(error => {return error})
    }

    // async update(number, data) {
    //     const info = await this.getAllFromDB();
    //     const objectIndex = info.findIndex((obj) => obj.id == number);
    //     if (objectIndex === -1) {
    //         throw new Error("Objeto no encontrado");
    //     }
    //     info[objectIndex] = data;
    //     info[objectIndex].id = +number;

    //     return await this.modify(number, data)
    // }




    // async save(object) {
    //     /// Comparar cada producto con object, para ver si ya existe
    //     const info = await this.getAllFromDB()
    //     info.forEach(producto => {
    //         if (object.codigo){
    //             if (object.codigo == producto.codigo){
    //                 return object.id;
    //             }
    //         }
    //     });
    //     await this.insert(object)
    //     return id;
    // }

}