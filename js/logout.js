// captura botón de logout
const btnLogout = document.getElementById('logout');
btnLogout.addEventListener('click', () => {
    // eliminar la sesión del usuario
    sessionStorage.removeItem('sesionUsuario');
    // redirigir a la página de login
    window.location.href = 'login.html';
});