/* =========================================================
   Victor Bessa Ribeiro — Portfolio JS
   Scrollspy, theme toggle, preloader, entrance animations
   ========================================================= */

(function() {
    'use strict';

    // ── Preloader ────────────────────────────────────────
    // Use DOMContentLoaded (not load) so we don't wait for fonts.
    var preloader = document.querySelector('.preloader');
    function hidePreloader() {
        if (!preloader) return;
        preloader.classList.add('fade-out');
        setTimeout(function() {
            if (preloader && preloader.parentNode) {
                preloader.parentNode.removeChild(preloader);
            }
        }, 400);
    }
    if (document.readyState !== 'loading') {
        hidePreloader();
    } else {
        document.addEventListener('DOMContentLoaded', hidePreloader);
    }
    // Hard fallback: hide after 1.5s no matter what
    setTimeout(hidePreloader, 1500);

    // ── Theme Toggle ─────────────────────────────────────
    var root = document.documentElement;
    var toggle = document.getElementById('themeToggle');

    // Read cookie on init (prevent FOUC — the data-theme attr is set
    // before CSS loads via an inline script if needed, but cookie read
    // here is sufficient for the toggle state)
    var savedTheme = (function() {
        try {
            var match = document.cookie.match(/theme=(dark|light)/);
            return match ? match[1] : null;
        } catch(e) { return null; }
    })();

    if (savedTheme) {
        root.setAttribute('data-theme', savedTheme);
    }

    if (toggle) {
        toggle.addEventListener('click', function() {
            var current = root.getAttribute('data-theme') || 'dark';
            var next = current === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try {
                document.cookie = 'theme=' + next + ';path=/;max-age=31536000;SameSite=Lax';
            } catch(e) {}
        });
    }

    // ── Scrollspy ────────────────────────────────────────
    var navLinks = document.querySelectorAll('.nav__link');
    var sections = document.querySelectorAll('section[id]');
    var sectionMap = {};

    sections.forEach(function(section) {
        sectionMap[section.id] = section;
    });

    function updateActiveNav() {
        var activeId = null;
        var scrollPos = window.scrollY + 100;

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
    var ticking = false;
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
    var allSections = document.querySelectorAll('.section');
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px 0px -50px 0px'
        });

        allSections.forEach(function(section) {
            observer.observe(section);
        });
        // Mark any section already in the viewport on load
        allSections.forEach(function(section) {
            var rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                section.classList.add('visible');
                observer.unobserve(section);
            }
        });
    } else {
        // Fallback: show all sections
        allSections.forEach(function(section) {
            section.classList.add('visible');
        });
    }
    // Final safety: after 4s, if any section still isn't visible, show it
    // (covers browsers where observer fails silently)
    setTimeout(function() {
        allSections.forEach(function(section) {
            if (!section.classList.contains('visible')) {
                var rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight + 200) {
                    section.classList.add('visible');
                }
            }
        });
    }, 4000);

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
