// Sitara Event Complex - JavaScript Interactions

document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Navbar & Active States
    const nav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Active link logic
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                const id = section.getAttribute('id');
                if(id) {
                    current = id;
                }
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Close mobile menu on completely clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const collapse = document.getElementById('navbarContent');
            if(collapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(collapse, {toggle: false});
                bsCollapse.hide();
            }
        });
    });


    // 2. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Gallery Lightbox Logic
    const galleryItems = document.querySelectorAll('.gallery-img-wrap');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.querySelector('.lightbox-close');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');

    let currentIndex = 0;
    const imagesList = Array.from(galleryItems).map(item => item.getAttribute('data-img'));

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            openLightbox(imagesList[currentIndex]);
        });
    });

    function openLightbox(src) {
        lightboxImg.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % imagesList.length;
        lightboxImg.src = imagesList[currentIndex];
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + imagesList.length) % imagesList.length;
        lightboxImg.src = imagesList[currentIndex];
    }

    if(closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if(nextBtn) nextBtn.addEventListener('click', nextImage);
    if(prevBtn) prevBtn.addEventListener('click', prevImage);

    // Close on outer click
    if(lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });

    // 4. Mobile Touch Interactions
    const touchElements = document.querySelectorAll('.premium-card, .event-card, .grid-item, .elegant-nav-links .nav-link, .footer-links a, .social-links a');
    
    touchElements.forEach(el => {
        el.addEventListener('touchstart', function(e) {
            // Remove tap-active from peers
            touchElements.forEach(sibling => {
                if(sibling !== this) sibling.classList.remove('tap-active');
            });
            this.classList.toggle('tap-active');
        }, {passive: true});
    });
    
    // Clicking outside removes tap-active
    document.addEventListener('touchstart', (e) => {
        let isTouchElement = false;
        touchElements.forEach(el => {
            if (el.contains(e.target)) isTouchElement = true;
        });
        if (!isTouchElement) {
            touchElements.forEach(el => el.classList.remove('tap-active'));
        }
    }, {passive: true});
});