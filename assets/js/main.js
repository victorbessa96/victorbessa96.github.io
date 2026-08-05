/* =========================================================
   Victor Bessa Ribeiro — Portfolio JS
   Scrollspy, theme toggle, preloader, print resume button.
   Runs as external file (CSP: script-src 'self').
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
                document.cookie = 'theme=' + next + ';path=/;max-age=31536000;SameSite=Strict';
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

    // ── Print Resume button ──────────────────────────────
    var printBtn = document.getElementById('printBtn');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }

})();
