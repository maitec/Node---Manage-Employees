let tableRows = [];


const form = document.querySelector("form");
const editName = document.getElementById('editName');
const editEmail = document.getElementById('editEmail');
const editAddress = document.getElementById('editAddress');
const editPhone = document.getElementById('editPhone');

fetch('http://localhost:3000/api/users')
    .then(res => res.json())
    .then(data => {

        tableRows = data.map(function (u) {
            return `<tr id="${u.id}">
        <td><input type="checkbox"></td>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.address}</td>
        <td>${u.phone}</td>
        <td>
            <i class="material-icons edit" title="Edit" data-toggle="modal" data-target="#editEmployee" onclick=editar(${u.id})></i>
            <i class="material-icons delete" title="Delete" data-toggle="modal" data-target="#deleteEmployee" onclick=eliminar(${u.id})></i>
        </td>
    </tr>`
        });

        document.querySelector('tbody').innerHTML = tableRows.join('');
    })


// form.onsubmit = function(event){
//     event.preventDefault();

//     if(name.value.length > 30){
//         name.classList.add("error")
//     }
// }  

function editar(id) {
    fetch(`http://localhost:3000/api/users`)
        .then(res => res.json())
        .then(data => {

            data.forEach(registro => {
                if (registro.id === id) {
                    editName.value = registro.name;
                    editEmail.value = registro.email;
                    editAddress.value = registro.address;
                    editPhone.value = registro.phone;
                }
                document.getElementById('saveButton').onclick = function editarDefinitivo() {
                    const usuarioEditado = {
                        name: editName.value,
                        email: editEmail.value,
                        address: editAddress.value,
                        phone: editPhone.value
                    }
                    //console.log("el nombre editado es ", usuarioEditado);

                    fetch(`http://localhost:3000/api/users/${id}`, {
                        method: 'put',
                        body: JSON.stringify(usuarioEditado),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            const elementoEditado = document.getElementById('id');
                            console.log("el elemeto editado es ",elementoEditado );
                            
                        })
                }
            })
        })
}


function eliminar(id) {

    document.getElementById('deleteButton').onclick = function eliminarDefinitivo() {
        fetch(`http://localhost:3000/api/users/${id}`, { method: 'delete' })
            .then(res => {
                document.getElementById(id).remove();
            });
    };
}