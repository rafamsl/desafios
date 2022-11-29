import normalizr from 'normalizr' 

const authorSchema = new normalizr.schema.Entity('author')

const messageSchema = new normalizr.schema.Entity('text', {
    author: authorSchema
})
const messagesSchema = new normalizr.schema.Entity('mensajes',[{
    mensaje: [messageSchema]
}])

export {messagesSchema,messageSchema,authorSchema}