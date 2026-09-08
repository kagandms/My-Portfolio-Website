const GOOGLE_ANALYTICS_ID = 'G-SX2WWHSD6J';
const STORAGE_THEME_KEY = 'theme';
const LIGHT_THEME_VALUE = 'light';
const DARK_THEME_VALUE = 'dark';
const PHONE_UNSUPPORTED_CHARACTER_PATTERN = /[^0-9+\s().-]/g;
const recoverableClientErrors = [];
const queuedAnalyticsEvents = [];
const PROJECT_SLUGS = new Map([
    ['askvirabot-telegram-bot-ru.html', 'askvirabot'],
    ['askvirabot-telegram-bot.html', 'askvirabot'],
    ['askvirabot-telegram-botu.html', 'askvirabot'],
    ['bist-moex-sector-comparison-analysis-ru.html', 'bist-moex'],
    ['bist-moex-sector-comparison-analysis.html', 'bist-moex'],
    ['bist-moex-sektorel-karsilastirma-analizi.html', 'bist-moex'],
    ['bist100-technical-analysis-tradingview-indicator-ru.html', 'bist100-indicator'],
    ['bist100-technical-analysis-tradingview-indicator.html', 'bist100-indicator'],
    ['bist100-teknik-analiz-tradingview-indikatoru.html', 'bist100-indicator'],
    ['dis-ticaret-veri-analitigi-web-scraping-projesi.html', 'foreign-trade-analytics'],
    ['fintechterms-project-ru.html', 'fintechterms'],
    ['fintechterms-project.html', 'fintechterms'],
    ['fintechterms-projesi.html', 'fintechterms'],
    ['foreign-trade-data-analytics-web-scraping-project-ru.html', 'foreign-trade-analytics'],
    ['foreign-trade-data-analytics-web-scraping-project.html', 'foreign-trade-analytics'],
]);

document.addEventListener('DOMContentLoaded', () => {
    loadDeferredStyles();
    bindMenuToggle();
    bindLogoScroll();
    bindRevealAnimations();
    bindThemeToggle();
    bindScrollTopButton();
    bindPhoneInput();
    bindImageFallbacks();
    bindAnalytics();
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
    publishQueuedAnalyticsEvents();
    publishRecoverableClientErrors();

    const analyticsScript = document.createElement('script');
    analyticsScript.async = true;
    analyticsScript.src = analyticsSource;
    document.head.appendChild(analyticsScript);
}

function bindAnalytics() {
    const pageContext = getPageContext();
    bindLanguageAnalytics();
    bindProfileAnalytics();

    if (pageContext.pageType === 'project') {
        trackAnalyticsEvent('project_view', { project_slug: pageContext.projectSlug });
        bindProjectCtaAnalytics(pageContext.projectSlug);
    }

    if (pageContext.pageType === 'contact') {
        bindContactAnalytics();
    }
}

function getPageContext() {
    const pageFileName = window.location.pathname.split('/').pop() || 'index.html';
    const projectSlug = PROJECT_SLUGS.get(pageFileName);
    if (projectSlug) {
        return { pageType: 'project', projectSlug };
    }

    if (pageFileName === 'contact.html' || pageFileName === 'contact-ru.html' || pageFileName === 'iletisim.html') {
        return { pageType: 'contact', projectSlug: null };
    }

    return { pageType: getHubPageType(pageFileName), projectSlug: null };
}

function getHubPageType(pageFileName) {
    const pageTypeGroups = new Map([
        ['home', ['index.html', 'index-en.html', 'index-ru.html']],
        ['about', ['about.html', 'about-ru.html', 'hakkinda.html']],
        ['skills', ['skills.html', 'skills-ru.html', 'yetenekler.html']],
        ['projects', ['projects.html', 'projects-ru.html', 'projeler.html']],
        ['certificates', ['certificates.html', 'certificates-ru.html', 'sertifikalar.html']],
    ]);

    for (const [pageType, pageNames] of pageTypeGroups) {
        if (pageNames.includes(pageFileName)) {
            return pageType;
        }
    }

    return 'page';
}

function bindLanguageAnalytics() {
    const currentLocale = document.documentElement.lang || 'unknown';
    document.querySelectorAll('a.lang-btn, a.mobile-lang-btn').forEach((link) => {
        link.addEventListener('click', () => {
            if (link.classList.contains('active')) {
                return;
            }

            const targetLocale = link.textContent.trim().toLowerCase();
            trackAnalyticsEvent('language_select', {
                current_locale: currentLocale,
                target_locale: targetLocale,
            });
        });
    });
}

function bindProfileAnalytics() {
    document.querySelectorAll('a[href]').forEach((link) => {
        const profileNetwork = getProfileNetwork(link.href);
        if (!profileNetwork) {
            return;
        }

        link.addEventListener('click', () => {
            trackAnalyticsEvent('profile_click', { profile_network: profileNetwork });
        });
    });
}

function getProfileNetwork(href) {
    const profileHosts = new Map([
        ['github.com', 'github'],
        ['linkedin.com', 'linkedin'],
        ['instagram.com', 'instagram'],
        ['t.me', 'telegram'],
        ['twitter.com', 'twitter'],
    ]);

    try {
        const host = new URL(href).hostname.replace(/^www\./, '');
        return profileHosts.get(host) || null;
    } catch {
        return null;
    }
}

function bindProjectCtaAnalytics(projectSlug) {
    document.querySelectorAll('a.card-link, a.project-link').forEach((link) => {
        link.addEventListener('click', () => {
            const ctaPosition = link.closest('.callout-actions') ? 'callout' : 'content';
            trackAnalyticsEvent('project_cta_click', {
                project_slug: projectSlug,
                cta_position: ctaPosition,
                target_url: link.href,
            });
        });
    });
}

function bindContactAnalytics() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) {
        return;
    }

    trackAnalyticsEvent('contact_view');
    let hasStarted = false;
    contactForm.addEventListener('focusin', (event) => {
        if (hasStarted || !(event.target instanceof HTMLElement) || event.target.name === '_gotcha') {
            return;
        }

        hasStarted = true;
        trackAnalyticsEvent('contact_start');
    });
    contactForm.addEventListener('submit', () => trackAnalyticsEvent('contact_submit'));

    if (new URLSearchParams(window.location.search).get('success') === '1') {
        showContactSuccessState();
        trackAnalyticsEvent('contact_success');
    }
}

function showContactSuccessState() {
    const statusMessage = document.getElementById('contact-success');
    if (statusMessage) {
        statusMessage.hidden = false;
    }
}

function trackAnalyticsEvent(eventName, parameters = {}) {
    const eventParameters = {
        locale: document.documentElement.lang || 'unknown',
        page_type: getPageContext().pageType,
        traffic_source: getTrafficSource(),
        ...parameters,
    };

    if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, eventParameters);
        return;
    }

    queuedAnalyticsEvents.push({ eventName, eventParameters });
}

function publishQueuedAnalyticsEvents() {
    if (typeof window.gtag !== 'function') {
        return;
    }

    while (queuedAnalyticsEvents.length > 0) {
        const analyticsEvent = queuedAnalyticsEvents.shift();
        window.gtag('event', analyticsEvent.eventName, analyticsEvent.eventParameters);
    }
}

function getTrafficSource() {
    const sourceFromQuery = new URLSearchParams(window.location.search).get('utm_source');
    if (sourceFromQuery) {
        return sourceFromQuery;
    }

    if (!document.referrer) {
        return 'direct';
    }

    try {
        return new URL(document.referrer).hostname;
    } catch {
        return 'unknown';
    }
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
