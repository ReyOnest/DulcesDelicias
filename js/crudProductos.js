// Captura botón de logout
const btnLogout = document.getElementById('logout');
if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        sessionStorage.removeItem('sesionUsuario');
        window.location.href = 'login.html';
    });
}

// 0. Función para mostrar/ocultar campos dinámicos
window.actualizarCampos = () => {
    const tipo = document.getElementById('product_type').value;
    
    // Ocultar todos los contenedores primero
    document.querySelectorAll('[id^="campo-"]').forEach(el => el.classList.add('d-none'));

    // Mostrar el contenedor según la categoría seleccionada
    if (tipo === 'Tortas') document.getElementById('campo-tortas').classList.remove('d-none');
    if (tipo === 'Postres') document.getElementById('campo-postres').classList.remove('d-none');
    if (tipo === 'Cupcakes') document.getElementById('campo-cupcakes').classList.remove('d-none');
    if (tipo === 'Galletas') document.getElementById('campo-galletas').classList.remove('d-none');
};

// 1. Crear/Guardar Producto
const formProducto = document.getElementById('productForm');

formProducto.addEventListener('submit', (e) => {
    e.preventDefault();

    const tipo = document.getElementById('product_type').value;
    
    // Captura dinámica según el tipo
    let valorExtra = "";
    if (tipo === 'Tortas') valorExtra = document.getElementById('slices').value;
    if (tipo === 'Postres') valorExtra = document.getElementById('size-postre').value;
    if (tipo === 'Cupcakes') valorExtra = document.getElementById('cobertura').value;
    if (tipo === 'Galletas') valorExtra = document.getElementById('tipo-galleta').value;

    const producto = {
        id: document.getElementById('id_product').value || Date.now(),
        name: document.getElementById('name').value.trim(),
        flavor: document.getElementById('flavor').value.trim(),
        price: parseFloat(document.getElementById('price').value),
        stock: parseInt(document.getElementById('stock').value),
        state: document.getElementById('state').value.trim(),
        product_type: tipo,
        especificacion: valorExtra // Guardamos la opción seleccionada aquí
    };

    if (!producto.name || !producto.price) {
        alert('Por favor, ingrese al menos nombre y precio');
        return;
    }

    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const index = productos.findIndex(p => p.id == producto.id);
    
    if (index !== -1) {
        productos[index] = producto;
    } else {
        productos.push(producto);
    }
    
    localStorage.setItem('productos', JSON.stringify(productos));
    formProducto.reset();
    actualizarCampos(); // Ocultar campos al terminar
    mostrarProductos();
});

// 2. Mostrar Productos
function mostrarProductos() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';
    
    productos.forEach((p, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${p.name}</td>
            <td>${p.flavor}</td>
            <td>$${p.price}</td>
            <td>${p.stock}</td>
            <td>${p.product_type} (${p.especificacion})</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="editarProducto(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

// 4. Editar Producto
window.editarProducto = (index) => {
    const productos = JSON.parse(localStorage.getItem('productos'));
    const p = productos[index];
    
    document.getElementById('id_product').value = p.id;
    document.getElementById('name').value = p.name;
    document.getElementById('flavor').value = p.flavor;
    document.getElementById('price').value = p.price;
    document.getElementById('stock').value = p.stock;
    document.getElementById('state').value = p.state;
    document.getElementById('product_type').value = p.product_type;
    
    // Llamar a actualizarCampos para mostrar el campo correcto y rellenar el valor
    actualizarCampos();
    // (Opcional: aquí podrías setear el valor del select correspondiente si fuera necesario)
    
    mostrarProductos();
};

mostrarProductos();