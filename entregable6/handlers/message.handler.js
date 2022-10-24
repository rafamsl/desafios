const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
const {Mensajes} = require('../model/models.js')

dayjs.extend(customParseFormat)

const newMessage = async (socket,io,newMsg) => {
    const date = new Date()
    const dateFormated = dayjs(date).format('DD/MM/YYYY hh:mm:ss')
    await Mensajes.save({msg:newMsg, socketId: socket.id, createdAt: `${dateFormated} hs`})
    const allMsg = await Mensajes.getAll()
    io.sockets.emit('all messages', allMsg)
}

module.exports = {
    newMessage
}