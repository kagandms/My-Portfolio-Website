const GOOGLE_ANALYTICS_ID = 'G-SX2WWHSD6J';
const STORAGE_THEME_KEY = 'theme';
const LIGHT_THEME_VALUE = 'light';
const DARK_THEME_VALUE = 'dark';
const PHONE_UNSUPPORTED_CHARACTER_PATTERN = /[^0-9+\s().-]/g;
const recoverableClientErrors = [];

document.addEventListener('DOMContentLoaded', () => {
    loadDeferredStyles();
    bindMenuToggle();
    bindLogoScroll();
    bindRevealAnimations();
    bindThemeToggle();
    bindScrollTopButton();
    bindPhoneInput();
    bindImageFallbacks();
    scheduleAnalytics();
});

function loadDeferredStyles() {
    document.querySelectorAll('link[rel="preload"][as="style"][data-deferred-style]').forEach((styleLink) => {
        styleLink.rel = 'stylesheet';
        styleLink.removeAttribute('data-deferred-style');
    });
}

function bindMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.getElementById('navbar');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    if (!nav) {
        return;
    }

    nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    nav.addEventListener('click', (event) => {
        if (event.target === nav) {
            closeMenu();
        }
    });
}

function bindLogoScroll() {
    const logoContainer = document.querySelector('.logo-container');
    if (!logoContainer) {
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

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        elements.forEach((element) => {
            element.classList.add('active');
        });
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
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
        if (element.getBoundingClientRect().top < window.innerHeight * 0.9) {
            element.classList.add('active');
            return;
        }

        observer.observe(element);
    });

}

function bindThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('.icon') : null;

    if (readStorageValue(STORAGE_THEME_KEY) === LIGHT_THEME_VALUE) {
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
            writeStorageValue(STORAGE_THEME_KEY, LIGHT_THEME_VALUE);
            if (themeIcon) {
                themeIcon.className = 'icon icon-moon';
            }
            return;
        }

        writeStorageValue(STORAGE_THEME_KEY, DARK_THEME_VALUE);
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
        this.value = sanitizePhoneValue(this.value);
    });
}

function bindImageFallbacks() {
    document.querySelectorAll('img[data-fallback-src]').forEach((image) => {
        image.addEventListener(
            'error',
            () => {
                const fallbackSource = image.dataset.fallbackSrc;
                if (!fallbackSource) {
                    return;
                }

                image.removeAttribute('data-fallback-src');
                image.src = fallbackSource;
            },
            { once: true }
        );
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
    publishRecoverableClientErrors();

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

function readStorageValue(key) {
    try {
        return window.localStorage.getItem(key);
    } catch (error) {
        reportRecoverableClientError(`localStorage.getItem:${key}`, error);
        return null;
    }
}

function writeStorageValue(key, value) {
    try {
        window.localStorage.setItem(key, value);
        return true;
    } catch (error) {
        reportRecoverableClientError(`localStorage.setItem:${key}`, error);
        return false;
    }
}

function sanitizePhoneValue(value) {
    const supportedValue = value.replace(PHONE_UNSUPPORTED_CHARACTER_PATTERN, '');
    const firstVisibleIndex = supportedValue.search(/\S/);

    if (firstVisibleIndex === -1) {
        return supportedValue;
    }

    const prefix = supportedValue.slice(0, firstVisibleIndex);
    const visibleValue = supportedValue.slice(firstVisibleIndex);
    if (!visibleValue.startsWith('+')) {
        return supportedValue.replace(/\+/g, '');
    }

    return `${prefix}+${visibleValue.slice(1).replace(/\+/g, '')}`;
}

function reportRecoverableClientError(source, error) {
    const errorName = error instanceof Error ? error.name : 'UnknownError';
    recoverableClientErrors.push({ source, errorName });
}

function publishRecoverableClientErrors() {
    if (typeof window.gtag !== 'function') {
        return;
    }

    while (recoverableClientErrors.length > 0) {
        const errorEvent = recoverableClientErrors.shift();
        window.gtag('event', 'client_recoverable_error', {
            event_category: 'site_reliability',
            event_label: errorEvent.source,
            error_name: errorEvent.errorName,
        });
    }
}

function closeMenu() {
    const nav = document.getElementById('navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    if (!nav || !nav.classList.contains('active')) {
        return;
    }

    nav.classList.remove('active');
    if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
    }
}
