import ContenedorFirebase from "../../contenedores/contenedorFirebase.js"

class UsersFirebase extends ContenedorFirebase {

    constructor(table,db){
        super(table,db)
    }
}


export {UsersFirebase}
