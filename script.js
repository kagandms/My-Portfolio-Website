/* --- GLOBAL JAVASCRIPT --- */

document.addEventListener('DOMContentLoaded', () => {
    // 1. PRELOADER
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500); // Küçük bir gecikme
        });
    }

    // 2. SCROLL ANIMATION OBSERVER
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

    // Stagger Effect for Cards
    document.querySelectorAll('.skills-container, .projects-container').forEach(container => {
        const cards = container.querySelectorAll('.skill-card, .project-card');
        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 150}ms`;
        });
    });

    // 3. NEWS ENGINE
    loadNews();

    // 4. THEME TOGGLE (DARK/LIGHT MODE)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    // Check local storage
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

    // 5. SCROLL TO TOP BUTTON
    const scrollTopBtn = document.getElementById('scroll-top-btn');

    window.addEventListener('scroll', () => {
        if (scrollTopBtn) {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }

        // Mobile Menu Auto Close on Scroll
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

    // 6. PHONE INPUT VALIDATION
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
});

// --- HELPER FUNCTIONS ---

function toggleMenu() {
    const nav = document.getElementById('navbar');
    if (window.innerWidth <= 768) {
        nav.classList.toggle('active');
    }
}

async function loadNews() {
    const container = document.getElementById('news-container');
    if (!container) return;

    // Dil tespiti (sayfanın lang attribute'undan)
    const lang = document.documentElement.lang || 'tr';

    let newsData = [];

    // Gerçek API olmadığı için örnek verileri dile göre seçebiliriz veya genel İngilizce/Türkçe karışık tutabiliriz.
    // Şimdilik mevcut yapıyı koruyalım ama dile göre başlıkları çevirebiliriz.

    const sampleNews = [
        {
            title: lang === 'tr' ? "Merkez Bankası Faiz Kararını Açıkladı" : (lang === 'ru' ? "Центральный Банк объявил решение по процентной ставке" : "Central Bank Announces Interest Rate Decision"),
            excerpt: lang === 'tr' ? "Türkiye Cumhuriyet Merkez Bankası, son toplantısında politika faizini sabit tutma kararı aldı." : (lang === 'ru' ? "Центральный Банк решил сохранить учетную ставку на последнем заседании." : "The Central Bank decided to keep the policy rate unchanged in its latest meeting."),
            category: lang === 'tr' ? "Ekonomi" : (lang === 'ru' ? "Экономика" : "Economy"),
            source: "Bloomberg",
            date: "2024-01-08",
            image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
            url: "https://www.bloomberg.com"
        },
        {
            title: lang === 'tr' ? "Kripto Para Piyasasında Son Gelişmeler" : (lang === 'ru' ? "Последние события на крипторынке" : "Latest Developments in Crypto Market"),
            excerpt: lang === 'tr' ? "Bitcoin, son haftalarda yaşanan yükseliş trendinin ardından direnç seviyelerini test ediyor." : (lang === 'ru' ? "Биткоин тестирует значительные уровни сопротивления после недавнего восходящего тренда." : "Bitcoin is testing significant resistance levels following the recent uptrend."),
            category: "Fintech",
            source: "CoinDesk",
            date: "2024-01-07",
            image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=200&fit=crop",
            url: "https://www.coindesk.com"
        },
        {
            title: lang === 'tr' ? "Yapay Zeka Finans Sektörünü Dönüştürüyor" : (lang === 'ru' ? "ИИ трансформирует финансовый сектор" : "AI is Transforming the Finance Sector"),
            excerpt: lang === 'tr' ? "Büyük finans kuruluşları, yapay zeka teknolojilerini risk yönetiminde kullanmaya başladı." : (lang === 'ru' ? "Крупные финансовые учреждения начали использовать технологии ИИ." : "Major financial institutions have started using AI technologies."),
            category: lang === 'tr' ? "Teknoloji" : (lang === 'ru' ? "Технологии" : "Technology"),
            source: "TechCrunch",
            date: "2024-01-06",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop",
            url: "https://techcrunch.com"
        },
        {
            title: lang === 'tr' ? "Borsa İstanbul'da Rekor Hacim" : (lang === 'ru' ? "Рекордный объём на фондовой бирже" : "Record Volume in Stock Exchange"),
            excerpt: lang === 'tr' ? "BIST 100 endeksi, yabancı yatırımcı ilgisiyle birlikte tarihi zirvelere ulaştı." : (lang === 'ru' ? "Индекс фондового рынка достиг исторических максимумов." : "The stock market index reached historic highs with foreign investor interest."),
            category: lang === 'tr' ? "Borsa" : (lang === 'ru' ? "Биржа" : "Stock Market"),
            source: "Reuters",
            date: "2024-01-05",
            image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=200&fit=crop",
            url: "https://www.reuters.com"
        },
        {
            title: lang === 'tr' ? "Dijital Bankacılık Trends 2024" : (lang === 'ru' ? "Тренды цифрового банкинга 2024" : "Digital Banking Trends 2024"),
            excerpt: lang === 'tr' ? "Yeni yılda dijital bankacılık hizmetlerinin daha da gelişmesi bekleniyor." : (lang === 'ru' ? "Ожидается дальнейшее развитие услуг цифрового банкинга." : "Digital banking services are expected to develop further in the new year."),
            category: "Fintech",
            source: "Finextra",
            date: "2024-01-04",
            image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop",
            url: "https://www.finextra.com"
        },
        {
            title: lang === 'tr' ? "Veri Analizi ile Yatırım Stratejileri" : (lang === 'ru' ? "Инвестиционные стратегии с аналитикой" : "Investment Strategies with Data Analytics"),
            excerpt: lang === 'tr' ? "Büyük veri ve makine öğrenmesi algoritmaları yatırım kararlarında kullanılıyor." : (lang === 'ru' ? "Большие данные и алгоритмы машинного обучения используются." : "Big data and machine learning algorithms are increasingly being used."),
            category: "Data Science",
            source: "Analytics Insight",
            date: "2024-01-03",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
            url: "https://www.analyticsinsight.net"
        }
    ];

    // Yükleme simülasyonu
    await new Promise(resolve => setTimeout(resolve, 800));

    container.innerHTML = sampleNews.map(news => `
        <article class="news-card" onclick="window.open('${news.url}', '_blank')">
            <div class="news-image-wrapper">
                <img src="${news.image}" alt="${news.title}" class="news-image" onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=200&fit=crop'">
            </div>
            <div class="news-content">
                <span class="news-category">${news.category}</span>
                <h3 class="news-title">${news.title}</h3>
                <p class="news-excerpt">${news.excerpt}</p>
                <div class="news-meta">
                    <span class="news-source"><i class="fas fa-newspaper"></i> ${news.source}</span>
                    <span class="news-date"><i class="far fa-calendar"></i> ${formatDate(news.date, lang)}</span>
                </div>
            </div>
        </article>
    `).join('');

    // Animasyon
    document.querySelectorAll('.news-card').forEach((card, index) => {
        card.classList.add('reveal');
        card.style.transitionDelay = `${index * 100}ms`;
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
