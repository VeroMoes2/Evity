// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    });

    // Header background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(254, 254, 254, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(254, 254, 254, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Animate floating cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards for animation
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add click handlers for CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-primary-large');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#register') {
                e.preventDefault();
                // Placeholder for registration functionality
                alert('¡Próximamente! La funcionalidad de registro estará disponible pronto.');
            }
        });
    });

    // Add click handlers for login buttons
    const loginButtons = document.querySelectorAll('a[href="#login"]');
    loginButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Placeholder for login functionality
            alert('¡Próximamente! La funcionalidad de inicio de sesión estará disponible pronto.');
        });
    });

    // Add subtle parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Add loading animation for the page
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Add click handlers for feature cards
    const featureCardLinks = document.querySelectorAll('.feature-card a');
    featureCardLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToSection('proceso-evity');
        });
    });
});

// Chatbot functionality
function openChatbot() {
    showNotification('¡ChatBot próximamente disponible! 🤖', 'info');
}

// Single Page Application Navigation
function navigateToSection(sectionId) {
    if (sectionId === 'proceso-evity') {
        // Hide home page and show Proceso Evity page
        document.getElementById('home-page').classList.remove('active');
        document.getElementById('proceso-evity-page').classList.add('active');
        
        // Scroll to top of new page
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Show notification
        showNotification('Navegando a Proceso Evity 🌟', 'success');
    } else if (sectionId === 'longevidad-page') {
        // Hide home page and show Longevidad page
        document.getElementById('home-page').classList.remove('active');
        document.getElementById('longevidad-page').classList.add('active');
        
        // Scroll to top of new page
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Show notification
        showNotification('Navegando a Longevidad para todos 🔬', 'success');
    }
}

// Navigate back to home
function navigateToHome() {
    // Hide all other pages and show home page
    document.getElementById('proceso-evity-page').classList.remove('active');
    document.getElementById('longevidad-page').classList.remove('active');
    document.getElementById('home-page').classList.add('active');
    
    // Scroll to top of home page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Show notification
    showNotification('Regresando al Inicio 🏠', 'success');
}

// Utility function for future API calls
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: var(--turquoise);
        color: white;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-size: 0.9rem;
        line-height: 1.4;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}
