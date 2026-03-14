/**
 * Aurora Café - Main JavaScript
 * Handles navigation, smooth scroll, gallery lightbox, and form validation
 */

document.addEventListener('DOMContentLoaded', () => {
    // ===========================
    // Mobile Navigation
    // ===========================
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    function openMenu() {
        navMenu.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navMenu.classList.remove('show');
        document.body.style.overflow = '';
    }

    navToggle?.addEventListener('click', openMenu);
    navClose?.addEventListener('click', closeMenu);

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('show') &&
            !navMenu.contains(e.target) &&
            !navToggle.contains(e.target)) {
            closeMenu();
        }
    });

    // ===========================
    // Header Scroll Effect
    // ===========================
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;

    function handleScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    // ===========================
    // Smooth Scroll for Anchor Links
    // ===========================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = targetPosition - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===========================
    // Gallery Lightbox
    // ===========================
    const galleryItems = document.querySelectorAll('.gallery__item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    const galleryImages = [];
    let currentImageIndex = 0;

    // Collect all gallery images
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery__caption');

        galleryImages.push({
            src: img.src,
            alt: img.alt,
            caption: caption ? caption.textContent : ''
        });

        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateLightboxImage() {
        const image = galleryImages[currentImageIndex];
        lightboxImg.src = image.src;
        lightboxImg.alt = image.alt;
        lightboxCaption.textContent = image.caption;
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage();
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightboxImage();
    }

    lightboxClose?.addEventListener('click', closeLightbox);
    lightboxPrev?.addEventListener('click', showPrevImage);
    lightboxNext?.addEventListener('click', showNextImage);

    // Close lightbox on background click
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });

    // ===========================
    // Form Validation
    // ===========================
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    if (contactForm) {
        const formFields = {
            name: {
                element: document.getElementById('name'),
                error: document.getElementById('name-error'),
                validate: (value) => {
                    if (!value.trim()) return 'Por favor, ingresa tu nombre';
                    if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres';
                    return '';
                }
            },
            email: {
                element: document.getElementById('email'),
                error: document.getElementById('email-error'),
                validate: (value) => {
                    if (!value.trim()) return 'Por favor, ingresa tu email';
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value.trim())) return 'Por favor, ingresa un email válido';
                    return '';
                }
            },
            message: {
                element: document.getElementById('message'),
                error: document.getElementById('message-error'),
                validate: (value) => {
                    if (!value.trim()) return 'Por favor, ingresa tu mensaje';
                    if (value.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres';
                    return '';
                }
            }
        };

        // Real-time validation
        Object.keys(formFields).forEach(fieldName => {
            const field = formFields[fieldName];

            field.element.addEventListener('blur', () => {
                validateField(field);
            });

            field.element.addEventListener('input', () => {
                if (field.element.classList.contains('error')) {
                    validateField(field);
                }
            });
        });

        function validateField(field) {
            const errorMessage = field.validate(field.element.value);

            if (errorMessage) {
                field.element.classList.add('error');
                field.error.textContent = errorMessage;
                return false;
            } else {
                field.element.classList.remove('error');
                field.error.textContent = '';
                return true;
            }
        }

        function validateForm() {
            let isValid = true;

            Object.keys(formFields).forEach(fieldName => {
                if (!validateField(formFields[fieldName])) {
                    isValid = false;
                }
            });

            return isValid;
        }

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (validateForm()) {
                // Simulate form submission
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;

                submitButton.disabled = true;
                submitButton.textContent = 'Enviando...';

                // Simulate API call
                setTimeout(() => {
                    // Reset form
                    contactForm.reset();

                    // Reset button
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;

                    // Show success toast
                    showToast('¡Mensaje enviado correctamente! Te contactaremos pronto.');
                }, 1500);
            }
        });
    }

    function showToast(message) {
        toastMessage.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    // ===========================
    // Intersection Observer for Animations
    // ===========================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeInElements = document.querySelectorAll(
        '.section__header, .about__content, .about__image, .service-card, .gallery__item, .contact__info, .contact__form-wrapper'
    );

    if ('IntersectionObserver' in window) {
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    fadeInObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeInElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            fadeInObserver.observe(element);
        });
    }

    // ===========================
    // Active Navigation Link
    // ===========================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - header.offsetHeight - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink?.classList.add('active');
            } else {
                navLink?.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink, { passive: true });
    highlightNavLink(); // Check initial state
});
