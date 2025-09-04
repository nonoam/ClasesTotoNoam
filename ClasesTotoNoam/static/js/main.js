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

document.addEventListener('DOMContentLoaded', function() {
    
    // Detectar página actual y ejecutar funciones específicas
    const currentPage = document.body.dataset.page || getCurrentPageFromURL();
    
    switch(currentPage) {
        case 'horarios':
            initHorariosPage();
            break;
        case 'metodologia':
            initMetodologiaPage();
            break;
        case 'clases':
            initClasesPage();
            break;
        case 'materiales':
            initMaterialesPage();
            break;
    }
});

// Función para obtener página actual desde URL
function getCurrentPageFromURL() {
    const path = window.location.pathname;
    if (path.includes('horarios')) return 'horarios';
    if (path.includes('metodologia')) return 'metodologia';
    if (path.includes('clases')) return 'clases';
    if (path.includes('materiales')) return 'materiales';
    return 'home';
}

// ========================================
// PÁGINA DE HORARIOS
// ========================================
function initHorariosPage() {
    console.log('Inicializando página de horarios');
    
    // Animaciones de reveal para cards de profesores
    initProfessorsReveal();
    
    // Animaciones del timeline de proceso
    initProcessTimeline();
    
    // Efectos de hover en slots de calendario
    initCalendarSlots();
    
    // Contador animado para estadísticas de profesores
    initProfessorStats();
}

function initProfessorsReveal() {
    const professorCards = document.querySelectorAll('.professor-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });
    
    professorCards.forEach(card => {
        card.style.transform = 'translateY(50px)';
        card.style.opacity = '0';
        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });
}

function initProcessTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, (index + 1) * 300);
    });
}

function initCalendarSlots() {
    const slots = document.querySelectorAll('.day-slot');
    
    slots.forEach(slot => {
        slot.addEventListener('mouseenter', function() {
            if (this.classList.contains('available')) {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 8px 25px rgba(81, 207, 102, 0.3)';
            }
        });
        
        slot.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

function initProfessorStats() {
    const statNumbers = document.querySelectorAll('.professor-stats .stat-number');
    
    const animateNumbers = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue);
                
                if (!isNaN(numericValue)) {
                    animateNumber(target, 0, numericValue, 1500);
                }
                
                observer.unobserve(target);
            }
        });
    };
    
    const observer = new IntersectionObserver(animateNumbers, { threshold: 0.5 });
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const suffix = element.textContent.replace(/[0-9]/g, '');
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * easeOutCubic(progress));
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// ========================================
// PÁGINA DE METODOLOGÍA
// ========================================
function initMetodologiaPage() {
    console.log('Inicializando página de metodología');
    
    // Animaciones del diagrama metodológico
    initMethodologyDiagram();
    
    // Animaciones de pricing cards
    initPricingCards();
    
    // Timeline de estructura de clases
    initClassStructureTimeline();
    
    // Preview del documento de resumen
    initSummaryPreview();
}

function initMethodologyDiagram() {
    const diagramElements = document.querySelectorAll('.diagram-element');
    const centerElement = document.querySelector('.diagram-center');
    
    // Animar entrada de elementos del diagrama
    diagramElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = `scale(0.5) ${element.style.transform}`;
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = element.style.transform.replace('scale(0.5)', 'scale(1)');
        }, index * 200);
    });
    
    // Efectos de hover en elementos del diagrama
    diagramElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform.replace('scale(1)', 'scale(1.1)');
            centerElement.style.transform = 'translate(-50%, -50%) scale(1.1)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace('scale(1.1)', 'scale(1)');
            centerElement.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

function initPricingCards() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transform = 'scale(1)';
                    entry.target.style.opacity = '1';
                }, index * 150);
            }
        });
    }, { threshold: 0.3 });
    
    pricingCards.forEach(card => observer.observe(card));
}

function initClassStructureTimeline() {
    const steps = document.querySelectorAll('.step-item');
    const progressFill = document.querySelector('.progress-fill');
    
    if (progressFill) {
        // Iniciar animación de la barra de progreso cuando sea visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'progress-fill 4s ease-in-out infinite';
                }
            });
        });
        
        observer.observe(progressFill);
    }
    
    // Animaciones de entrada para los pasos
    steps.forEach((step, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(step);
    });
}

function initSummaryPreview() {
    const previewDoc = document.querySelector('.preview-document');
    
    if (previewDoc) {
        // Efecto de escritura en las líneas de preview
        const previewLines = document.querySelectorAll('.preview-line');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    previewLines.forEach((line, index) => {
                        setTimeout(() => {
                            line.style.animation = 'preview-shimmer 2s ease-in-out infinite';
                        }, index * 200);
                    });
                }
            });
        });
        
        observer.observe(previewDoc);
    }
}

// ========================================
// PÁGINA DE CLASES
// ========================================
function initClasesPage() {
    console.log('Inicializando página de clases');
    
    // Animaciones de reveal para subject cards
    initSubjectCardsReveal();
    
    // Efectos de hover en iconos tecnológicos
    initTechIcons();
    
    // Animaciones de learning paths
    initLearningPaths();
    
    // Efectos de las skill tags
    initSkillTags();
}

function initSubjectCardsReveal() {
    const subjectCards = document.querySelectorAll('.subject-card[data-reveal="fade-up"]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.style.animation = 'reveal-fade-up 0.8s ease-out forwards';
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    subjectCards.forEach(card => observer.observe(card));
}

function initTechIcons() {
    const techIcons = document.querySelectorAll('.tech-icon');
    
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            // Pausar animación y amplificar efecto
            this.style.animationPlayState = 'paused';
            this.style.transform += ' scale(1.3)';
            this.style.zIndex = '10';
        });
        
        icon.addEventListener('mouseleave', function() {
            // Reanudar animación y restaurar escala
            this.style.animationPlayState = 'running';
            this.style.transform = this.style.transform.replace(' scale(1.3)', '');
            this.style.zIndex = '1';
        });
    });
}

function initLearningPaths() {
    const pathSteps = document.querySelectorAll('.learning-path .step');
    
    pathSteps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            // Efecto dominó - animar pasos siguientes
            const nextSteps = this.parentElement.querySelectorAll('.step');
            const currentIndex = Array.from(nextSteps).indexOf(this);
            
            nextSteps.forEach((nextStep, index) => {
                if (index > currentIndex) {
                    setTimeout(() => {
                        nextStep.style.transform = 'translateX(15px) scale(1.05)';
                        setTimeout(() => {
                            nextStep.style.transform = 'translateX(10px) scale(1)';
                        }, 200);
                    }, (index - currentIndex) * 100);
                }
            });
        });
        
        step.addEventListener('mouseleave', function() {
            const allSteps = this.parentElement.querySelectorAll('.step');
            allSteps.forEach(step => {
                step.style.transform = 'translateX(10px) scale(1)';
            });
        });
    });
}

function initSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            // Efecto de ondas en tags cercanos
            const allTags = this.parentElement.querySelectorAll('.skill-tag');
            const currentIndex = Array.from(allTags).indexOf(this);
            
            allTags.forEach((otherTag, index) => {
                const distance = Math.abs(index - currentIndex);
                if (distance <= 2 && distance > 0) {
                    setTimeout(() => {
                        otherTag.style.transform = 'translateY(-5px) scale(1.05)';
                        setTimeout(() => {
                            otherTag.style.transform = 'translateY(0) scale(1)';
                        }, 300);
                    }, distance * 100);
                }
            });
        });
    });
}

// ========================================
// PÁGINA DE MATERIALES
// ========================================
function initMaterialesPage() {
    console.log('Inicializando página de materiales');
    
    // Animaciones de la preview de materiales
    initMaterialsPreview();
    
    // Efectos en cards de métodos de entrega
    initDeliveryMethods();
    
    // Animaciones de zoom-in para tipos de materiales
    initMaterialTypesReveal();
    
    // Efectos en el código preview
    initCodePreview();
}

function initMaterialsPreview() {
    const folderStructure = document.querySelector('.folder-structure');
    const floatingFiles = document.querySelectorAll('.file-card');
    
    if (folderStructure) {
        // Expandir/contraer subfolders
        const mainFolder = document.querySelector('.main-folder');
        const subfolders = document.querySelectorAll('.subfolder');
        
        subfolders.forEach((folder, index) => {
            folder.style.opacity = '0';
            folder.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                folder.style.transition = 'all 0.4s ease';
                folder.style.opacity = '1';
                folder.style.transform = 'translateX(0)';
            }, index * 150);
        });
    }
    
    // Efectos de hover en archivos flotantes
    floatingFiles.forEach(file => {
        file.addEventListener('mouseenter', function() {
            this.style.transform += ' rotate(5deg)';
            this.style.zIndex = '10';
        });
        
        file.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' rotate(5deg)', '');
            this.style.zIndex = '1';
        });
    });
}

function initDeliveryMethods() {
    const methodCards = document.querySelectorAll('.method-card');
    
    methodCards.forEach(card => {
        // Efectos de parallax en patterns de fondo
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const pattern = this.querySelector('.whatsapp-pattern, .cloud-pattern');
            if (pattern) {
                const moveX = (x - rect.width / 2) * 0.1;
                const moveY = (y - rect.height / 2) * 0.1;
                pattern.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const pattern = this.querySelector('.whatsapp-pattern, .cloud-pattern');
            if (pattern) {
                pattern.style.transform = 'translate(0px, 0px)';
            }
        });
    });
}

function initMaterialTypesReveal() {
    const materialTypes = document.querySelectorAll('.material-type[data-reveal="zoom-in"]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.style.animation = 'reveal-zoom-in 0.8s ease-out forwards';
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    materialTypes.forEach(type => observer.observe(type));
}

function initCodePreview() {
    const codeEditor = document.querySelector('.code-editor');
    
    if (codeEditor) {
        // Efecto de typing en el código
        const codeLines = document.querySelectorAll('.code-line');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    codeLines.forEach((line, index) => {
                        line.style.opacity = '0';
                        setTimeout(() => {
                            line.style.transition = 'opacity 0.5s ease';
                            line.style.opacity = '1';
                        }, index * 300);
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(codeEditor);
    }
}

// ========================================
// UTILIDADES GENERALES
// ========================================

// Función para crear efectos de partículas específicos de página
function createPageSpecificParticles(pageType) {
    const particleContainer = document.querySelector('.background-animation');
    if (!particleContainer) return;
    
    const colors = {
        'horarios': ['#25d366', '#0078d4'],
        'metodologia': ['#51cf66', '#667eea'],
        'clases': ['#667eea', '#ff6b6b', '#8b5cf6'],
        'materiales': ['#8b5cf6', '#3b82f6']
    };
    
    const pageColors = colors[pageType] || ['#e91e63', '#00d4ff'];
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle page-specific';
        
        const size = Math.random() * 3 + 2;
        const color = pageColors[Math.floor(Math.random() * pageColors.length)];
        
        particle.style.cssText = `
            left: ${Math.random() * 100}%;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            opacity: ${Math.random() * 0.6 + 0.2};
        `;
        
        particleContainer.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 8000);
    }
    
    // Crear partículas periódicamente
    setInterval(createParticle, 2000);
}

// Mejorar accesibilidad para las nuevas páginas
function initAccessibilityEnhancements() {
    // Añadir skip links para navegación rápida
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 9999;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Mejorar navegación por teclado en cards interactivas
    const interactiveCards = document.querySelectorAll('.subject-card, .method-card, .material-type, .professor-card');
    
    interactiveCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
        
        card.addEventListener('focus', () => {
            card.style.outline = '2px solid #e91e63';
            card.style.outlineOffset = '4px';
        });
        
        card.addEventListener('blur', () => {
            card.style.outline = 'none';
        });
    });
}

// Inicializar mejoras de accesibilidad
document.addEventListener('DOMContentLoaded', initAccessibilityEnhancements);