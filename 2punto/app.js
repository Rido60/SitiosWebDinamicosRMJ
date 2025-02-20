const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Client = require('./models/Client');

const app = express();

// Configuración
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Para soportar PUT y DELETE
app.set('view engine', 'ejs');

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/clientes', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Rutas

//listar
app.get('/', async (req, res) => {
    const clients = await Client.find();
    res.render('index', { clients });
});

//nuevo
app.get('/clients/new', (req, res) => {
    res.render('create');
});

app.post('/clients', async (req, res) => {
    const { ci, nombres, apellidos, celular, correo } = req.body;
    await Client.create({ ci, nombres, apellidos, celular, correo });
    res.redirect('/');
});

//buscar un usuario
app.get('/clients/:id', async (req, res) => {
    const client = await Client.findById(req.params.id);
    res.render('show', { client });
});

//editar
app.get('/clients/:id/edit', async (req, res) => {
    const client = await Client.findById(req.params.id);
    res.render('edit', { client });
});

//actualizar
app.put('/clients/:id', async (req, res) => {
    const { ci, nombres, apellidos, celular, correo  } = req.body;
    await Client.findByIdAndUpdate(req.params.id, { ci, nombres, apellidos, celular, correo  });
    res.redirect('/');
});

//eliminar
app.delete('/clients/:id', async (req, res) => {
    await Client.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
