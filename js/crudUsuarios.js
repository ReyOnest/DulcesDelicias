// adminUsuarios.js (o tu crudUsuarios.js corregido)
const formCreacion = document.getElementById('signupForm');

formCreacion.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim().toLowerCase();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value.trim();
    const rol = document.getElementById('rol').value.trim().toLowerCase(); // Captura 'admin' o 'cliente'

    if (!name || !email || !password || !rol) {
        alert('Favor ingresar todos los datos completos');
        return;
    }

    const Usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const validarCorreo = Usuarios.find(usuario => usuario.email === email);
    if (validarCorreo) {
        alert('El usuario ya existe');
        return;
    }

    // Guardar con el rol especificado por el administrador
    Usuarios.push({ nombre: name, email: email, password: password, rol: rol });
    localStorage.setItem('usuarios', JSON.stringify(Usuarios));
    
    alert('Usuario creado exitosamente');
    formCreacion.reset();
    renderizarTabla(); // Asegúrate de llamar a tu función que actualiza la tabla
});