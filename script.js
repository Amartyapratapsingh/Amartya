/* ============================================
   AMARTYA PRATAP SINGH - PORTFOLIO
   Interactive JavaScript
   ============================================ */

// --- Page Init (called at end of file) ---

// --- Custom Cursor ---
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

if (cursor && follower && window.matchMedia('(hover: hover)').matches) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-item, .contact-method');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => follower.classList.add('hovering'));
        el.addEventListener('mouseleave', () => follower.classList.remove('hovering'));
    });
}

// --- Navigation ---
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

// Scroll behavior
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 80) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNav() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = 'var(--gold)';
                }
            });
        }
    });
}
window.addEventListener('scroll', highlightNav);

// --- Typing Effect ---
const typedElement = document.getElementById('typed');
const words = [
    'AI-powered Android apps',
    'full-stack web platforms',
    'gaming community websites',
    'SaaS products with payments',
    'Kotlin & Jetpack Compose apps',
    'React & Node.js solutions'
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 80;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typedElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
    } else {
        typedElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start typing after loader
function startTyping() {
    setTimeout(typeEffect, 500);
}

// --- Hero Animation ---
function animateHeroElements() {
    const reveals = document.querySelectorAll('.hero .reveal-up');
    reveals.forEach((el, i) => {
        setTimeout(() => {
            el.classList.add('revealed');
        }, i * 150);
    });
    startTyping();
    animateCounters();
}

// --- Counter Animation ---
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.floor(target * ease);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        }
        requestAnimationFrame(update);
    });
}

// --- Scroll Reveal ---
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
});

// Observe all reveal elements except hero ones (handled separately)
document.querySelectorAll('.reveal-up').forEach(el => {
    if (!el.closest('.hero')) {
        revealObserver.observe(el);
    }
});

// --- Gen Me Screenshot Gallery ---
const phoneFrames = document.querySelectorAll('.phone-frame');
const galleryDots = document.querySelectorAll('.gallery-dot');

function setActiveScreenshot(index) {
    phoneFrames.forEach(frame => {
        frame.classList.remove('active');
        if (parseInt(frame.dataset.index) === index) {
            frame.classList.add('active');
        }
    });
    galleryDots.forEach(dot => {
        dot.classList.remove('active');
        if (parseInt(dot.dataset.index) === index) {
            dot.classList.add('active');
        }
    });
}

phoneFrames.forEach(frame => {
    frame.addEventListener('click', () => {
        setActiveScreenshot(parseInt(frame.dataset.index));
    });
});

galleryDots.forEach(dot => {
    dot.addEventListener('click', () => {
        setActiveScreenshot(parseInt(dot.dataset.index));
    });
});

// Auto-rotate screenshots every 3 seconds
let galleryAutoplay = null;
function startGalleryAutoplay() {
    let currentIndex = 0;
    galleryAutoplay = setInterval(() => {
        currentIndex = (currentIndex + 1) % phoneFrames.length;
        setActiveScreenshot(currentIndex);
    }, 3000);
}

function stopGalleryAutoplay() {
    if (galleryAutoplay) clearInterval(galleryAutoplay);
}

// Start autoplay when Gen Me section is visible
const genmeSection = document.getElementById('genme');
if (genmeSection) {
    const genmeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startGalleryAutoplay();
            } else {
                stopGalleryAutoplay();
            }
        });
    }, { threshold: 0.3 });
    genmeObserver.observe(genmeSection);

    // Pause autoplay on hover
    genmeSection.addEventListener('mouseenter', stopGalleryAutoplay);
    genmeSection.addEventListener('mouseleave', startGalleryAutoplay);
}

// --- Smooth Scroll ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// --- Project Card Tilt Effect ---
const tiltCards = document.querySelectorAll('[data-tilt]');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -3;
        const rotateY = (x - centerX) / centerX * 3;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// --- Contact Form ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const btn = this.querySelector('.btn-submit');
        const originalText = btn.querySelector('span').textContent;

        btn.querySelector('span').textContent = 'Sending...';
        btn.disabled = true;
        btn.style.opacity = '0.7';

        // Simulate send (replace with actual backend integration)
        setTimeout(() => {
            btn.querySelector('span').textContent = 'Message Sent!';
            btn.style.opacity = '1';
            btn.style.background = '#22c55e';

            setTimeout(() => {
                btn.querySelector('span').textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
                contactForm.reset();
            }, 2500);
        }, 1500);
    });
}

// --- Parallax on Hero Image ---
const heroImage = document.querySelector('.hero-image-wrapper');
if (heroImage && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrolled * 0.08}px)`;
        }
    });
}

// --- Magnetic effect on buttons ---
const magneticBtns = document.querySelectorAll('.btn-primary, .social-link');
magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// --- Navbar links smooth highlight transition ---
navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transition = 'color 0.3s ease';
    });
});

// --- Lazy-load iframes only when visible ---
const lazyIframes = document.querySelectorAll('iframe[data-src]');
if (lazyIframes.length > 0) {
    const iframeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                iframe.src = iframe.dataset.src;
                iframe.removeAttribute('data-src');
                iframeObserver.unobserve(iframe);
            }
        });
    }, { rootMargin: '200px 0px' });

    lazyIframes.forEach(iframe => iframeObserver.observe(iframe));
}

// --- Preload optimization ---
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('dom-loaded');
});

// --- Init: No loader, animate hero immediately ---
document.body.style.overflow = 'auto';
animateHeroElements();
