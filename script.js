/* ============================================
   Portfolio — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // ===== MOBILE HAMBURGER MENU =====
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ===== SCROLL-TRIGGERED FADE-IN ANIMATIONS =====
    const fadeElements = document.querySelectorAll('.fade-in');

    // Check if element is already in viewport on page load
    function checkVisibility(el) {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    // Mark already-visible elements immediately
    fadeElements.forEach(el => {
        if (checkVisibility(el)) {
            el.classList.add('visible');
        }
    });

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -30px 0px',
        threshold: 0.05
    });

    fadeElements.forEach(el => {
        if (!el.classList.contains('visible')) {
            fadeObserver.observe(el);
        }
    });

    // Fallback: make everything visible after 2s regardless
    setTimeout(() => {
        fadeElements.forEach(el => el.classList.add('visible'));
    }, 2000);

    // ===== ACTIVE NAV LINK HIGHLIGHT =====
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-40% 0px -60% 0px' });

    sections.forEach(section => sectionObserver.observe(section));

    // ===== CONTACT FORM HANDLER =====
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const btn = this.querySelector('button[type="submit"]');
        const originalContent = btn.innerHTML;

        btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
        btn.style.background = 'var(--green)';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.style.background = '';
            btn.disabled = false;
            this.reset();
        }, 3000);
    });

    // ===== DYNAMIC ROLE TYPEWRITER =====
    const dynamicRole = document.getElementById('dynamicRole');
    if (dynamicRole) {
        const roles = [
            'Network Specialist',
            'CCNA Certified',
            'Linux Administrator',
            'MikroTik MTCNA Certified',
            'DevOps Trainee',
            'AOSP Contributor',
            'Infrastructure Architect',
            'CompTIA A+ Certified'
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typeSpeed = 80;
        const deleteSpeed = 40;
        const pauseAfterType = 2000;
        const pauseAfterDelete = 500;

        function typeRole() {
            const currentRole = roles[roleIndex];

            if (!isDeleting) {
                // Typing
                dynamicRole.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentRole.length) {
                    // Finished typing — pause, then start deleting
                    isDeleting = true;
                    setTimeout(typeRole, pauseAfterType);
                    return;
                }
                setTimeout(typeRole, typeSpeed);
            } else {
                // Deleting
                dynamicRole.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    // Finished deleting — move to next role
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    setTimeout(typeRole, pauseAfterDelete);
                    return;
                }
                setTimeout(typeRole, deleteSpeed);
            }
        }

        // Start the typewriter after a brief delay
        setTimeout(typeRole, 1000);
    }

});
