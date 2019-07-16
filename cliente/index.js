let tableRows = [];

const name = document.getElementById('name');
const email = document.getElementById('email');
const address = document.getElementById('address');
const phone = document.getElementById('phone');
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

        document.getElementById('addButton').onclick = function agregar() {

            const nuevoUsuario = {
                name: name.value,
                email: email.value,
                address: address.value,
                phone: phone.value
            }

            fetch('http://localhost:3000/api/users', {
                method: 'POST',
                body: JSON.stringify(nuevoUsuario),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    })

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
                document.getElementById('saveButton').onclick = function editarDefinitivo(e) {
                    //e.preventDefault()

                    const usuarioEditado = {
                        name: editName.value,
                        email: editEmail.value,
                        address: editAddress.value,
                        phone: editPhone.value
                    }

                    fetch(`http://localhost:3000/api/users/${id}`, {
                        method: 'put',
                        body: JSON.stringify(usuarioEditado),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(res => res.json())
                        .then(data => {

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