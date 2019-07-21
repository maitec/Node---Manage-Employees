const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

const usuarios = [
    { id: 1, name: "Bruce Wayne", email: "bruce@wayneenterpreises.com", address: "Gotham City", phone: 08009991111 },
    { id: 2, name: "Katniss Everdeen", email: "mockingjay@hotmail.com", address: "District 12", phone: 72536394 },
    { id: 3, name: "Hermione Granger", email: "hgranger@gmail.com", address: "Hogwarts", phone: 45885767 },
    { id: 4, name: "Frodo Bolson", email: "frodo@hobbit.com", address: "Hobbiton", phone: 928755556 },
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

app.get('/api/users', function(req, res){
    let busqueda = req.query.search;
    let usuariosFiltrados = [];
    function filtrarbusqueda (busq){
        usuarios.forEach(usuario => {
            if(usuario.name.includes(busq)){
                usuariosFiltrados.push(usuario)
            }else if(usuario.email.includes(busq)){
                usuariosFiltrados.push(usuario)
            }else if(usuario.address.includes(busq)){
                usuariosFiltrados.push(usuario)
            }else if(usuario.phone.includes(busq)){
                usuariosFiltrados.push(usuario)
            }
        })
        return usuariosFiltrados
    }
    console.log(usuariosFiltrados)
    res.json(filtrarbusqueda(busqueda))
})

app.put('/api/users/:id', function (req, res) {
    const id = req.params.id;
    //console.log("el id es ", id);
    const usuarioEditado = req.body;
    //console.log(req.body)
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