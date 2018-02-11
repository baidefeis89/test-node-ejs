let req = new XMLHttpRequest();

req.open('GET', 'http://localhost:8080/tipos', true);
req.send(null);

req.onreadystatechange = evnt => {
    if (req.readyState == 4 && req.status == 200) {
        let tipos = JSON.parse(req.responseText).tipos;
        let menu = document.getElementById('dropdown-menu');

        tipos.forEach(tipo => {
            menu.innerHTML += `<a class="dropdown-item" href="/inmuebles/tipo/${tipo._id}">Ver ${tipo.tipo}</a>`
        });
    }
}

function send() {
    let precio = document.getElementById('precio').value;
    let habitaciones = document.getElementById('habitaciones').value;
    let superficie = document.getElementById('superficie').value;
    
    window.location.href= `http://localhost:8080/inmuebles/${precio}/${superficie}/${habitaciones}`;
}

function eliminar() {
    let peticion = new XMLHttpRequest();
    let id = document.getElementById('referencia').textContent;

    peticion.open('DELETE', 'http://localhost:8080/inmuebles/' + id, true);
    peticion.send(null);
    
    peticion.onreadystatechange = evnt => {
        if (peticion.readyState == 4 && peticion.status == 200) {
            let body = document.getElementById('modal-body');
            let buttons = document.getElementById('modal-buttons');

            let res = JSON.parse(peticion.responseText);
            if (res.ok) {
                body.innerHTML = 'Inmueble borrado con éxito.';
                buttons.innerHTML = '';

                setTimeout( () => window.location.href = 'http://localhost:8080/inmuebles', 1000);
            } else {
                body.innerHTML = '<span class="alert alert-danger">No se ha podido borrar.</span>';
            }
            console.log(res);
        }
    }
}
