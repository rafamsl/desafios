import Contenedor from "./containers/container.js"

let Casa1 = {
    title : 'Brasilia',
    year : 1987,
    thumbnail : '709N'}
let Casa2 = {
    title : 'Brasilia',
    year : 1991,
    thumbnail : '116N'}
let Casas = new Contenedor("casas")

// test

// // Get All
// await Casas.getAll()
//     .then((data) => console.log({data}))
//     .catch((error) => console.log({error}))

// // Save

// await Casas.save(Casa1)
//     .then((data) => console.log({data}))
//     .catch((error) => console.log({error}))
// await Casas.save(Casa2)
//     .then((data) => console.log({data}))
//     .catch((error) => console.log({error}))


// // // Get by ID
// await Casas.getById(1)
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error))

// // Delete by ID
// await Casas.deleteById(3)

// // // Delete ALl
// await Casas.deleteAll()

// // Update
// await Casas.update(5,Casa1)
//     .then((data) => console.log({data}))
//     .catch((error) => console.log(error))


