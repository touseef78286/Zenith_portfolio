// ============================================
// MAGICAL-TECH PORTFOLIO JAVASCRIPT (2026 Edition)
// ============================================

// ============================================
// LOADING SCREEN
// ============================================

window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            initAll();
        }, 800);
    }, 2000);
});

// ============================================
// INITIALIZE ALL FEATURES
// ============================================

function initAll() {
    initCustomCursor();
    initScrollAnimations();
    initPageTransitions();
    initNavigation();
    initFormHandling();
    initParallax();
    initParticleEffects();
    initButtonEffects();
}

// ============================================
// CUSTOM CURSOR EFFECTS
// ============================================

function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorParticles = document.querySelector('.cursor-particles');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let particles = [];

    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor follow
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .skill-card, .project-card, .highlight-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            createCursorParticles(mouseX, mouseY);
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });

    // Click effect
    document.addEventListener('click', (e) => {
        cursor.classList.add('click');
        createClickBurst(e.clientX, e.clientY);
        setTimeout(() => cursor.classList.remove('click'), 200);
    });

    // Create cursor particles
    function createCursorParticles(x, y) {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'cursor-particle';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                cursorParticles.appendChild(particle);

                const angle = (Math.PI * 2 * i) / 3;
                const velocity = 2 + Math.random() * 2;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;

                animateParticle(particle, vx, vy);
            }, i * 50);
        }
    }

    function animateParticle(particle, vx, vy) {
        let x = parseFloat(particle.style.left);
        let y = parseFloat(particle.style.top);
        let opacity = 1;

        function update() {
            x += vx;
            y += vy;
            opacity -= 0.02;
            vx *= 0.98;
            vy *= 0.98;

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(update);
            } else {
                particle.remove();
            }
        }
        update();
    }

    // Click burst effect
    function createClickBurst(x, y) {
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'cursor-particle';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.background = '#ec4899';
            particle.style.boxShadow = '0 0 15px #ec4899';
            cursorParticles.appendChild(particle);

            const angle = (Math.PI * 2 * i) / 12;
            const velocity = 3 + Math.random() * 3;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            animateParticle(particle, vx, vy);
        }
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const animateElements = document.querySelectorAll(
        '.section-title, .about-body, .highlight-card, .skill-card, .project-card, .contact-form'
    );

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// PAGE TRANSITIONS
// ============================================

function initPageTransitions() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                
                // Create transition effect
                createPortalTransition(() => {
                    document.querySelector(href).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            }
        });
    });
}

function createPortalTransition(callback) {
    const portal = document.createElement('div');
    portal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(168, 85, 247, 0.9), rgba(6, 182, 212, 0.9));
        transform: translate(-50%, -50%);
        z-index: 10000;
        pointer-events: none;
        transition: width 0.4s ease, height 0.4s ease, opacity 0.4s ease;
    `;
    document.body.appendChild(portal);

    setTimeout(() => {
        portal.style.width = '200vw';
        portal.style.height = '200vh';
        setTimeout(() => {
            if (callback) callback();
            setTimeout(() => {
                portal.style.opacity = '0';
                setTimeout(() => portal.remove(), 400);
            }, 200);
        }, 200);
    }, 10);
}

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Active link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });
}

// ============================================
// FORM HANDLING
// ============================================

function initFormHandling() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Create magical submit effect
            const submitButton = form.querySelector('.submit-button');
            submitButton.style.transform = 'scale(0.95)';
            
            // Create success particles
            createSuccessParticles(submitButton);
            
            setTimeout(() => {
                submitButton.style.transform = '';
                // Here you would normally send the form data
                alert('✨ Your spell has been sent! I\'ll respond with the speed of light! ✨');
                form.reset();
            }, 300);
        });
    }
}

function createSuccessParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const cursorParticles = document.querySelector('.cursor-particles');

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.background = ['#a855f7', '#06b6d4', '#ec4899', '#fbbf24'][Math.floor(Math.random() * 4)];
        particle.style.boxShadow = `0 0 15px ${particle.style.background}`;
        cursorParticles.appendChild(particle);

        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 4 + Math.random() * 4;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        animateParticle(particle, vx, vy);
    }
}

// ============================================
// PARALLAX EFFECTS
// ============================================

function initParallax() {
    const parallaxElements = document.querySelectorAll('.gradient-orb, .floating-orb, .particle-layer');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ============================================
// PARTICLE EFFECTS
// ============================================

function initParticleEffects() {
    // Add floating particles to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        for (let i = 0; i < 50; i++) {
            createFloatingParticle(hero);
        }
    }
}

function createFloatingParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: ${2 + Math.random() * 3}px;
        height: ${2 + Math.random() * 3}px;
        background: ${['#a855f7', '#06b6d4', '#ec4899'][Math.floor(Math.random() * 3)]};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${0.3 + Math.random() * 0.4};
        pointer-events: none;
        box-shadow: 0 0 10px currentColor;
        animation: float-particle ${10 + Math.random() * 20}s ease-in-out infinite;
    `;
    container.appendChild(particle);
}

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float-particle {
        0%, 100% {
            transform: translate(0, 0);
        }
        25% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
        75% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
    }
`;
document.head.appendChild(particleStyle);

// ============================================
// BUTTON EFFECTS
// ============================================

function initButtonEffects() {
    const buttons = document.querySelectorAll('.cta-button, .submit-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            createRippleEffect(this, e);
        });
    });
}

function createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(168, 85, 247, 0.6), transparent);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ============================================
// SMOOTH SCROLLING ENHANCEMENT
// ============================================

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

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll-heavy functions
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations can be added here
}, 16));

// ============================================
// 3D ORB INTERACTION
// ============================================

const floatingOrb = document.querySelector('.floating-orb');
if (floatingOrb) {
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const x = (clientX / innerWidth - 0.5) * 20;
        const y = (clientY / innerHeight - 0.5) * 20;
        
        floatingOrb.style.transform = `translate(${x}px, ${y}px) rotateX(${y}deg) rotateY(${x}deg)`;
    });
}

// ============================================
// GLOWING BORDER ANIMATION
// ============================================

function initGlowingBorders() {
    const cards = document.querySelectorAll('.skill-card, .project-card, .highlight-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderImage = 'linear-gradient(45deg, #a855f7, #06b6d4, #ec4899) 1';
        });
    });
}

initGlowingBorders();

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================

function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

initScrollProgress();

// ============================================
// RESUME DOWNLOAD
// ============================================

function initResumeDownload() {
    const resumeBtn = document.getElementById('resumeDownload');
    
    if (resumeBtn) {
        resumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create download effect
            createSuccessParticles(resumeBtn);
            
            // In a real implementation, this would download a PDF
            // For now, we'll show a message
            setTimeout(() => {
                alert('✨ Resume download initiated! ✨\n\nIn production, this would download your resume PDF.');
            }, 300);
        });
    }
}

initResumeDownload();

// ============================================
// STATS COUNTER ANIMATION
// ============================================

function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

initStatsCounter();

// ============================================
// PROJECT FILTERS
// ============================================

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

initProjectFilters();

// ============================================
// PROJECT MODALS
// ============================================

const projectData = {
    project1: {
        title: 'Neon Spirit Dashboard',
        description: 'A holographic data dashboard with glowing runes, neon pulses, and floating glass panels. The interface reacts to cursor energy and animates like a living organism. Built with React, Three.js, and custom shaders for maximum visual impact.',
        tags: ['Holographic UI', 'Neon Design', 'Interactive', 'React', 'Three.js'],
        demo: 'video.html',
        code: '#'
    },
    project2: {
        title: 'Quantum Portfolio',
        description: 'A 2026-style futuristic portfolio built with parallax realms, portal transitions, magical particles, and dynamic neon lighting. Features smooth animations, 3D elements, and immersive user experience.',
        tags: ['Parallax', 'Portal FX', '2026 Style', 'WebGL', 'GSAP'],
        demo: '#',
        code: '#'
    },
    project3: {
        title: 'Cosmic Interface System',
        description: 'An advanced UI component library featuring floating panels, energy-based interactions, and adaptive layouts that respond to user intent. Includes 50+ reusable components with magical animations.',
        tags: ['UI Library', 'Components', 'Design System', 'Vue.js', 'TypeScript'],
        demo: '#',
        code: '#'
    },
    project4: {
        title: 'Holographic Realm Explorer',
        description: 'An immersive 3D web experience where users navigate through cosmic dimensions, interacting with floating holograms and magical portals. Built with WebGL and custom physics engine.',
        tags: ['3D Web', 'WebGL', 'Immersive', 'Three.js', 'GLSL'],
        demo: '#',
        code: '#'
    },
    project5: {
        title: 'Neural Network Visualizer',
        description: 'A real-time AI visualization tool that displays neural network architectures as glowing energy webs with interactive node exploration. Features live training visualization and performance metrics.',
        tags: ['AI/ML', 'Visualization', 'Interactive', 'Python', 'TensorFlow.js'],
        demo: '#',
        code: '#'
    },
    project6: {
        title: 'Mystic Mobile App',
        description: 'A mobile application with gesture-based magic interactions, particle effects, and fluid animations that feel like casting spells. Available on iOS and Android with native performance.',
        tags: ['Mobile', 'Gestures', 'Animations', 'React Native', 'Framer Motion'],
        demo: '#',
        code: '#'
    }
};

function initProjectModals() {
    const modal = document.getElementById('projectModal');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalClose = modal.querySelector('.modal-close');
    const projectViewButtons = document.querySelectorAll('.project-view-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    function openModal(projectId) {
        const data = projectData[projectId];
        if (!data) return;
        
        modal.querySelector('.modal-title').textContent = data.title;
        modal.querySelector('.modal-description').textContent = data.description;
        
        const tagsContainer = modal.querySelector('.modal-tags');
        tagsContainer.innerHTML = '';
        data.tags.forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.className = 'tag';
            tagEl.textContent = tag;
            tagsContainer.appendChild(tagEl);
        });
        
        const links = modal.querySelectorAll('.modal-link-btn');
        
        // Set Live Demo link
        if (links[0] && data.demo && data.demo !== '#') {
            // Clone the link to remove all existing event listeners
            const newLink = links[0].cloneNode(true);
            links[0].parentNode.replaceChild(newLink, links[0]);
            
            // Set href and target
            newLink.href = data.demo;
            newLink.target = '_blank';
            
            // Store demo URL
            const demoUrl = data.demo;
            
            // Add fresh click handler
            newLink.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Live Demo clicked, opening:', demoUrl);
                // Open in new tab
                window.open(demoUrl, '_blank');
            });
        } else if (links[0]) {
            links[0].href = data.demo || '#';
        }
        
        // Set View Code link
        if (links[1]) {
            links[1].href = data.code || '#';
            links[1].target = '_blank';
        }
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    projectViewButtons.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            // If it's an anchor tag with href, let it navigate naturally
            if (btn.tagName === 'A' && btn.href && btn.href !== '#') {
                return; // Allow default link behavior
            }
            e.stopPropagation();
            e.preventDefault();
            const card = btn.closest('.project-card');
            const modalId = card.getAttribute('data-modal');
            openModal(modalId);
        });
    });
    
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.project-view-btn')) {
                const modalId = card.getAttribute('data-modal');
                openModal(modalId);
            }
        });
    });
    
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        // Don't close if clicking on modal content or links
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Ensure modal links work properly - don't interfere with link clicks
    modal.addEventListener('click', (e) => {
        // If clicking on a modal link button, let it handle its own click
        if (e.target.classList.contains('modal-link-btn') || e.target.closest('.modal-link-btn')) {
            // Don't do anything - let the link's own click handler work
            return;
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

initProjectModals();

// ============================================
// BACK TO TOP BUTTON
// ============================================

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

initBackToTop();

// ============================================
// UPDATE NAVIGATION FOR NEW SECTIONS
// ============================================

function updateNavigation() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        // Add links for new sections if needed
        const newLinks = [
            { href: '#stats', text: 'Stats' },
            { href: '#tech-stack', text: 'Tech' },
            { href: '#experience', text: 'Journey' },
            { href: '#testimonials', text: 'Voices' }
        ];
        
        // You can add these to navigation if desired
        // For now, keeping the original navigation structure
    }
}

// ============================================
// ENHANCED SCROLL ANIMATIONS FOR NEW SECTIONS
// ============================================

function initEnhancedScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe new sections
    const newElements = document.querySelectorAll(
        '.stat-card, .tech-item, .timeline-item, .testimonial-card'
    );

    newElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

initEnhancedScrollAnimations();

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c✨ Welcome to the Magical-Tech Portfolio! ✨', 'color: #a855f7; font-size: 20px; font-weight: bold;');
console.log('%cWhere Magic Meets Future', 'color: #06b6d4; font-size: 14px;');

