// captura de formulario

const formRegistro = document.getElementById('signupForm');

formRegistro.addEventListener('submit', (e) => {
    e.preventDefault();

    // captura de los datos insertados en los input's del form
    const name = document.getElementById('name').value.trim().toLowerCase();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value.trim();

    // validación de datos ingrersados completos

    if(!name || !email || !password){
        alert('Favor ingresar todos los datos completos');
        return;
    }

    // validación de password minimo 8 caracteres
    // if(password.length <8){
    //     alert('Contraseña debil, debe contener minimo 8 caracteres');
    //     return;
    // }

    // // validación de password con politicas de seguridad
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;

    if( !passwordRegex.test(password)){
        alert('Contraseña debil, debe contener minimo 8 caracteres. \n maximo 15 caracteres. \n minimo una mayuscula. \n minimo una minuscula.  \n minimo un caracter especial. \n minimo un numero');
        return;
    }

    // generar almacenamiento local 

    const Usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // validación de correo existente

    const validarCorreo = Usuarios.find(usuario => usuario.email === email);

    if(validarCorreo){
        alert('El usuario ya existe, no es posible registrarlo nuevamente');
        return;
    }else{
        Usuarios.push({
            nombre: name,
            email: email,
            password: password,
            rol: "cliente"
        });

        // enviar información al local store
        localStorage.setItem('usuarios', JSON.stringify(Usuarios));

        alert('Usauario registrado con Exito');

        // retornar a la pagina de login

        window.location.href= 'login.html'; 

    }





} )

