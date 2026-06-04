document.addEventListener('DOMContentLoaded', () => {
    renderizarPedidos();
});

function renderizarPedidos() {
    const pedidos = JSON.parse(localStorage.getItem('pedidosGlobales')) || [];
    const tbody = document.getElementById('tbody-pedidos');
    tbody.innerHTML = '';

    if (pedidos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No hay pedidos registrados.</td></tr>';
        return;
    }

    pedidos.forEach((pedido, index) => {
        const fila = document.createElement('tr');
        // Aseguramos que productos sea un array legible
        const nombresProductos = pedido.productos.map(p => p.name).join(', ');
        
        fila.innerHTML = `
            <td>${pedido.cliente || 'Anónimo'}</td>
            <td>${nombresProductos}</td>
            <td>$${pedido.total}</td>
            <td><span class="status-badge">${pedido.estado || 'Pendiente'}</span></td>
            <td>
                <button class="btn btn-primary" onclick="cambiarEstado(${index}, 'En Proceso')">Procesar</button>
                <button class="btn btn-success" onclick="cambiarEstado(${index}, 'Entregado')">Entregado</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

window.cambiarEstado = (index, nuevoEstado) => {
    let pedidos = JSON.parse(localStorage.getItem('pedidosGlobales')) || [];
    if (confirm(`¿Cambiar estado a: ${nuevoEstado}?`)) {
        pedidos[index].estado = nuevoEstado;
        localStorage.setItem('pedidosGlobales', JSON.stringify(pedidos));
        renderizarPedidos();
    }
};