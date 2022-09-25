class Usuario{
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }
    getFullName() {
        return `${this.nombre} ${this.apellido}`
    }
    addMascota(mascota)  {
        this.mascotas.push(mascota)
    }
    countMascotas() {
        return this.mascotas.length
    }
    countBooks() {
        return this.libros.length
    }
    addBook(name,author) {
        this.libros.push({"name" : name, "author" : author})
    }
    getBookNames() {
        let output = []
        this.libros.forEach(book => {
            output.push(book["name"])
        })
        return output
    }
}

const mascotas = ['cachorro', 'tartaruga']
const libros = [{"name" : "Harry Potter", "author" : "JK Rowling"},{"name" : "Código Da Vinci", "author" : "Dan Brown"}]
rafael = new Usuario("Rafael","Lima",libros,mascotas)

nome = rafael.getFullName()

num_mascotas = rafael.countMascotas()
rafael.addMascota("gato")
new_num_mascotas = rafael.countMascotas()

num_books = rafael.countBooks()
rafael.addBook("Game of Thrones", "George R R Martin")
new_num_books = rafael.countBooks()

nombre_libros = rafael.getBookNames()

console.log(`El nombre completo del usuario es ${nome}
el usuario tenía ${num_mascotas} mascotas y ahora tiene ${new_num_mascotas}
el  usuario tenía ${num_books} libros y ahora tiene ${new_num_books}
sus libros son:
`)
nombre_libros.forEach(book =>{
    console.log(book)
})


