import firebaseconnect from "../db/connections/firebaseconnection.cjs"

class ContenedorFirebase{
    constructor(table) {
        firebaseconnect()
        .then(db=>{this.collection = db.collection(table)})
        
    }

    async getAll(){
        try{
            
            const document= await this.collection.get()
            return document.docs.map(doc =>{ return {...doc.data(), id:doc.id}} )
        } catch(error){
            console.log(error)
        }
    }

    async save(data){
        try{
            const document=this.collection.doc()
            // nos brinda un documento temporal con un id autogenerado
            await document.create(data)
            // ese documento le agrega datos y lo guarda
            data.id = "objecto creado. buscar id por otra forma"
            return data
        }
        catch(e){
            console.error('Error al crear documento: ',e);
        }
    }

    async getById(id){
        try{
            const document=await this.collection.doc(String(id)).get()
            return document.data()
        }
        catch(e){
            console.error('Error al buscar un documento: ',e);
        }
    
    }
    async getByCodigo(codigo){
        return null //did not find how to search specific variable on firebase
    }
    async update(id,data){
        try{
            const document= this.collection.doc(String(id))
            await document.update(data)
            return data
        } catch(error){
            console.log(error)
        }
    }

    async deleteById(id){
        try{
            const document= this.collection.doc(id)
            await document.delete()
            return { success: true }
        } catch(error){
            console.log(error)
        }
    }

}

export default ContenedorFirebase