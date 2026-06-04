document.addEventListener('DOMContentLoaded', () => {
    const btnLogout = document.getElementById('logout');

    if (btnLogout) {
        btnLogout.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 1. Eliminamos los datos de sesión
            sessionStorage.removeItem('sesionUsuario');
            
            // 2. Opcional: Si usabas otro marcador de sesión en otros archivos
            sessionStorage.removeItem('userLoggedIn');
            
            // 3. Redirigimos al Login
            alert("Sesión cerrada correctamente");
            window.location.href = 'login.html';
        });
    }
});