/* =========================================================
   Victor Bessa Ribeiro — Portfolio JS
   Scrollspy, theme toggle, preloader, entrance animations
   ========================================================= */

(function() {
    'use strict';

    // ── Preloader ────────────────────────────────────────
    const preloader = document.querySelector('.preloader');
    function hidePreloader() {
        if (!preloader) return;
        preloader.classList.add('fade-out');
        setTimeout(function() {
            if (preloader && preloader.parentNode) {
                preloader.parentNode.removeChild(preloader);
            }
        }, 400);
    }
    window.addEventListener('load', hidePreloader);
    // Fallback: hide preloader after 2s even if load doesn't fire
    setTimeout(hidePreloader, 2000);

    // ── Theme Toggle ─────────────────────────────────────
    const root = document.documentElement;
    const toggle = document.getElementById('themeToggle');

    // Read cookie on init (prevent FOUC — the data-theme attr is set
    // before CSS loads via an inline script if needed, but cookie read
    // here is sufficient for the toggle state)
    const savedTheme = (function() {
        try {
            const match = document.cookie.match(/theme=(dark|light)/);
            return match ? match[1] : null;
        } catch(e) { return null; }
    })();

    if (savedTheme) {
        root.setAttribute('data-theme', savedTheme);
    }

    if (toggle) {
        toggle.addEventListener('click', function() {
            const current = root.getAttribute('data-theme') || 'dark';
            const next = current === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try {
                document.cookie = 'theme=' + next + ';path=/;max-age=31536000;SameSite=Lax';
            } catch(e) {}
        });
    }

    // ── Scrollspy ────────────────────────────────────────
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('section[id]');
    const sectionMap = {};

    sections.forEach(function(section) {
        sectionMap[section.id] = section;
    });

    function updateActiveNav() {
        let activeId = null;
        const scrollPos = window.scrollY + 100;

        sections.forEach(function(section) {
            if (scrollPos >= section.offsetTop) {
                activeId = section.id;
            }
        });

        navLinks.forEach(function(link) {
            if (link.getAttribute('data-section') === activeId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Throttled scroll listener
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial state
    updateActiveNav();

    // ── Section Entrance Animations ──────────────────────
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.section').forEach(function(section) {
            observer.observe(section);
        });
    } else {
        // Fallback: show all sections
        document.querySelectorAll('.section').forEach(function(section) {
            section.classList.add('visible');
        });
    }

    // ── Smooth scroll for anchor links ───────────────────
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href === '#' || href.length < 2) return;
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

})();
