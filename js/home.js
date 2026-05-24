// Asegurarse de que el script se ejecute después de cargar el DOM
document.addEventListener('DOMContentLoaded', () => {

    // 1. Elementos del Carrusel
    const sliderContainer = document.querySelector('.hero-slider-container');
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.slider-nav .dot');
    const prevButton = document.querySelector('.carousel-control-prev');
    const nextButton = document.querySelector('.carousel-control-next');
    
    // Si no encontramos los elementos, detenemos la ejecución del carrusel
    if (slides.length === 0 || !prevButton || !nextButton) {
        console.error("Error: Elementos del carrusel no encontrados. Asegúrate de que las clases HTML son correctas.");
        return;
    }

    let slideIndex = 0; // Índice basado en cero

    // Función principal para mostrar el slide
    function showSlide(index) {
        // Lógica de ciclo infinito (volver al inicio o al final)
        if (index >= slides.length) {
            index = 0;
        } else if (index < 0) {
            index = slides.length - 1;
        }

        // 1. Desplazar el carrusel (el contenedor de slides)
        const offset = -index * 100; // Porcentaje de desplazamiento
        document.querySelector('.hero-slider').style.transform = `translateX(${offset / 3}%)`;
        
        // 2. Manejo de clases 'active'
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        slideIndex = index;
    }

    function nextSlide() {
        showSlide(slideIndex + 1);
        resetAutoSlide();
    }

    function prevSlide() {
        showSlide(slideIndex - 1);
        resetAutoSlide();
    }

    // 2. Eventos de Navegación (Flechas) - ¡ESTO ES LO QUE HACE QUE FUNCIONEN!
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // 3. Eventos de Dots (Indicadores)
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetAutoSlide();
        });
    });

    // 4. Auto-avance del carrusel (cada 5 segundos)
    let autoSlideInterval;
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); 
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Inicializar y empezar el carrusel
    showSlide(0);
    startAutoSlide();


    // ----------------------------------------------------
    // 5. Animaciones suaves al hacer scroll 
    // ----------------------------------------------------
    const sections = document.querySelectorAll('section');

    // Añadir la clase que el CSS necesita para la transición inicial
    sections.forEach(section => {
        if (section.id !== 'hero') { 
            section.classList.add('animate-on-scroll');
        }
    });

    // Observador para detectar cuándo el elemento entra en la vista
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view'); // Aplica la clase para mostrar la animación
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section.id !== 'hero') {
            observer.observe(section);
        }
    });
});