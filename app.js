const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];


app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});


app.post('/usuarios', (req, res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        ...req.body
    };
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});


app.get('/usuarios/:nombre', (req, res) => {
    const usuario = usuarios.find(u => u.nombre.toLowerCase() === req.params.nombre.toLowerCase());
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
});


app.put('/usuarios/:nombre', (req, res) => {
    const index = usuarios.findIndex(u => u.nombre.toLowerCase() === req.params.nombre.toLowerCase());
    if (index !== -1) {
        usuarios[index] = { ...usuarios[index], ...req.body };
        res.json(usuarios[index]);
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
});


app.delete('/usuarios/:nombre', (req, res) => {
    const usuariosActualizados = usuarios.filter(u => u.nombre.toLowerCase() !== req.params.nombre.toLowerCase());
    if (usuariosActualizados.length < usuarios.length) {
        usuarios = usuariosActualizados;
        res.json({ mensaje: 'Usuario eliminado correctamente' });
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});