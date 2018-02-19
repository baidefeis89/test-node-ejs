let req = new XMLHttpRequest();

req.open('GET', '/tipos', true);
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
    
    window.location.href= `/inmuebles/${precio}/${superficie}/${habitaciones}`;
}

function submitCreate() {
    var formData = new FormData(document.getElementById('formulario'));

    $("#formulario").submit(function(e){
        e.preventDefault();
      });
    $.ajax({
        url:"/inmuebles",
        type:'POST',
        data: formData,
        contentType:false,
        cache:false,
        processData: false,
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.getItem('token'));
        },
        success: function(data) {
            $('#contenido').html(data);
        }
    });

}

function eliminar() {
    let peticion = new XMLHttpRequest();
    let id = document.getElementById('referencia').textContent;

    peticion.open('DELETE', '/inmuebles/' + id, true);
    peticion.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    peticion.send(null);
    
    peticion.onreadystatechange = evnt => {
        if (peticion.readyState == 4 && peticion.status == 200) {
            let body = document.getElementById('modal-body');
            let buttons = document.getElementById('modal-buttons');

            let res = JSON.parse(peticion.responseText);
            if (res.ok) {
                body.innerHTML = 'Inmueble borrado con éxito.';
                buttons.innerHTML = '';

                setTimeout( () => window.location.href = '/inmuebles', 1000);
            } else {
                body.innerHTML = '<span class="alert alert-danger">No se ha podido borrar.</span>';
            }
            console.log(res);
        } else if(peticion.readyState == 4 && peticion.status == 401) {
            window.location.href = '/unauthorized';
        }
    }
}

function submitLogin() {
    let data = {
        login: document.getElementById('login').value,
        password: document.getElementById('password').value
    };
    
    let peticion = new XMLHttpRequest();

    peticion.open('POST', '/usuarios/login', true);
    peticion.setRequestHeader('Content-type','application/json');
    peticion.send(JSON.stringify(data));
    
    peticion.onreadystatechange = evnt => {
        if (peticion.readyState == 4 && peticion.status == 200) {
            let respuesta = JSON.parse(peticion.responseText);

            if (respuesta.ok) {
                localStorage.setItem('token', respuesta.token);
                window.location.href = "/";
            } else {
                let alert = document.getElementById('errormsg');
                alert.classList.add('alert-danger');
                alert.innerHTML = respuesta.error;
            }
        }
    }
}



function registrar() {
    
    let data = {
        nombre: document.getElementById('nombre').value,
        login: document.getElementById('login').value,
        password: document.getElementById('password').value,
        password2: document.getElementById('password2').value
    }

    let peticion = new XMLHttpRequest();

    peticion.open('POST', '/usuarios/registro', true);
    peticion.setRequestHeader('Content-type','application/json');
    peticion.send(JSON.stringify(data));
    
    peticion.onreadystatechange = evnt => {
        if (peticion.readyState == 4 && peticion.status == 200) {
            console.log(peticion.responseText);
            try {
                let respuesta = JSON.parse(peticion.responseText);
                if (respuesta.error) {
                    document.getElementById('errorMsg').classList.add("alert-danger");
                    document.getElementById('errorMsg').innerHTML = respuesta.error;  
                    console.log(respuesta.error);
                }
            } catch(err) {
                window.location.href="/login";
            }
        }
    }
    
}
