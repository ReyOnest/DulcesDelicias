const formularioLogin = document.getElementById('loginForm');

formularioLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    // Capturamos los valores
    const email = document.getElementById('email').value.trim().toLowerCase();
    const pass = document.getElementById('password').value.trim();

    // Obtener la lista de usuarios registrados en el localStorage
    const Usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Buscar coincidencia
    const validarUser = Usuarios.find(usuario => usuario.email === email && usuario.password === pass);

    if (!validarUser) {
        alert('Usuario y/o contraseña incorrecto');
    } else {
        // Mensaje de bienvenida
        alert(`Bienvenido ${validarUser.nombre}, serás redirigido a tu panel.`);

        // Guardar los datos del usuario en la sesión
        sessionStorage.setItem('sesionUsuario', JSON.stringify(validarUser));

        // Validación del tipo de rol y redirección
        // Asegúrate de que el valor en tu objeto usuario sea 'admin' o 'cliente'
        if (validarUser.rol.toLowerCase() === 'admin') {
            // Redirigir a la vista de administrador
            window.location.href = 'homeAdmin.html';
        } else {
            // Redirigir a la página de inicio
            window.location.href = 'home.html';
        }
    }
});