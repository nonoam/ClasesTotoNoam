// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar todas las funcionalidades
    initSidebarEffects();
    initAnimatedCounters();
    initScrollEffects();
    initCardInteractions();
    initParticleSystem();
    initMobileMenu();
    initSmoothScrolling();
    
    console.log('ClasesTotoNoam iniciado correctamente ✨');
});

// Efectos del sidebar
function initSidebarEffects() {
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    const currentPath = window.location.pathname;
    
    // Establecer enlace activo basado en la URL actual
    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '/' && href.includes('home'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
        
        // Efecto de click con ripple
        link.addEventListener('click', function(e) {
            // Remover clase active de todos los enlaces
            sidebarLinks.forEach(l => l.classList.remove('active'));
            // Agregar clase active al enlace clickeado
            this.classList.add('active');
            
            createRippleEffect(e, this);
        });
    });
}

// Contadores animados para estadísticas
function initAnimatedCounters() {
    const counterElements = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 60; // 60 frames para animación más suave
        const suffix = element.textContent.includes('%') ? '%' : '';
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 16); // ~60fps
    };
    
    // Observer para iniciar animación cuando sea visible
    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                    entry.target.classList.add('animated');
                }
            });
        },
        { threshold: 0.7, rootMargin: '0px 0px -50px 0px' }
    );
    
    counterElements.forEach(el => counterObserver.observe(el));
}

// Efectos de scroll
function initScrollEffects() {
    // Parallax para elementos flotantes
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax para partículas
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const speed = (index % 3 + 1) * 0.1;
            particle.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        // Parallax para elementos flotantes en hero
        const floatingElements = document.querySelectorAll('.float-icon');
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.05;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    }, 16));
    
    // Animaciones de entrada para las cards
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplicar observer a las cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Interacciones mejoradas para las cards
function initCardInteractions() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        let isHovered = false;
        
        // Efecto de entrada del mouse
        card.addEventListener('mouseenter', function() {
            isHovered = true;
            this.style.transform = 'translateY(-15px) scale(1.02)';
            
            // Efecto de brillo
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
            }
        });
        
        // Efecto de salida del mouse
        card.addEventListener('mouseleave', function() {
            isHovered = false;
            this.style.transform = 'translateY(0) scale(1)';
            
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            }
        });
        
        // Efecto de click
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.card-btn')) {
                createAdvancedRippleEffect(e, this);
                
                // Pequeña animación de feedback
                this.style.transform = 'translateY(-15px) scale(0.98)';
                setTimeout(() => {
                    if (isHovered) {
                        this.style.transform = 'translateY(-15px) scale(1.02)';
                    } else {
                        this.style.transform = 'translateY(0) scale(1)';
                    }
                }, 150);
            }
        });
        
        // Efecto especial para los botones de las cards
        const cardBtn = card.querySelector('.card-btn');
        if (cardBtn) {
            cardBtn.addEventListener('mouseenter', function() {
                this.style.background = 'linear-gradient(135deg, rgba(233, 30, 99, 0.1), rgba(0, 212, 255, 0.1))';
                this.style.transform = 'translateX(5px)';
            });
            
            cardBtn.addEventListener('mouseleave', function() {
                this.style.background = 'transparent';
                this.style.transform = 'translateX(0)';
            });
        }
    });
}

// Sistema de partículas mejorado
function initParticleSystem() {
    const particleContainer = document.querySelector('.background-animation');
    if (!particleContainer) return;
    
    const colors = ['#e91e63', '#00d4ff', '#8b5cf6', '#10b981', '#f59e0b'];
    let particleCount = 0;
    const maxParticles = 50;
    
    function createParticle() {
        if (particleCount >= maxParticles) return;
        
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Propiedades aleatorias
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 6 + 8;
        const delay = Math.random() * 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            left: ${Math.random() * 100}%;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            opacity: ${Math.random() * 0.6 + 0.2};
        `;
        
        particleContainer.appendChild(particle);
        particleCount++;
        
        // Remover después de la animación
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
                particleCount--;
            }
        }, (duration + delay) * 1000);
    }
    
    // Crear partículas periódicamente
    setInterval(createParticle, 3000);
    
    // Crear algunas partículas iniciales
    for (let i = 0; i < 10; i++) {
        setTimeout(createParticle, i * 200);
    }
}

// Menú móvil mejorado
function initMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    let menuBtn = document.querySelector('.mobile-menu-btn');
    
    function updateMobileMenu() {
        if (window.innerWidth <= 768) {
            if (!menuBtn) {
                menuBtn = createMobileMenuButton();
            }
            sidebar.style.transform = 'translateX(-100%)';
        } else {
            if (menuBtn) {
                menuBtn.remove();
                menuBtn = null;
            }
            sidebar.style.transform = 'translateX(0)';
        }
    }
    
    function createMobileMenuButton() {
        const btn = document.createElement('button');
        btn.className = 'mobile-menu-btn';
        btn.innerHTML = '<i class="fas fa-bars"></i>';
        btn.style.cssText = `
            position: fixed;
            top: 25px;
            left: 25px;
            z-index: 1001;
            width: 55px;
            height: 55px;
            border: none;
            border-radius: 15px;
            background: rgba(15, 23, 42, 0.9);
            backdrop-filter: blur(20px);
            color: #e91e63;
            font-size: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        `;
        
        let isOpen = false;
        btn.addEventListener('click', function() {
            isOpen = !isOpen;
            if (isOpen) {
                sidebar.style.transform = 'translateX(0)';
                this.innerHTML = '<i class="fas fa-times"></i>';
                this.style.background = 'linear-gradient(135deg, #e91e63, #ff4081)';
                this.style.color = '#fff';
            } else {
                sidebar.style.transform = 'translateX(-100%)';
                this.innerHTML = '<i class="fas fa-bars"></i>';
                this.style.background = 'rgba(15, 23, 42, 0.9)';
                this.style.color = '#e91e63';
            }
        });
        
        // Cerrar menú al hacer click en un enlace
        sidebar.addEventListener('click', (e) => {
            if (e.target.closest('.sidebar-nav a')) {
                isOpen = false;
                sidebar.style.transform = 'translateX(-100%)';
                btn.innerHTML = '<i class="fas fa-bars"></i>';
                btn.style.background = 'rgba(15, 23, 42, 0.9)';
                btn.style.color = '#e91e63';
            }
        });
        
        document.body.appendChild(btn);
        return btn;
    }
    
    // Ejecutar al cargar y al redimensionar
    updateMobileMenu();
    window.addEventListener('resize', throttle(updateMobileMenu, 250));
}

// Scroll suave
function initSmoothScrolling() {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Efecto ripple avanzado
function createAdvancedRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(233, 30, 99, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Efecto ripple simple
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${event.clientX - rect.left - size/2}px;
        top: ${event.clientY - rect.top - size/2}px;
        background: rgba(233, 30, 99, 0.2);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.5s ease-out;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
}

// Utilidades
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Agregar estilos de animación dinámicamente
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .mobile-menu-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3) !important;
    }
    
    .service-card {
        will-change: transform;
    }
    
    .card-icon {
        will-change: transform;
        transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
    }
`;
document.head.appendChild(dynamicStyles);

// Efectos adicionales al cargar la página
window.addEventListener('load', function() {
    // Animación de entrada para el hero
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroTitle.style.transition = 'all 0.8s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Preloader simple (opcional)
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});