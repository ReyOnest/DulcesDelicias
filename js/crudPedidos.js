document.addEventListener('DOMContentLoaded', () => {
    renderizarPedidos();
});

function renderizarPedidos() {
    const pedidos = JSON.parse(localStorage.getItem('pedidosGlobales')) || [];
    const tbody = document.getElementById('tbody-pedidos');
    tbody.innerHTML = '';

    pedidos.forEach((pedido, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${pedido.cliente || 'Anónimo'}</td>
            <td>${pedido.productos.map(p => p.name).join(', ')}</td>
            <td>$${pedido.total}</td>
            <td><span class="status-badge">${pedido.estado || 'Pendiente'}</span></td>
            <td>
                <button class="btn btn-primary" onclick="cambiarEstado(${index}, 'En Proceso')">Procesar</button>
                <button class="btn btn-danger" onclick="cambiarEstado(${index}, 'Entregado')">Entregado</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

window.cambiarEstado = (index, nuevoEstado) => {
    let pedidos = JSON.parse(localStorage.getItem('pedidosGlobales'));
    pedidos[index].estado = nuevoEstado;
    localStorage.setItem('pedidosGlobales', JSON.stringify(pedidos));
    renderizarPedidos();
};