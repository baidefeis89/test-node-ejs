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
