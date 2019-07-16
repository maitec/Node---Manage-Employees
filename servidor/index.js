const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

const usuarios = [
    { id: 1, name: "Bruce Wayne 1", email: "bruce@wayneenterpreises.com", address: "Gotham City", phone: 08009991111 },
    { id: 2, name: "Bruce Wayne 2", email: "bruce@wayneenterpreises.com", address: "Gotham City", phone: 08009991111 },
    { id: 3, name: "Bruce Wayne 3", email: "bruce@wayneenterpreises.com", address: "Gotham City", phone: 08009991111 },
    { id: 4, name: "Bruce Wayne 4", email: "bruce@wayneenterpreises.com", address: "Gotham City", phone: 08009991111 },
    { id: 5, name: "Bruce Wayne 5", email: "bruce@wayneenterpreises.com", address: "Gotham City", phone: 08009991111 },
];

let ID = 9;

app.get('/api/users', function (req, res) {
    res.json(usuarios);
})

app.post('/api/users', function (req,res) {
    const nuevoUsuario = req.body;
    nuevoUsuario.id = ID++;
    usuarios.push(nuevoUsuario);
    res.json(nuevoUsuario)
})

app.put('/api/users/:id', function (req, res) {
    const id = req.params.id;
    console.log("el id es ", id);
    const usuarioEditado = req.body;
    console.log(req.body)
    usuarios.forEach(usuario => {
        if (usuario.id == id) {
            usuario.name = usuarioEditado.name;
            usuario.email = usuarioEditado.email;
            usuario.address = usuarioEditado.address;
            usuario.phone = usuarioEditado.phone;
            return res.json(usuario)
        }
    })
})

app.delete('/api/users/:id', function (req, res) {
    //console.log(req.params.id);
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].id == req.params.id) {
            usuarios.splice(i, 1);
            i--;
        }
    }
    res.json(usuarios);
})


app.listen(3000);