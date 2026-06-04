// 1. Elementos del DOM
const formCreacion = document.getElementById('signupForm');
const tbody = document.getElementById('tbody');

// 2. Función para renderizar la tabla desde LocalStorage
const renderizarTabla = () => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    tbody.innerHTML = ''; // Limpiamos la tabla antes de llenar
    
    usuarios.forEach((u, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${u.nombre}</td>
                <td>${u.email}</td>
                <td>${u.rol.toUpperCase()}</td>
                <td>
                    <button class="btn btn-danger" onclick="eliminarUsuario(${index})">Eliminar</button>
                </td>
            </tr>
        `;
    });
};

// 3. Lógica para Guardar Usuario
formCreacion.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
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

// 4. Lógica para Eliminar Usuario
window.eliminarUsuario = (index) => {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.splice(index, 1);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    renderizarTabla();
};