const GOOGLE_ANALYTICS_ID = 'G-SX2WWHSD6J';

document.addEventListener('DOMContentLoaded', () => {
    bindMenuToggle();
    bindLogoScroll();
    bindRevealAnimations();
    bindThemeToggle();
    bindScrollTopButton();
    bindPhoneInput();
    scheduleAnalytics();
});

function bindMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
}

function bindLogoScroll() {
    const logoContainer = document.querySelector('.logo-container');
    if (!logoContainer || logoContainer.hasAttribute('onclick')) {
        return;
    }

    logoContainer.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function bindRevealAnimations() {
    const elements = document.querySelectorAll(
        'section, h1, h2, h3, p, .skill-card, .project-card, .case-study-panel, .profile-img-container, .btn-primary, .social-icons, .schedule-item, .contact-form, .table-container, .content-callout, .certificate-card, .breadcrumbs'
    );

    if (!elements.length || typeof IntersectionObserver === 'undefined') {
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        }
    );

    elements.forEach((element) => {
        element.classList.add('reveal');
        observer.observe(element);
    });

    document
        .querySelectorAll('.skills-container, .projects-container, .certificates-container, .case-study-grid')
        .forEach((container) => {
            const cards = container.querySelectorAll('.skill-card, .project-card, .certificate-card, .case-study-panel');
            cards.forEach((card, index) => {
                card.style.transitionDelay = `${index * 120}ms`;
            });
        });
}

function bindThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('.icon') : null;

    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        if (themeIcon) {
            themeIcon.className = 'icon icon-moon';
        }
    }

    if (!themeToggle) {
        return;
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');

        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            if (themeIcon) {
                themeIcon.className = 'icon icon-moon';
            }
            return;
        }

        localStorage.setItem('theme', 'dark');
        if (themeIcon) {
            themeIcon.className = 'icon icon-sun';
        }
    });
}

function bindScrollTopButton() {
    const scrollTopButton = document.getElementById('scroll-top-btn');

    window.addEventListener('scroll', () => {
        if (scrollTopButton) {
            const shouldShow = window.scrollY > 300;
            scrollTopButton.classList.toggle('visible', shouldShow);
        }

        const nav = document.getElementById('navbar');
        if (window.innerWidth <= 768 && nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });

    if (scrollTopButton) {
        scrollTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

function bindPhoneInput() {
    const phoneInput = document.getElementById('phone');
    if (!phoneInput) {
        return;
    }

    phoneInput.addEventListener('input', function handlePhoneInput() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
}

function scheduleAnalytics() {
    const ignoredHosts = new Set(['localhost', '127.0.0.1', '::1']);
    if (ignoredHosts.has(window.location.hostname)) {
        return;
    }

    const queueAnalytics = () => {
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(loadAnalytics, { timeout: 3000 });
            return;
        }

        loadAnalytics();
    };

    if (document.readyState === 'complete') {
        queueAnalytics();
        return;
    }

    window.addEventListener('load', queueAnalytics, { once: true });
}

function loadAnalytics() {
    const analyticsSource = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
    if (document.querySelector(`script[src="${analyticsSource}"]`)) {
        return;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
        window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GOOGLE_ANALYTICS_ID);

    const analyticsScript = document.createElement('script');
    analyticsScript.async = true;
    analyticsScript.src = analyticsSource;
    document.head.appendChild(analyticsScript);
}

function toggleMenu() {
    const nav = document.getElementById('navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    if (nav) {
        nav.classList.toggle('active');
        if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', String(nav.classList.contains('active')));
        }
    }
}
