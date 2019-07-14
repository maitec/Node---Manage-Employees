const express = require('express');
const cors = require('cors'); 

const app = express();

app.use(cors());

app.use(express.json());

const usuarios = [
    {id: 1, name: "Bruce Wayne 1", email: "bruce@wayneenterpreises.com", address: "Gotham City", phone: 08009991111},
    {id: 2, name: "Bruce Wayne 2", email: "bruce@wayneenterpreises.com", address: "Gotham City", phone: 08009991111},
    {id: 3, name: "Bruce Wayne 3", email: "bruce@wayneenterpreises.com", address: "Gotham City", phone: 08009991111},
    {id: 4, name: "Bruce Wayne 4", email: "bruce@wayneenterpreises.com", address: "Gotham City", phone: 08009991111}
];

app.get('/api/users', function(req,res){
    res.json(usuarios);
})

app.delete('/api/users/:id', function(req,res){
    console.log(req.params.id);
    for(let i=0; i<usuarios.length; i++){
        if(usuarios[i].id == req.params.id){
            usuarios.splice(i, 1);
        }
    }
    res.json(usuarios);
})





app.listen(3000);