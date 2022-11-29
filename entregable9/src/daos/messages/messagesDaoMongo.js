import ContenedorMongo from "../../contenedores/contenedorMongo.js"
import { MessageModel } from "../../models/index.js"

class MessagesMongo extends ContenedorMongo {

    constructor() {
        super({
          name: MessageModel.MessagesCollection,
          schema: MessageModel.MessageSchema
        });
      }
}


export {MessagesMongo}
