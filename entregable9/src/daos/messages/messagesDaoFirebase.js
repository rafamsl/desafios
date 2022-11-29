import ContenedorFirebase from "../../contenedores/contenedorFirebase.js"

class MessagesFirebase extends ContenedorFirebase {

    constructor(table,db){
        super(table,db)
    }
}


export {MessagesFirebase}
