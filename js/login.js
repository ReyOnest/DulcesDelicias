const formularioLogin = document.getElementById('loginForm');

formularioLogin.addEventListener('submit',(e)=>{

    e.preventDefault();

    // capturamos los valores que continen los input's del html que email y el password
    const email = document.getElementById('email').value.trim().toLowerCase();
    const pass = document.getElementById('password').value.trim().toLowerCase();

    //Obtener la lista de usuarios registrados en el local store
    const Usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // buscar coincidencia dentro del objeto con el email y el password ingresados por el usuario 
    const validarUser = Usuarios.find(usuario => usuario.email === email && usuario.password === pass);


    if(!validarUser){
        alert('Usuario y/o contraseña incorrecto');
    }else{
        //Mensaje de bienvenida
        alert(` Bienvenido señor ${validarUser.rol}  ${validarUser.nombre} a la administración de su perfil`);

        // guardar los datos del usuario y registrar el inicio de sesión
        sessionStorage.setItem('sesionUsuario',JSON.stringify(validarUser));
       // validar el tipo de rol del usuario y redirigir a la pagina correspondiente
       // if(validarUser.rol === cliente){ .. }
        // redirigir al usuario a la pagina de home
        window.location.href='home.html';
    }
});