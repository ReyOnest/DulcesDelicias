// auth.js
document.addEventListener('DOMContentLoaded', () => {
    const authLink = document.getElementById('auth-link');

    if (authLink) {
        // Buscamos si existe la sesión del usuario
        const sesionActiva = sessionStorage.getItem('sesionUsuario');

        if (sesionActiva) {
            // Si existe la sesión, cambiamos el texto a Logout
            authLink.textContent = 'Logout';
            authLink.href = '#';

            authLink.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Al hacer click en Logout, eliminamos la sesión
                sessionStorage.removeItem('sesionUsuario');
                
                // Redirigimos al home o recargamos
                window.location.href = 'home.html'; 
            });
        }
    }
});