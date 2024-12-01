// Wait for page load
window.addEventListener('load', () => {
    // Remove loading screen
    document.querySelector('.loading').style.display = 'none';
    
    // Initialize animations
    initAnimations();
});

// Initialize GSAP
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
} else {
    console.warn('GSAP or ScrollTrigger not loaded');
}

// Mobile menu functionality
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll function
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        try {
            const targetId = this.getAttribute('href');
            if (!targetId) return;

            const target = document.querySelector(targetId);
            if (!target) return;

            const navHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({
                top: targetPosition - navHeight,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinks?.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        } catch (error) {
            console.error('Error during smooth scroll:', error);
        }
    });
});

// Initialize animations
function initAnimations() {
    // Hero animations
    gsap.from('.hero-content h1', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.2
    });

    gsap.from('.hero-subtitle', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.4
    });

    gsap.from('.hero-cta', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.6
    });

    // Fade in animations for sections
    gsap.utils.toArray('.fade-in').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // Map cards stagger animation
    gsap.from('.map-card', {
        scrollTrigger: {
            trigger: '.maps',
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
    });
}

// Parallax effect for background
gsap.to('.bg-animation', {
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    y: '20%',
    ease: 'none'
});

// Map card hover effects
document.querySelectorAll('.map-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            scale: 1.02,
            y: -10,
            duration: 0.3,
            ease: 'power2.out'
        });
        
        const badge = card.querySelector('.map-badge');
        gsap.to(badge, {
            scale: 1.1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
        
        const badge = card.querySelector('.map-badge');
        gsap.to(badge, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .member-card, .map-card, .tutorial-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Smooth hover effect for cards
document.querySelectorAll('.member-card, .map-card, .tutorial-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Add initial fade-in animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in');
    }
});
