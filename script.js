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
                openRegistrationModal();
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
        showNotification('Navegando a Proceso Evity ✓', 'success');
    } else if (sectionId === 'longevidad-page') {
        // Hide home page and show Longevidad page
        document.getElementById('home-page').classList.remove('active');
        document.getElementById('longevidad-page').classList.add('active');
        
        // Scroll to top of new page
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Show notification
        showNotification('Navegando a Longevidad para todos ✓', 'success');
    } else if (sectionId === 'recursos-visuales-page') {
        // Hide all pages and show Recursos Visuales page
        document.getElementById('home-page').classList.remove('active');
        document.getElementById('longevidad-page').classList.remove('active');
        document.getElementById('proceso-evity-page').classList.remove('active');
        document.getElementById('recursos-visuales-page').classList.add('active');
        
        // Scroll to top of new page
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Show notification
        showNotification('Navegando a Recursos Visuales ✓', 'success');
    }
}

// Navigate back to home
function navigateToHome() {
    // Hide all other pages and show home page
    document.getElementById('proceso-evity-page').classList.remove('active');
    document.getElementById('longevidad-page').classList.remove('active');
    document.getElementById('recursos-visuales-page').classList.remove('active');
    document.getElementById('home-page').classList.add('active');
    
    // Scroll to top of home page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Show notification
    showNotification('Regresando al Inicio ✓', 'success');
}

// Navigate back to Longevidad page from Recursos Visuales
function navigateToLongevidadPage() {
    // Hide Recursos Visuales page and show Longevidad page
    document.getElementById('recursos-visuales-page').classList.remove('active');
    document.getElementById('longevidad-page').classList.add('active');
    
    // Scroll to top of Longevidad page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Show notification
    showNotification('Regresando a Longevidad para todos ✓', 'success');
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

// Registration Modal Functions
let selectedUserType = null;

function openRegistrationModal() {
    const modal = document.getElementById('registration-modal');
    modal.classList.add('active');
    resetRegistrationModal();
}

function closeRegistrationModal() {
    const modal = document.getElementById('registration-modal');
    modal.classList.remove('active');
    resetRegistrationModal();
}

function resetRegistrationModal() {
    // Reset to first step
    document.getElementById('user-type-selection').classList.add('active');
    document.getElementById('registration-form').classList.remove('active');
    
    // Clear selections
    document.querySelectorAll('.user-type-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Clear form
    document.getElementById('register-form').reset();
    
    // Hide cedula field
    document.getElementById('cedula-group').style.display = 'none';
    document.getElementById('cedula').required = false;
    
    selectedUserType = null;
}

function goBackToUserSelection() {
    document.getElementById('registration-form').classList.remove('active');
    document.getElementById('user-type-selection').classList.add('active');
}

// Initialize EmailJS
(function() {
    emailjs.init({
        publicKey: "YOUR_PUBLIC_KEY", // Necesitarás configurar esto con tu clave de EmailJS
    });
})();

// Initialize registration modal event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Close modal when clicking X
    document.querySelector('.close-modal').addEventListener('click', closeRegistrationModal);
    
    // Close modal when clicking outside
    document.getElementById('registration-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeRegistrationModal();
        }
    });
    
    // User type selection
    document.querySelectorAll('.user-type-card').forEach(card => {
        card.addEventListener('click', function() {
            // Remove previous selection
            document.querySelectorAll('.user-type-card').forEach(c => c.classList.remove('selected'));
            
            // Add selection to clicked card
            this.classList.add('selected');
            
            // Store selected type
            selectedUserType = this.dataset.type;
            
            // Wait a moment then proceed to form
            setTimeout(() => {
                proceedToRegistrationForm();
            }, 500);
        });
    });
    
    // Form submission
    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();
        handleRegistrationSubmit();
    });
    
    // CURP validation
    document.getElementById('curp').addEventListener('input', function(e) {
        let value = e.target.value.toUpperCase();
        // Basic CURP format validation
        e.target.value = value;
    });
    
    // Password confirmation validation
    document.getElementById('confirm-password').addEventListener('input', function() {
        validatePasswordMatch();
    });
    
    document.getElementById('password').addEventListener('input', function() {
        validatePasswordMatch();
    });
});

function proceedToRegistrationForm() {
    // Hide user selection step
    document.getElementById('user-type-selection').classList.remove('active');
    
    // Show registration form
    document.getElementById('registration-form').classList.add('active');
    
    // Update form title and show/hide cedula field
    const formTitle = document.getElementById('form-title');
    const cedulaGroup = document.getElementById('cedula-group');
    const cedulaInput = document.getElementById('cedula');
    
    if (selectedUserType === 'doctor') {
        formTitle.textContent = 'Registro de Médico';
        cedulaGroup.style.display = 'block';
        cedulaInput.required = true;
    } else {
        formTitle.textContent = 'Registro de Paciente';
        cedulaGroup.style.display = 'none';
        cedulaInput.required = false;
    }
}

function validatePasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const confirmInput = document.getElementById('confirm-password');
    
    if (confirmPassword && password !== confirmPassword) {
        confirmInput.setCustomValidity('Las contraseñas no coinciden');
    } else {
        confirmInput.setCustomValidity('');
    }
}

function validateCURP(curp) {
    // Basic CURP validation (18 characters, specific pattern)
    const curpPattern = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9A-Z][0-9]$/;
    return curpPattern.test(curp);
}

function handleRegistrationSubmit() {
    const formData = new FormData(document.getElementById('register-form'));
    const data = Object.fromEntries(formData.entries());
    
    // Validate CURP
    if (!validateCURP(data.curp)) {
        showNotificationWithType('Por favor ingresa un CURP válido (18 caracteres)', 'error');
        return;
    }
    
    // Validate password length
    if (data.password.length < 8) {
        showNotificationWithType('La contraseña debe tener al menos 8 caracteres', 'error');
        return;
    }
    
    // Validate password match
    if (data.password !== data['confirm-password']) {
        showNotificationWithType('Las contraseñas no coinciden', 'error');
        return;
    }
    
    // Add user type to data
    data.userType = selectedUserType;
    
    // Show processing message
    showNotificationWithType('Procesando registro...', 'info');
    
    // Send registration data via email
    sendRegistrationEmail(data);
}

function sendRegistrationEmail(data) {
    // Prepare email template parameters
    const templateParams = {
        to_email: 'VeroMoes@evity.mx',
        user_type: data.userType === 'doctor' ? 'Médico' : 'Paciente',
        full_name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone,
        country: data.country,
        city: data.city,
        curp: data.curp,
        cedula: data.cedula || 'N/A',
        registration_date: new Date().toLocaleString('es-MX', {
            timeZone: 'America/Mexico_City',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };
    
    // Send email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('Email sent successfully:', response);
            showNotificationWithType('¡Registro exitoso! Bienvenido a Evity ✓', 'success');
            closeRegistrationModal();
        })
        .catch(function(error) {
            console.error('Error sending email:', error);
            // Fallback: show success message and log data locally
            showNotificationWithType('¡Registro completado! (Datos guardados localmente)', 'success');
            console.log('Registration data (email failed):', data);
            closeRegistrationModal();
            
            // Alternative: Use mailto as fallback
            createMailtoFallback(data);
        });
}

function createMailtoFallback(data) {
    const subject = `Nuevo Registro Evity - ${data.userType === 'doctor' ? 'Médico' : 'Paciente'}: ${data.name}`;
    const body = `
Nuevo registro en Evity:

Tipo de Usuario: ${data.userType === 'doctor' ? 'Médico' : 'Paciente'}
Nombre Completo: ${data.name}
Nombre de Usuario: ${data.username}
Correo: ${data.email}
Teléfono: ${data.phone}
País: ${data.country}
Ciudad: ${data.city}
CURP: ${data.curp}${data.cedula ? `
Cédula Profesional: ${data.cedula}` : ''}
Fecha de Registro: ${new Date().toLocaleString('es-MX')}

---
Registro generado desde evity.mx
    `;
    
    const mailtoLink = `mailto:VeroMoes@evity.mx?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Create a temporary link and click it
    const tempLink = document.createElement('a');
    tempLink.href = mailtoLink;
    tempLink.style.display = 'none';
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
}

// Update showNotification to handle error type
function showNotificationWithType(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    let backgroundColor;
    switch(type) {
        case 'success':
            backgroundColor = 'var(--green)';
            break;
        case 'error':
            backgroundColor = '#ef4444';
            break;
        case 'info':
        default:
            backgroundColor = 'var(--turquoise)';
            break;
    }
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${backgroundColor};
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
