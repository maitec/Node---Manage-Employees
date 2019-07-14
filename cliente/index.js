const form = document.querySelector("form");
const name = document.getElementById('name');
const email = document.getElementById('email');
const address = document.getElementById('address');
const phone = document.getElementById('phone');

fetch('http://localhost:3000/api/users')
.then(res => res.json())
.then(data =>{

    const tableRows = data.map(function(u){
        return `<tr id="${u.id}">
        <td><input type="checkbox"></td>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.address}</td>
        <td>${u.phone}</td>
        <td>
            <i class="material-icons edit" data-toggle="tooltip" title="Edit"></i>
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


function eliminar(id) {
    
    document.getElementById('deleteButton').onclick = function eliminarDefinitivo(){
        fetch(`http://localhost:3000/api/users/${id}`, { method: 'delete' })
        .then(res => {
          document.getElementById(id).remove();
        });
    };
  
  }
  