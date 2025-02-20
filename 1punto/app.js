const express = require('express');
const bodyParser = require('body-parser');
const bd = require('./bd.js');

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true})); // para leer los datos del formularios

app.set('view engine', 'ejs');//configurar ejs como motor de plantillas
app.use(express.static('public'));//configurar la carpeta publica

//Pagina de inicio
app.get('/', (req, res) => {
    res.sendFile('bienvenido.html', {root: __dirname + '/public'});
});

//Pagina de cards de productos
app.get('/productos', (req, res) => {
    bd.query('SELECT * FROM productos', (error, producto) => {
        if(error){
            console.log('Error al obtener los productos cards');
            return;
        }
        res.render('productos', { producto });
    });
});


//pagina para ver solo un producto ampliado
app.get('/ver/:id', (req, res) => {
    const id = req.params.id;
    bd.query('SELECT * FROM productos WHERE id = ?', [id], (error, producto) => {
        if(error){
            console.log('Error al obtener el producto');
            return;
        }
        res.render('ver', { producto: producto[0] });
    });
});

//Pagina de productos
app.get('/listar', (req, res) => {
    bd.query('SELECT * FROM productos', (error, producto) => {
        if(error){
            console.log('Error al obtener los productos');
            return;
        }
        res.render('listar', { producto });
    });
});
/////////modificar producto a todo

//Formulario para agregar productos
app.get('/agregar', (req, res) => {
    res.render('agregar');
});

//Agregar productos
app.post('/agregar', (req, res) => {
    const {nombre, precio,imagen,detalle} = req.body;

    bd.query('INSERT INTO productos (nombre, precio, imagen, detalle) VALUES (?,?,?,?)', [nombre,precio,imagen,detalle], (error, resultado) => {
        if(error){
            console.log('Error al agregar el producto');
            return;
        }
        res.redirect('/listar');
    });
});

//Formulario para editar persona
app.get('/editar/:id', (req, res) => {
    const id = req.params.id;
    bd.query('SELECT * FROM productos WHERE id = ?', [id], (error, producto) => {
        if(error){
            console.log('Error al obtener el producto');
            return;
        }
        res.render('editar', { producto: producto[0] });
    });
});
//Editar producto
app.post('/editar/:id', (req, res) => {
    const id = req.params.id;
    const {nombre, precio, imagen, detalle} = req.body;

    bd.query('UPDATE productos SET nombre = ?, precio = ?, imagen = ?, detalle = ? WHERE id = ?', [nombre,precio,imagen,detalle,id], (error, resultado) => {
        if(error){
            console.log('Error al editar el producto');
            return;
        }
        res.redirect('/listar');
    });
});

//Eliminar producto
app.get('/eliminar/:id', (req, res) => {
    const id = req.params.id;
    bd.query('DELETE FROM productos WHERE id = ?', [id], (error, resultado) => {
        if(error){
            console.log('Error al eliminar el producto');
            return;
        }
        res.redirect('/listar');
    });
});

//iniciar servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});