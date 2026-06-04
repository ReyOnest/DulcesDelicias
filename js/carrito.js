document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const listaCarrito = document.getElementById('lista-carrito');
    const totalDisplay = document.getElementById('total-pedido');
    let total = 0;

    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<p style="text-align:center;">Tu carrito está vacío.</p>';
    } else {
        carrito.forEach((producto, index) => {
            // Aseguramos que el precio sea un número
            const precio = parseFloat(producto.price) || 0;
            total += precio;
            
            const item = document.createElement('div');
            item.className = 'carrito-item';
            item.innerHTML = `
                <div>
                    <h4>${producto.name}</h4>
                    <p>Sabor: ${producto.flavor || 'N/A'}</p>
                </div>
                <div>
                    <p>$${precio.toFixed(2)}</p>
                    <button class="btn btn-danger" onclick="eliminarDelCarrito(${index})">Eliminar</button>
                </div>
            `;
            listaCarrito.appendChild(item);
        });
        totalDisplay.innerText = total.toFixed(2);
    }
});

// Función para eliminar un producto específico
window.eliminarDelCarrito = (index) => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    location.reload(); // Recarga para actualizar la vista
};

// Función para finalizar el pedido y enviarlo al Gestor del Admin
window.finalizarPedido = () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    // Obtenemos la información de la sesión
    const sesion = JSON.parse(sessionStorage.getItem('sesionUsuario'));
    const nombreCliente = sesion ? sesion.nombre : "Invitado";

    // Creamos el objeto del pedido
    const nuevoPedido = {
        id: Date.now(), // ID único basado en el tiempo
        cliente: nombreCliente,
        productos: carrito,
        total: document.getElementById('total-pedido').innerText,
        estado: "Pendiente",
        fecha: new Date().toLocaleString()
    };

    // Obtenemos los pedidos existentes o creamos un array vacío
    const pedidos = JSON.parse(localStorage.getItem('pedidosGlobales')) || [];
    pedidos.push(nuevoPedido);
    
    // Guardamos en localStorage
    localStorage.setItem('pedidosGlobales', JSON.stringify(pedidos));
    
    // Limpiamos el carrito
    localStorage.removeItem('carrito');
    
    alert("¡Pedido realizado con éxito!");
    window.location.href = 'nuestrosProductos.html';
};