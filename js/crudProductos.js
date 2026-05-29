// 1. Manejo del Logout
const btnLogout = document.getElementById('logout');
if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        sessionStorage.removeItem('sesionUsuario');
        window.location.href = 'login.html';
    });
}

// 2. Función para mostrar/ocultar campos dinámicos
window.actualizarCampos = () => {
    const tipo = document.getElementById('product_type').value;
    document.querySelectorAll('[id^="campo-"]').forEach(el => el.classList.add('d-none'));

    if (tipo === 'Tortas') document.getElementById('campo-tortas')?.classList.remove('d-none');
    if (tipo === 'Postres') document.getElementById('campo-postres')?.classList.remove('d-none');
    if (tipo === 'Cupcakes') document.getElementById('campo-cupcakes')?.classList.remove('d-none');
    if (tipo === 'Galletas') document.getElementById('campo-galletas')?.classList.remove('d-none');
};

// Listener para cambiar campos al seleccionar tipo
document.getElementById('product_type').addEventListener('change', actualizarCampos);

// 3. Crear/Guardar Producto
const formProducto = document.getElementById('productForm');

formProducto.addEventListener('submit', (e) => {
    e.preventDefault();

    const tipo = document.getElementById('product_type').value;
    
    // Captura dinámica según el tipo
    let valorExtra = "";
    if (tipo === 'Tortas') valorExtra = document.getElementById('slices')?.value || "";
    if (tipo === 'Postres') valorExtra = document.getElementById('size-pastry')?.value || "";
    if (tipo === 'Cupcakes') valorExtra = document.getElementById('flavor')?.value || "";
    if (tipo === 'Galletas') valorExtra = document.getElementById('type-cookie')?.value || "";

    const producto = {
        id: document.getElementById('id_product').value || Date.now().toString(),
        name: document.getElementById('name').value.trim(),
        flavor: document.getElementById('flavor').value.trim(),
        price: parseFloat(document.getElementById('price').value),
        stock: parseInt(document.getElementById('stock').value),
        state: document.getElementById('state').value.trim(),
        product_type: tipo,
        especificacion: valorExtra 
    };

    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const index = productos.findIndex(p => p.id == producto.id);
    
    if (index !== -1) {
        productos[index] = producto;
    } else {
        productos.push(producto);
    }
    
    localStorage.setItem('productos', JSON.stringify(productos));
    formProducto.reset();
    document.getElementById('id_product').value = ""; // Limpiar ID oculto
    actualizarCampos();
    mostrarProductos();
});

// 4. Mostrar Productos en Tabla
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

// 5. Editar Producto (Carga datos al form)
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
    
    actualizarCampos();

    // Rellenar el detalle específico según el tipo de producto
    const tipo = p.product_type;
    if (tipo === 'Tortas') document.getElementById('slices').value = p.especificacion;
    if (tipo === 'Postres') document.getElementById('size-postre').value = p.especificacion;
    if (tipo === 'Cupcakes') document.getElementById('cobertura').value = p.especificacion;
    if (tipo === 'Galletas') document.getElementById('tipo-galleta').value = p.especificacion;
};

// 6. Eliminar Producto
window.eliminarProducto = (index) => {
    let productos = JSON.parse(localStorage.getItem('productos')) || [];
    productos.splice(index, 1);
    localStorage.setItem('productos', JSON.stringify(productos));
    alert("Producto eliminado"); 
    mostrarProductos();
};  

// Inicializar tabla
mostrarProductos();

// Actualizar campos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarCampos();
});