// Desarrollo de funcionalidades CRUD para la gestión de usuarios en el sistema
// captura botón de logout
const btnLogout = document.getElementById('logout');
btnLogout.addEventListener('click', () => {
    // eliminar la sesión del usuario
    sessionStorage.removeItem('sesionUsuario');
    // redirigir a la página de login
    window.location.href = 'login.html';
});
// 1. Crear Usuario: Funcionalidad para agregar nuevos usuarios al sistema, con validación de datos y almacenamiento en localStorage.
// captura de formulario

const formCreacion = document.getElementById('signupForm');

formCreacion.addEventListener('btnGuardar', (e) => {
    e.preventDefault();

    // captura de los datos insertados en los input's del form
    const name = document.getElementById('name').value.trim().toLowerCase();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value.trim();
    const rol = document.getElementById('rol').value.trim().toLowerCase();

    // validación de datos ingresados completos

    if(!name || !email || !password || !rol){
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
        alert('El usuario ya existe, no es posible crearlo nuevamente, si desea modificarlo por favor dirijase a la sección de actualizar usuario');

        return;
    }else{
        Usuarios.push({
            nombre: name,
            email: email,
            password: password,
            rol: rol
        });

        // enviar información al local store
        localStorage.setItem('usuarios', JSON.stringify(Usuarios));

        alert('Usauario creado con Exito');

        // mostrar el nuevo usuario en la tabla de usuarios registrados
        mostrarUsuarios();

    }

});

// 2. Leer Usuarios: Funcionalidad para mostrar la lista de usuarios registrados en el sistema, con opciones para editar o eliminar cada usuario.
function mostrarUsuarios(){
    const Usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const tablaUsuarios = document.getElementById('tablaUsuarios');
    tablaUsuarios.innerHTML = '';
    Usuarios.forEach((usuario, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${usuario.nombre}</td>
            <td>${usuario.email}</td>
            <td>${usuario.password}</td>
            <td>${usuario.rol}</td>
            <td>
                <button class="btn btn-primary btnActualizar" onClick ="ActualizarUsuario (${index})" data-index="${index}">Actualizar</button>
                <button class="btn btn-danger btnEliminar" onClick ="EliminarUsuario (${index})" data-index="${index}">Eliminar</button>
            </td>
        `;
        tablaUsuarios.appendChild(fila);
    });

    // agregar eventos a los botones de actualizar y eliminar despues de renderizar la tabla
    const btnActualizar = document.querySelectorAll('.btnActualizar');
    const btnEliminar = document.querySelectorAll('.btnEliminar');

    btnActualizar.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            ActualizarUsuario(index);
        });
    });

    btnEliminar.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            EliminarUsuario(index);
        });
    });

}



