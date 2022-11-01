
Existing APIs

api/productos

- GET "" -> muestra todos los productos
- GET "/:id" -> muestra producto con ID
- POST "/" -> requiere "?admin=true" - agrega producto al stock
- PUT "/.id" -> requiere "?admin=true" - edita producto
- DELETE "/.id" -> requiere "?admin=true" - borra producto

api/carrito

- POST "" -> crea carrito nuevo y devuelve id
- GET "/" -> muestra todos los carritos
- GET "/:id" -> muestra carrito especifico por id
- GET "/:id/productos" -> muestra productos de carrito especifico por id
- POST "/:id" -> si hay stock, agrega producto al carrito y edita stock 
- DELETE "/:id/productos/:id_producto" -> borra producto del carrito y devuelve stock
- DELETE "/:id" -> borra todos productos del carrito, devuelve stock, y borra el carrito
