// Inicialización de Swiper para el Hero
const heroSwiper = new Swiper('.hero-swiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    }
});

// Inicialización de Swiper para las marcas
const brandsSwiper = new Swiper('.brands-swiper', {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.brands-section .swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 5,
            spaceBetween: 40,
        },
    }
});

// Carrito de compras
let cartItems = [];
const cartCount = document.querySelector('.cart-count');

function updateCartCount() {
    cartCount.textContent = cartItems.length;
    // Animación del contador
    cartCount.classList.add('bump');
    setTimeout(() => cartCount.classList.remove('bump'), 300);
}

// Agregar al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.final-price').textContent;
        
        cartItems.push({
            name: productName,
            price: productPrice
        });
        
        updateCartCount();
        showNotification('Producto agregado al carrito');
    });
});

// Sistema de notificaciones
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Eliminar notificación
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Paginación de productos
const productsPerPage = 8;
let currentPage = 1;

function setupPagination() {
    const productGrid = document.querySelector('.products-grid');
    const products = productGrid.querySelectorAll('.product-card');
    const totalPages = Math.ceil(products.length / productsPerPage);
    
    // Crear botones de paginación
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
        button.textContent = i;
        
        button.addEventListener('click', () => {
            currentPage = i;
            showProducts(products);
            updatePaginationButtons();
        });
        
        pagination.appendChild(button);
    }
    
    showProducts(products);
}

function showProducts(products) {
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    
    products.forEach((product, index) => {
        product.style.display = index >= start && index < end ? 'block' : 'none';
    });
}

function updatePaginationButtons() {
    const buttons = document.querySelectorAll('.pagination-btn');
    buttons.forEach((button, index) => {
        button.classList.toggle('active', index + 1 === currentPage);
    });
}

// Menú móvil
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Búsqueda en tiempo real
const searchInput = document.querySelector('.search-box input');
const categorySelect = document.querySelector('.category-select');

if (searchInput) {
    searchInput.addEventListener('input', debounce(handleSearch, 300));
}

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categorySelect.value;
    
    // Aquí iría la lógica de búsqueda
    // Por ahora solo mostramos en consola
    console.log(`Buscando: ${searchTerm} en categoría: ${category}`);
}

// Función debounce para optimizar la búsqueda
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Newsletter
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        
        // Aquí iría la lógica para suscribir al newsletter
        showNotification('¡Gracias por suscribirte!');
        newsletterForm.reset();
    });
}

// Lazy loading de imágenes
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback para navegadores que no soportan lazy loading
        const lazyLoadScript = document.createElement('script');
        lazyLoadScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lozad.js/1.16.0/lozad.min.js';
        document.body.appendChild(lazyLoadScript);
        
        lazyLoadScript.onload = () => {
            const observer = lozad('.lazy');
            observer.observe();
        };
    }
});

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    setupPagination();
});

// Animaciones al hacer scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animated');
        }
    });
};

window.addEventListener('scroll', debounce(animateOnScroll, 50));

// Estilos CSS adicionales para las animaciones
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transform: translateY(100%);
        opacity: 0;
        transition: all 0.3s ease;
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .notification.success {
        border-left: 4px solid #10B981;
    }
    
    .notification.error {
        border-left: 4px solid #EF4444;
    }
    
    .cart-count.bump {
        animation: bump 0.3s ease-out;
    }
    
    @keyframes bump {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease-out;
    }
    
    .animate-on-scroll.animated {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(style);