import Contenedor from "./containers/container.js"
import express from 'express';
const app = express();
const PORT = process.env.PORT || 8000;

async function product_array() {
    const json_output = await Productos.getAll()
    const result = [];

    for(var i in json_output)
        result.push(json_output [i]);
    return result;
}

let Productos = new Contenedor("productos");

app.get('/productos', (req,res) => {
    product_array()
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
})

app.get('/productoRandom', (req,res) => {
    product_array()
    .then((data) => {
        const random = data[Math.floor(Math.random()*data.length)];
        res.send(random);
    })
    .catch((error) => res.send(error))
})

app.get('*', (req,res) => res.send('404'))

const server = app.listen(PORT,() => {
    console.log(PORT)
})

server.on("error", error => console.log(`Error : ${error}`))


