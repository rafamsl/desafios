const options_prod = {
    client: 'mysql',
    connection : {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database : 'mibase'
    }
}
const options_msg = {
    client: "sqlite3",
    connection : {
        filename: './DB/mensajes.sqlite'},
    useNullAsDefault: true
}
module.exports = {
    options_prod,
    options_msg
}