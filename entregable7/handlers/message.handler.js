
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat.js')
const {Mensajes} = require('../model/models.js')

dayjs.extend(customParseFormat)

const newMessage = async (socket,io,newMsg) => {
    const date = new Date()
    const dateFormated = dayjs(date).format('DD/MM/YYYY hh:mm:ss')
    await Mensajes.save({msg:newMsg, socketId: socket.id, createdAt: `${dateFormated} hs`},"sqlite3")
    const allMsg = await Mensajes.getAll("sqlite3")
    io.sockets.emit('all messages', allMsg)
}

module.exports = {
    newMessage
}