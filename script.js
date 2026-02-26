/* Global Javascript - Refactored */

const NEWS_DATA = [
    {
        id: 1,
        title: {
            tr: "Yenilikçilik Günü Etkinliği",
            ru: "Мероприятие День Инноваций",
            en: "Innovation Day Event"
        },
        excerpt: {
            tr: "Girişimcilik ve yenilikçilik üzerine harika bir etkinlik deneyimi.",
            ru: "Замечательный опыт мероприятия по предпринимательству и инновациям.",
            en: "Great event experience on entrepreneurship and innovation."
        },
        category: {
            tr: "Etkinlik",
            ru: "Событие",
            en: "Event"
        },
        source: "LinkedIn",
        date: "2024-01-10",
        image: "innovationday.jpg",
        url: "https://www.linkedin.com/in/ka%C4%9Fan-samet-durmu%C5%9F-37676332b/"
    },
    {
        id: 2,
        title: {
            tr: "Girişimcilik Sertifikası",
            ru: "Сертификат по Предпринимательству",
            en: "Entrepreneurship Certificate"
        },
        excerpt: {
            tr: "Girişimcilik ekosistemine dair yeni yetkinlikler kazandım.",
            ru: "Приобрел новые навыки в экосистеме предпринимательства.",
            en: "Gained new competencies regarding the entrepreneurship ecosystem."
        },
        category: {
            tr: "Sertifika",
            ru: "Сертификат",
            en: "Certificate"
        },
        source: "LinkedIn",
        date: "2024-01-09",
        image: "girisimcilik.jpg",
        url: "https://www.linkedin.com/in/ka%C4%9Fan-samet-durmu%C5%9F-37676332b/"
    },
    {
        id: 3,
        title: {
            tr: "Yeni Başarı: Birincilik Ödülü",
            ru: "Новое Достижение: Первая Награда",
            en: "New Achievement: First Place Award"
        },
        excerpt: {
            tr: "Yarışmada elde ettiğimiz birincilik başarısını kutluyoruz.",
            ru: "Празднуем наш успех, заняв первое место в конкурсе.",
            en: "Celebrating our first place success in the competition."
        },
        category: {
            tr: "Başarı",
            ru: "Достижение",
            en: "Achievement"
        },
        source: "LinkedIn",
        date: "2024-01-08",
        image: "1ci.jpg",
        url: "https://www.linkedin.com/feed/update/urn:li:share:7413902757469937664"
    },
    {
        id: 4,
        title: {
            tr: "Fayda Sağlayan Projeler",
            ru: "Полезные Проекты",
            en: "Beneficial Projects"
        },
        excerpt: {
            tr: "Topluma fayda sağlayan projeler geliştirmeye devam ediyorum.",
            ru: "Продолжаю разрабатывать проекты, приносящие пользу обществу.",
            en: "Continuing to develop projects that benefit society."
        },
        category: {
            tr: "Proje",
            ru: "Проект",
            en: "Project"
        },
        source: "LinkedIn",
        date: "2024-01-05",
        image: "faydasicok.jpg",
        url: "https://www.linkedin.com/in/ka%C4%9Fan-samet-durmu%C5%9F-37676332b/"
    },
    {
        id: 5,
        title: {
            tr: "LinkedIn Ağım Genişliyor",
            ru: "Моя Сеть LinkedIn Расширяется",
            en: "My LinkedIn Network is Growing"
        },
        excerpt: {
            tr: "Profesyonel ağımı genişletiyor, yeni bağlantılar kuruyorum.",
            ru: "Расширяю свою профессиональную сеть, создаю новые связи.",
            en: "Expanding my professional network, making new connections."
        },
        category: "LinkedIn", // Static string if same for all, or object if translated
        source: "LinkedIn",
        date: "2024-01-01",
        image: "linkedn.jpg",
        url: "https://www.linkedin.com/in/ka%C4%9Fan-samet-durmu%C5%9F-37676332b/"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        });
    }

    // Event Listeners (Refactoring Phase 2)
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    const logoContainer = document.querySelector('.logo-container');
    if (logoContainer) {
        logoContainer.addEventListener('click', () => window.scrollTo(0, 0));
    }

    // Scroll Animation Observer
    const elementsToAnimate = document.querySelectorAll(
        'section, h1, h2, h3, p, .skill-card, .project-card, .profile-img-container, .btn-primary, .social-icons, .schedule-item, .contact-form, .table-container, .iframe-wrapper, .news-card'
    );

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    elementsToAnimate.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // Stagger Effect
    document.querySelectorAll('.skills-container, .projects-container').forEach(container => {
        const cards = container.querySelectorAll('.skill-card, .project-card');
        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 150}ms`;
        });
    });

    // News Engine
    loadNews();

    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        if (themeIcon) themeIcon.className = 'fas fa-moon';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');

            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
                if (themeIcon) themeIcon.className = 'fas fa-moon';
            } else {
                localStorage.setItem('theme', 'dark');
                if (themeIcon) themeIcon.className = 'fas fa-sun';
            }
        });
    }

    // Scroll To Top Button
    const scrollTopBtn = document.getElementById('scroll-top-btn');

    window.addEventListener('scroll', () => {
        if (scrollTopBtn) {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }

        const nav = document.getElementById('navbar');
        if (window.innerWidth <= 768 && nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Phone Input
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
});

// Helper Functions
function toggleMenu() {
    const nav = document.getElementById('navbar');
    if (nav) nav.classList.toggle('active');
}

async function loadNews() {
    const container = document.getElementById('news-container');
    if (!container) return;

    // Detect language
    const htmlLang = document.documentElement.lang || 'tr';
    // Normalize lang code (e.g., 'en-US' -> 'en')
    const lang = htmlLang.split('-')[0];

    // Simulation delay
    await new Promise(resolve => setTimeout(resolve, 800));

    container.innerHTML = ''; // Temizle

    NEWS_DATA.forEach((news, index) => {
        // Resolve localized strings
        const title = typeof news.title === 'object' ? (news.title[lang] || news.title['en']) : news.title;
        const excerpt = typeof news.excerpt === 'object' ? (news.excerpt[lang] || news.excerpt['en']) : news.excerpt;
        const category = typeof news.category === 'object' ? (news.category[lang] || news.category['en']) : news.category;

        // Elementleri guvenli bir sekilde olustur
        const article = document.createElement('article');
        article.className = 'news-card reveal';
        article.style.transitionDelay = `${index * 100}ms`;
        article.setAttribute('data-url', news.url);

        // Resim Container
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'news-image-wrapper';
        const img = document.createElement('img');
        img.src = news.image;
        img.alt = title;
        img.className = 'news-image';
        img.onerror = function () {
            this.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=200&fit=crop';
        };
        imgWrapper.appendChild(img);

        // Icerik Container
        const contentDiv = document.createElement('div');
        contentDiv.className = 'news-content';

        const catSpan = document.createElement('span');
        catSpan.className = 'news-category';
        catSpan.textContent = category;

        const h3 = document.createElement('h3');
        h3.className = 'news-title';
        h3.textContent = title;

        const pExcerpt = document.createElement('p');
        pExcerpt.className = 'news-excerpt';
        pExcerpt.textContent = excerpt;

        const metaDiv = document.createElement('div');
        metaDiv.className = 'news-meta';

        const sourceSpan = document.createElement('span');
        sourceSpan.className = 'news-source';
        sourceSpan.innerHTML = '<i class="fas fa-newspaper"></i> ' + escapeHTML(news.source);

        const dateSpan = document.createElement('span');
        dateSpan.className = 'news-date';
        dateSpan.innerHTML = '<i class="far fa-calendar"></i> ' + escapeHTML(formatDate(news.date, lang));

        metaDiv.appendChild(sourceSpan);
        metaDiv.appendChild(dateSpan);

        contentDiv.appendChild(catSpan);
        contentDiv.appendChild(h3);
        contentDiv.appendChild(pExcerpt);
        contentDiv.appendChild(metaDiv);

        article.appendChild(imgWrapper);
        article.appendChild(contentDiv);

        // Guvenli Event Listener
        article.addEventListener('click', () => {
            const url = article.getAttribute('data-url');
            if (url) window.open(url, '_blank', 'noopener,noreferrer');
        });

        container.appendChild(article);

        // Animasyon
        setTimeout(() => article.classList.add('active'), 100);
    });
}

function escapeHTML(str) {
    if (!str) return '';
    return str.toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    // Add Animations and Event Listeners
    document.querySelectorAll('.news-card').forEach((card, index) => {
        card.classList.add('reveal');
        card.style.transitionDelay = `${index * 100}ms`;

        // Add click listener safely
        card.addEventListener('click', () => {
            const url = card.getAttribute('data-url');
            if (url) window.open(url, '_blank', 'noopener,noreferrer'); // Added security features here too
        });

        setTimeout(() => card.classList.add('active'), 100);
    });
}

function formatDate(dateStr, lang) {
    const date = new Date(dateStr);
    let locale = 'tr-TR';
    if (lang === 'en') locale = 'en-US';
    if (lang === 'ru') locale = 'ru-RU';

    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString(locale, options);
}
