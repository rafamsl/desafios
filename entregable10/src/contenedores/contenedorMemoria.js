class ContenedorMemoria {
    constructor() {
        this.datos = []
    }

    async getAll() {
        try {
            return this.datos;
        } catch (error) {
            console.log(error);
        }
    }
    async getById(number) {
        const info = await this.getAll()
        const object = info.find(obj => obj.id == +number);
        return object
    }
    async getByCodigo(codigo){
        const info = await this.getAll()
        const object = info.find(obj => obj.code == codigo)
        if (object === undefined){
            return null
        }
        return object
    }

    async save(object) {
        const info = await this.getAll()

        /// generar nuevo id
        const len = info.length;
        const id = len === 0 ? 1 :info[len - 1].id + 1;

        /// subir objecto
        object.id = +id;
        info.push(object);
        return object;
    }

    async update(id, newData) {
        const elementIndex = this.datos.findIndex((element) => element.id == id);
    
        if (elementIndex === -1) return null;
        console.log(this.datos)
        this.datos[elementIndex] = {
          ...this.datos[elementIndex],
          ...newData,
        };
        console.log(this.datos)
        return this.datos[elementIndex];
      }
    
    async deleteById(id) {
        console.log(id)
        console.log(this.datos)
        const objectIndex = this.datos.findIndex((element) => element.id == id);
        this.datos.splice(objectIndex,1)
        console.log(this.datos)
        return { success: true };
      }
}
export default ContenedorMemoria