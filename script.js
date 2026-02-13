/* Global Javascript */

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
            }, 500); // Kucuk bir gecikme
        });
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

    // Stagger Effect for Cards
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

    // Phone Input Validation
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    // Contact Form Handling (Formspree AJAX)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Gönderiliyor...';
            submitBtn.disabled = true;

            const formData = new FormData(this);

            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Mesajınız başarıyla gönderildi! Teşekkürler.');
                    this.reset();
                } else {
                    const data = await response.json();
                    if (Object.hasOwnProperty.call(data, 'errors')) {
                        alert(data.errors.map(error => error.message).join(", "));
                    } else {
                        alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.');
                    }
                }
            } catch (error) {
                alert('Bir hata oluştu. Lütfen bağlantınızı kontrol ediniz.');
                console.error('Form hatası:', error);
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});

// Helper Functions

function toggleMenu() {
    const nav = document.getElementById('navbar');
    // Toggle class regardless of screen width CSS handles visibility of the button
    nav.classList.toggle('active');
}

async function loadNews() {
    const container = document.getElementById('news-container');
    if (!container) return;

    // Dil tespiti
    const lang = document.documentElement.lang || 'tr';

    let newsData = [];

    // Gercek API olmadigi icin ornek verileri dile gore secebiliriz veya genel İngilizce Turkce karisik tutabiliriz
    // Simdilik mevcut yapiyi koruyalim ama dile gore basliklari cevirebiliriz

    const sampleNews = [
        {
            title: lang === 'tr' ? "Yenilikçilik Günü Etkinliği" : (lang === 'ru' ? "Мероприятие День Инноваций" : "Innovation Day Event"),
            excerpt: lang === 'tr' ? "Girişimcilik ve yenilikçilik üzerine harika bir etkinlik deneyimi." : (lang === 'ru' ? "Замечательный опыт мероприятия по предпринимательству и инновациям." : "Great event experience on entrepreneurship and innovation."),
            category: lang === 'tr' ? "Etkinlik" : (lang === 'ru' ? "Событие" : "Event"),
            source: "LinkedIn",
            date: "2024-01-10",
            image: "innovationday.jpg",
            url: "https://www.linkedin.com/in/ka%C4%9Fan-samet-durmu%C5%9F-37676332b/"
        },
        {
            title: lang === 'tr' ? "Girişimcilik Sertifikası" : (lang === 'ru' ? "Сертификат по Предпринимательству" : "Entrepreneurship Certificate"),
            excerpt: lang === 'tr' ? "Girişimcilik ekosistemine dair yeni yetkinlikler kazandım." : (lang === 'ru' ? "Приобрел новые навыки в экосистеме предпринимательства." : "Gained new competencies regarding the entrepreneurship ecosystem."),
            category: lang === 'tr' ? "Sertifika" : (lang === 'ru' ? "Сертификат" : "Certificate"),
            source: "LinkedIn",
            date: "2024-01-09",
            image: "girisimcilik.jpg",
            url: "https://www.linkedin.com/in/ka%C4%9Fan-samet-durmu%C5%9F-37676332b/"
        },
        {
            title: lang === 'tr' ? "Yeni Başarı: Birincilik Ödülü" : (lang === 'ru' ? "Новое Достижение: Первая Награда" : "New Achievement: First Place Award"),
            excerpt: lang === 'tr' ? "Yarışmada elde ettiğimiz birincilik başarısını kutluyoruz." : (lang === 'ru' ? "Празднуем наш успех, заняв первое место в конкурсе." : "Celebrating our first place success in the competition."),
            category: lang === 'tr' ? "Başarı" : (lang === 'ru' ? "Достижение" : "Achievement"),
            source: "LinkedIn",
            date: "2024-01-08",
            image: "1ci.jpg",
            url: "https://www.linkedin.com/feed/update/urn:li:share:7413902757469937664"
        },
        {
            title: lang === 'tr' ? "Fayda Sağlayan Projeler" : (lang === 'ru' ? "Полезные Проекты" : "Beneficial Projects"),
            excerpt: lang === 'tr' ? "Topluma fayda sağlayan projeler geliştirmeye devam ediyorum." : (lang === 'ru' ? "Продолжаю разрабатывать проекты, приносящие пользу обществу." : "Continuing to develop projects that benefit society."),
            category: "Proje",
            source: "LinkedIn",
            date: "2024-01-05",
            image: "faydasicok.jpg",
            url: "https://www.linkedin.com/in/ka%C4%9Fan-samet-durmu%C5%9F-37676332b/"
        },
        {
            title: lang === 'tr' ? "LinkedIn Ağım Genişliyor" : (lang === 'ru' ? "Моя Сеть LinkedIn Расширяется" : "My LinkedIn Network is Growing"),
            excerpt: lang === 'tr' ? "Profesyonel ağımı genişletiyor, yeni bağlantılar kuruyorum." : (lang === 'ru' ? "Расширяю свою профессиональную сеть, создаю новые связи." : "Expanding my professional network, making new connections."),
            category: "LinkedIn",
            source: "LinkedIn",
            date: "2024-01-01",
            image: "linkedn.jpg",
            url: "https://www.linkedin.com/in/ka%C4%9Fan-samet-durmu%C5%9F-37676332b/"
        },

    ];

    // Yukleme simulasyonu
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
