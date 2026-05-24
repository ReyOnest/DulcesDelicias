document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const listaCarrito = document.getElementById('lista-carrito');
    const totalDisplay = document.getElementById('total-pedido');
    let total = 0;

    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<p style="text-align:center;">Tu carrito está vacío.</p>';
    } else {
        carrito.forEach((producto, index) => {
            total += producto.price;
            const item = document.createElement('div');
            item.className = 'carrito-item';
            item.innerHTML = `
                <div>
                    <h4>${producto.name}</h4>
                    <p>Sabor: ${producto.flavor}</p>
                </div>
                <div>
                    <p>$${producto.price}</p>
                    <button class="btn btn-danger" onclick="eliminarDelCarrito(${index})">Eliminar</button>
                </div>
            `;
            listaCarrito.appendChild(item);
        });
        totalDisplay.innerText = total;
    }
});

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    location.reload(); // Recarga para actualizar la vista
}

function finalizarPedido() {
    const nuevoPedido = {
        cliente: "Cliente Actual", // Aquí podrías traer el nombre de sessionStorage
        productos: carrito,
        total: total,
        estado: "Pendiente"
    };
    const pedidos = JSON.parse(localStorage.getItem('pedidosGlobales')) || [];
    pedidos.push(nuevoPedido);
    localStorage.setItem('pedidosGlobales', JSON.stringify(pedidos));
    localStorage.removeItem('carrito');
    window.location.href = 'home.html';

}