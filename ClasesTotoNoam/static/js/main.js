// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Función para agregar efectos de hover dinámicos a las cards
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Añadir un brillo sutil
            this.style.boxShadow = '0 20px 60px rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        });
        
        // Efecto de ondas al hacer clic
        card.addEventListener('click', function(e) {
            // Solo si no se hace clic en un botón
            if (!e.target.classList.contains('btn')) {
                createRippleEffect(e, this);
            }
        });
    });
    
    // Función para crear efecto de ondas
    function createRippleEffect(event, element) {
        const circle = document.createElement('span');
        const diameter = Math.max(element.clientWidth, element.clientHeight);
        const radius = diameter / 2;
        
        const rect = element.getBoundingClientRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - rect.left - radius}px`;
        circle.style.top = `${event.clientY - rect.top - radius}px`;
        circle.classList.add('ripple');
        
        // Estilos CSS para el efecto ripple
        circle.style.position = 'absolute';
        circle.style.borderRadius = '50%';
        circle.style.background = 'rgba(255, 255, 255, 0.3)';
        circle.style.transform = 'scale(0)';
        circle.style.animation = 'ripple 0.6s linear';
        circle.style.pointerEvents = 'none';
        
        const ripple = element.querySelector('.ripple');
        if (ripple) {
            ripple.remove();
        }
        
        element.style.position = 'relative';
        element.appendChild(circle);
        
        // Remover el elemento después de la animación
        setTimeout(() => {
            circle.remove();
        }, 600);
    }
    
    // Agregar animación de ripple al CSS dinámicamente
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Efectos para los enlaces del sidebar
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remover clase active de todos los enlaces
            sidebarLinks.forEach(l => l.classList.remove('active'));
            // Agregar clase active al enlace clickeado
            this.classList.add('active');
        });
    });
    
    // Efecto parallax sutil para las partículas
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.1;
            particle.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Función para animar números (contador)
    function animateNumbers() {
        const numbers = document.querySelectorAll('[style*="font-size: 36px"]');
        
        numbers.forEach(number => {
            const finalNumber = parseInt(number.textContent);
            let currentNumber = 0;
            const increment = finalNumber / 30; // 30 frames para la animación
            
            const timer = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= finalNumber) {
                    currentNumber = finalNumber;
                    clearInterval(timer);
                }
                
                // Formatear el número según su tipo
                if (number.textContent.includes('%')) {
                    number.textContent = Math.floor(currentNumber) + '%';
                } else {
                    number.textContent = Math.floor(currentNumber);
                }
            }, 50);
        });
    }
    
    // Observador para animar números cuando entren en vista
    const observerOptions = {
        threshold: 0.7,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar la sección de estadísticas
    const statsSection = document.querySelector('[style*="background: rgba(255, 255, 255, 0.05)"]');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Efecto de typing para el título principal
    function typeWriter(element, text, speed = 50) {
        element.textContent = '';
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }
    
    // Aplicar efecto typing al título principal después de un pequeño delay
    setTimeout(() => {
        const mainTitle = document.querySelector('.header h1');
        if (mainTitle) {
            const originalText = mainTitle.textContent;
            typeWriter(mainTitle, originalText, 80);
        }
    }, 500);
    
    // Responsive: Toggle sidebar en móvil
    function handleMobileMenu() {
        if (window.innerWidth <= 768) {
            const sidebar = document.querySelector('.sidebar');
            sidebar.style.transform = 'translateX(-100%)';
            
            // Crear botón de menú si no existe
            if (!document.querySelector('.mobile-menu-btn')) {
                const menuBtn = document.createElement('button');
                menuBtn.classList.add('mobile-menu-btn');
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                menuBtn.style.cssText = `
                    position: fixed;
                    top: 20px;
                    left: 20px;
                    z-index: 1001;
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    color: white;
                    font-size: 20px;
                    cursor: pointer;
                    backdrop-filter: blur(10px);
                    transition: all 0.3s ease;
                `;
                
                menuBtn.addEventListener('click', function() {
                    const isOpen = sidebar.style.transform === 'translateX(0px)';
                    sidebar.style.transform = isOpen ? 'translateX(-100%)' : 'translateX(0px)';
                });
                
                document.body.appendChild(menuBtn);
            }
        }
    }
    
    // Ejecutar al cargar y al redimensionar
    handleMobileMenu();
    window.addEventListener('resize', handleMobileMenu);
    
    // Smooth scrolling para mejor experiencia
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Función para crear más partículas dinámicamente
function createParticles() {
    const particleContainer = document.querySelector('.background-animation');
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.width = particle.style.height = Math.random() * 4 + 2 + 'px';
        
        particleContainer.appendChild(particle);
        
        // Remover la partícula después de la animación
        setTimeout(() => {
            particle.remove();
        }, 8000);
    }, 2000);
}

// Iniciar creación de partículas después de cargar la página
setTimeout(createParticles, 1000);