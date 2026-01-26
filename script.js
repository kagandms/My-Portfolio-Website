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

    // 7. CONTACT FORM MAILTO HANDLING
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = this.querySelector('input[name="name"]').value;
            const phone = this.querySelector('input[name="phone"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const subject = this.querySelector('input[name="subject"]').value;
            const message = this.querySelector('textarea[name="message"]').value;

            // New Fields
            const birthdate = this.querySelector('input[name="birthdate"]').value;

            const genderInput = this.querySelector('input[name="gender"]:checked');
            const gender = genderInput ? genderInput.value : 'Belirtilmedi';

            const professionInput = this.querySelector('select[name="profession"]');
            const profession = professionInput ? professionInput.value : 'Belirtilmedi';

            // Get all checked hobbies
            const hobbyInputs = this.querySelectorAll('input[name="hobbies"]:checked');
            const hobbies = Array.from(hobbyInputs).map(cb => cb.value).join(', ');

            // Construct email body
            const body = `Ad Soyad: ${name}%0D%0A`
                + `E-posta: ${email}%0D%0A`
                + `Telefon: ${phone}%0D%0A`
                + `Doğum Tarihi: ${birthdate}%0D%0A`
                + `Cinsiyet: ${gender}%0D%0A`
                + `Meslek/Bölüm: ${profession}%0D%0A`
                + `Hobiler: ${hobbies}%0D%0A`
                + `---------------------------%0D%0A`
                + `Mesaj:%0D%0A${message}`;

            // Open mail client
            window.location.href = `mailto:kagan.durmus@topkapi.edu.tr?subject=${encodeURIComponent(subject)}&body=${body}`;

            // Optional: Show success message or clear form
            alert('Mail uygulamanız açılıyor...');
            // this.reset(); // Optional: keep data if mail doesn't open
        });
    }
});

// --- HELPER FUNCTIONS ---

function toggleMenu() {
    const nav = document.getElementById('navbar');
    // Toggle class regardless of screen width, CSS handles visibility of the button
    nav.classList.toggle('active');
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
