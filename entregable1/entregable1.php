<?php
class Libro{
    public function __construct($nombre, $autor) {
        $this->nombre = $nombre;
        $this->autor = $autor;
      }
    }
class Usuario{
    public function __construct($nombre, $apellido, $libros, $mascotas) {
        $this->nombre = $nombre;
        $this->apellido = $apellido;
        $this->libros = $libros;
        $this->mascotas = $mascotas;
      }
    
    public function getFullName() {
        return $this->nombre . " " . $this->apellido;
    }
    public function addMascota($mascota)  {
        array_push($this->mascotas,$mascota);
    }
    public function countMascotas() {
        return count($this->mascotas);
    }
    public function countBooks() {
        return count($this->libros);
    }
    public function addBook($new_book) {
        array_push($this->libros,$new_book);
    }
    public function getBookNames() {
        $output = array();
        foreach ($this->libros as $libro) {
            array_push($output,$libro->nombre);
          }
        return $output;
    }
}

$mascotas = array('cachorro', 'tartaruga');
$hp = new Libro("Harry Potter", "JK Rowling");
$cdv = new Libro("Codigo Da Vinci", "Dan Brown");
$libros = array($hp, $cdv);
$rafael = new Usuario("Rafael","Lima",$libros,$mascotas);

$nome = $rafael->getFullName();

$num_mascotas = $rafael->countMascotas();
$rafael->addMascota("gato");
$new_num_mascotas = $rafael->countMascotas();

$num_books = $rafael->countBooks();
$got = new Libro("Game of Thrones", "George R R Martin");
$rafael->addBook($got);
$new_num_books = $rafael->countBooks();

$nombre_libros = $rafael->getBookNames();

echo "El nombre completo del usuario es " . $nome;
echo "<br>";
echo "El usuario tenía " . $num_mascotas . " mascotas y ahora tiene " . $new_num_mascotas;
echo "<br>";
echo "El usuario tenía " . $num_books . " libros y ahora tiene " . $new_num_books;
echo "<br>";
echo "Sus libros son ";
print implode(", ", $nombre_libros);


