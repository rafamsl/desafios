import { newMessage } from "./message.handler.js"
import { newProduct } from "./product.handler.js"
import { userConnected } from "./user.handler.js"
export const ALL_HANDLERS = { newMessage, newProduct, userConnected}