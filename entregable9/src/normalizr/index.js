import normalizr from 'normalizr' 
import util from 'util'

const normalizar = normalizr.normalize;
const desnormalizar = normalizr.denormalize;

async function normalizar_objects(objects,schema){
    const data_normalizada = normalizar(objects, schema)
    console.log('Data normalizada', JSON.stringify(data_normalizada))
    console.log('Data normalizada',data_normalizada )
    console.log('Length data normalizada', JSON.stringify(data_normalizada).length)
    return data_normalizada
}

async function desnormalizar_objects(data_normalizada, schema){
    const data_desnormalizada = desnormalizar(data_normalizada.result, schema, data_normalizada.entities)
    console.log('Data desnormalizada',util.inspect(data_desnormalizada,false,12,true))
    console.log('Length data desnormalizada', JSON.stringify(data_desnormalizada).length)
    return data_desnormalizada
}

export {normalizar_objects, desnormalizar_objects}
export {messagesSchema,messageSchema,authorSchema} from "./messages.js"