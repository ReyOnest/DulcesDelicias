document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener productos del localStorage
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const btnMostrarTodo = document.getElementById('btn-mostrar-todo');
    
    // 2. Mapeo de IDs de contenedores
    const contenedores = {
        'tortas': document.getElementById('grid-tortas'),
        'postres': document.getElementById('grid-postres'),
        'cupcakes': document.getElementById('grid-cupcakes'),
        'galletas': document.getElementById('grid-galletas')
    };

    // 3. Lógica de filtrado por URL
    const params = new URLSearchParams(window.location.search);
    const targetId = params.get('target'); // Ej: 'grid-tortas'

    if (targetId) {
        if (btnMostrarTodo) btnMostrarTodo.style.display = 'inline-block';

        // Ocultamos las secciones que no corresponden
        Object.keys(contenedores).forEach(key => {
            const contenedor = contenedores[key];
            if (contenedor) {
                const seccion = contenedor.closest('.categoria-section');
                if (contenedor.id !== targetId) {
                    if (seccion) seccion.style.display = 'none';
                }
            }
        });
    }

    // Lógica del botón para mostrar todo
    if (btnMostrarTodo) {
        btnMostrarTodo.addEventListener('click', () => {
            document.querySelectorAll('.categoria-section').forEach(sec => {
                sec.style.display = 'block';
            });
            btnMostrarTodo.style.display = 'none';
            window.history.replaceState({}, document.title, window.location.pathname);
        });
    }
    
    // 4. Inyectar los productos
    productos.forEach(p => {
        const categoria = p.product_type ? p.product_type.toLowerCase() : '';
        
        if (contenedores[categoria]) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${p.name}</h3>
                <p>Sabor: ${p.flavor}</p>
                <p><strong>$${p.price}</strong></p>
                <button class="btn btn-primary" onclick="agregarAlCarrito(${p.id})">Pedir</button>
            `;
            contenedores[categoria].appendChild(card);
        }
    });

    // 5. Scroll suave al objetivo
    if (targetId) {
        const elemento = document.getElementById(targetId);
        if (elemento) {
            setTimeout(() => {
                elemento.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
});

function agregarAlCarrito(productId) {
    console.log("Producto añadido al carrito:", productId);
    alert("Producto añadido al carrito");
}