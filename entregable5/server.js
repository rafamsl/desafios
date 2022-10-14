const express = require('express');
const app = express();

const PORT = 8080;
const server = app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
server.on('error', err => console.log(`Error: ${err}`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const routerProductos = require('./routes/productos.js');
app.set('views', './views');
app.set('view engine', 'pug');
app.use('/api/productos', routerProductos);

app.get("/", (req, res) =>
  res.send(`<p><strong><span style="font-size: 22px; color: rgb(41, 105, 176);">Welcome to our shop API! </span></strong><br><br><u><span style="color: rgb(41, 105, 176);">Available endpoints:</span></u></p>
<ol>
    <li style="color: rgb(41, 105, 176);">GET<ol style="color: initial;">
            <li style="color: rgb(41, 105, 176);">/api/productos &nbsp;-&gt; shows all products</li>
            <li style="color: rgb(41, 105, 176);">/api/productos/:id -&gt; search a product by id</li>
        </ol>
    </li>
    <li style="color: rgb(41, 105, 176);">PUT<ol style="color: initial;">
            <li style="color: rgb(41, 105, 176);">/api/productos/:id -&gt; updates product by id with &quot;body&quot;</li>
        </ol>
    </li>
    <li style="color: rgb(41, 105, 176);">DELETE<ol style="color: initial;">
            <li style="color: rgb(41, 105, 176);">/api/productos:id -&gt; delete product by id</li>
        </ol>
    </li>
    <li style="color: rgb(41, 105, 176);">POST<ol style="color: initial;">
            <li style="color: rgb(41, 105, 176);">/api/productos -&gt; creates product with &quot;body&quot; and returns id</li>
        </ol>
    </li>
</ol>
<p><strong>-&gt;&gt; Or create a new product using this <a href="http://localhost:8080/formularios">form</a></strong></p`)
);

app.get("*", (req, res) => res.send(`Ops 404...`));