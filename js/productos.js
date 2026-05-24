document.addEventListener('DOMContentLoaded', () => {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    
    // Mapeo de IDs de contenedores
    const contenedores = {
        'tortas': document.getElementById('grid-tortas'),
        'postres': document.getElementById('grid-postres'),
        'cupcakes': document.getElementById('grid-cupcakes'),
        'galletas': document.getElementById('grid-galletas')
    };

    productos.forEach(p => {
        const categoria = p.product_type.toLowerCase(); // ej: "tortas"
        if (contenedores[categoria]) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${p.name}</h3>
                <p>Sabor: ${p.flavor}</p>
                <p><strong>$${p.price}</strong></p>
                <button class="btn btn-primary">Pedir</button>
            `;
            contenedores[categoria].appendChild(card);
        }
    });
});