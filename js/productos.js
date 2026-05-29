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
        // Generamos el nombre del archivo basado en el nombre del producto
        const nombreArchivo = p.name + '.jpg';
        
        const card = document.createElement('div');
        card.className = 'card';
        
        // Simplifica el innerHTML para dejar el estilo al CSS (es más estable)
        card.innerHTML = `
        <div class="img-wrapper" style="height: 200px; background: #f8f8f8; border-radius: 10px 10px 0 0; overflow: hidden;">
            <img src="img/${nombreArchivo}" 
                 alt="${p.name}" 
                 onload="this.style.opacity='1'"
                 onerror="this.onerror=null; this.src='img/default.jpg'; this.style.opacity='1'"
                 style="width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.3s;">
        </div>
        <h3>${p.name}</h3>
        <p><strong>Detalle:</strong> ${p.especificacion || 'N/A'}</p>
        <p><strong>Precio:</strong> $${p.price}</p>
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