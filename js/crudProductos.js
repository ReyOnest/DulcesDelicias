// Captura botón de logout
const btnLogout = document.getElementById('logout');
btnLogout.addEventListener('click', () => {
    sessionStorage.removeItem('sesionUsuario');
    window.location.href = 'login.html';
});

// 1. Crear/Guardar Producto
const formProducto = document.getElementById('productForm');

formProducto.addEventListener('submit', (e) => {
    e.preventDefault();

    // Captura de datos
    const producto = {
        id: document.getElementById('id_product').value || Date.now(), // ID temporal
        name: document.getElementById('name').value.trim(),
        flavor: document.getElementById('flavor').value.trim(),
        price: parseFloat(document.getElementById('price').value),
        stock: parseInt(document.getElementById('stock').value),
        state: document.getElementById('state').value.trim(),
        product_type: document.getElementById('product_type').value.trim(),
        slices: parseInt(document.getElementById('slices').value),
        size: document.getElementById('size').value.trim()
    };

    // Validar datos básicos
    if (!producto.name || !producto.price) {
        alert('Por favor, ingrese al menos nombre y precio');
        return;
    }

    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    
    // Si el ID existe, estamos editando
    const index = productos.findIndex(p => p.id == producto.id);
    if (index !== -1) {
        productos[index] = producto;
    } else {
        productos.push(producto);
    }

    localStorage.setItem('productos', JSON.stringify(productos));
    alert('Producto guardado con éxito');
    formProducto.reset();
    document.getElementById('id_product').value = '';
    mostrarProductos();
});

// 2. Leer Productos
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
            <td>${p.product_type}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="editarProducto(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

// 3. Eliminar Producto
window.eliminarProducto = (index) => {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    productos.splice(index, 1);
    localStorage.setItem('productos', JSON.stringify(productos));
    mostrarProductos();
};

// 4. Editar Producto (Carga los datos al formulario)
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
    document.getElementById('slices').value = p.slices;
    document.getElementById('size').value = p.size;
};

// Inicializar tabla al cargar
document.addEventListener('DOMContentLoaded', mostrarProductos);