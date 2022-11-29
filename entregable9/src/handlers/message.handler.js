import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import { MessagesController } from "../controllers/messages/index.js"
import { normalizar_objects, messagesSchema } from "../normalizr/index.js"
import { DATE_UTILS } from "../utils/date-utils.js"


dayjs.extend(customParseFormat)

const newMessage = async (socket,io,newMsg) => {
    console.log("creating new msg")
    console.log(newMsg)
    newMsg.timestamp = DATE_UTILS.getTimestamp()
    await MessagesController.save_from_front(newMsg)
    const allMsg = await MessagesController.getAll()
    const normalizedMsg = await normalizar_objects(allMsg,messagesSchema)
    console.log(normalizedMsg)
    io.sockets.emit('all messages', normalizedMsg)
}

export  { newMessage }