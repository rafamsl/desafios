import fs from 'fs'


class Contenedor{
    constructor(filename) {
        this.archivo = `./db/${filename}.txt`
    }


    async save(object) {
        try {
          const info = await this.getAll();
    
          const id =
            info.length === 0 ? 1 : info[info.length - 1].id + 1;
    
          object.id = id;
    
          info.push(object);
    
          await fs.promises.writeFile(
            this.archivo,
            JSON.stringify(info, null, 3)
          );
    
          return object.id;
        } catch (error) {
          console.log(error);
        }
      }

    async getById(number) {
      try {
        const info = await this.getAll()
        const object = info.find(obj => obj.id === number)
        return object
      } catch (error) {
        console.log(error)
      }
    }


    async getAll() {
        try {
            const file = await fs.promises.readFile(this.archivo);
            const info = JSON.parse(file);
            return info;
        } catch (error) {
            if(error.code === 'ENOENT') {
                await fs.promises.writeFile(this.archivo,JSON.stringify([],null,3));
                return [];
            }
            console.log(error)
        }
    }

      async deleteById(number) {
        try {
          const info = await this.getAll()
          const objectIndex = info.findIndex((obj) => obj.id === number)

          if(objectIndex === -1) console.log( "Producto no encontrado")

          info.splice(objectIndex,1)
          
          await fs.promises.writeFile(
            this.archivo,
            JSON.stringify(info, null, 3)
          )
        } catch (error) {
          console.log(error);
        }
      }
      async deleteAll() {
        try {
          await fs.promises.writeFile(this.archivo,JSON.stringify([],null,3));
        } catch (error) {
            console.log(error)
        }
      }

      async update(number, data) {
        const info = await this.getAll()

        const objectIndex = info.findIndex((obj) => obj.id === number)
        if (objectIndex === -1) {
          console.log("Producto no encontrado")
          return null
        }
        info[objectIndex] = data
        info[objectIndex].id = number
            
        await fs.promises.writeFile(
          this.archivo,
          JSON.stringify(info, null, 3)
        )
  
        return info[objectIndex]
      }
}


export default Contenedor
