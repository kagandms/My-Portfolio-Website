import os

certs = [
    {
        "id": "1ci",
        "img": "career-summit-certificate.jpg",
        "link": "https://www.linkedin.com/posts/ka%C4%9Fan-samet-durmu%C5%9F-37676332b_1ci-erp-lowcode-activity-7373363778568155136-_Ked?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFM6QEoB3fJ7KWB-cZLfO1grw5j0KdYfJCM",
        "tr": {"title": "Yazılım Geliştiriciler için Low-Code ERP Eğitimi - 1Ci", "desc": "ERP sistemleri, iş süreçleri ve yazılım geliştirme arasındaki bağlantıyı destekleyen ürün ve operasyon odaklı eğitim.", "btn": "1Ci Eğitim LinkedIn kaydı"},
        "en": {"title": "1Ci Low-Code ERP Training for Software Developers", "desc": "Training that connects ERP systems, business processes, and software development from a product and operations perspective.", "btn": "1Ci Training LinkedIn post"},
        "ru": {"title": "Обучение 1Ci Low-Code ERP для разработчиков ПО", "desc": "Обучение, связывающее ERP-системы, бизнес-процессы и разработку ПО с точки зрения продукта и операций.", "btn": "Пост LinkedIn о 1Ci Training"}
    },
    {
        "id": "yeni_dunya",
        "img": "social-impact-project-certificate.jpg",
        "link": "https://www.linkedin.com/posts/ka%C4%9Fan-samet-durmu%C5%9F-37676332b_managementinformationsystems-it-event-activity-7268885658868326400-dM4D?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFM6QEoB3fJ7KWB-cZLfO1grw5j0KdYfJCM",
        "tr": {"title": "Yeni Dünya Zirvesi", "desc": "Sosyal etki odaklı proje ve etkinlik katılımını destekleyen kanıt.", "btn": "Yeni Dünya Zirvesi LinkedIn kaydı"},
        "en": {"title": "New World Summit", "desc": "Supporting evidence of project and event participation with a social impact angle.", "btn": "New World Summit LinkedIn post"},
        "ru": {"title": "Саммит Нового Мира", "desc": "Подтверждение участия в проекте и мероприятии с социальным влиянием.", "btn": "Пост LinkedIn о Новом Мире"}
    },
    {
        "id": "girisimcilik",
        "img": "entrepreneurship-certificate.jpg",
        "link": "https://www.linkedin.com/posts/ka%C4%9Fan-samet-durmu%C5%9F-37676332b_managementinformationsystems-it-event-activity-7268885658868326400-dM4D?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFM6QEoB3fJ7KWB-cZLfO1grw5j0KdYfJCM",
        "tr": {"title": "Girişimcilik Sertifikası", "desc": "Girişimcilik ve teknoloji odaklı eğitim çıktılarını özetleyen sertifika görseli.", "btn": "Girişimcilik sertifikası LinkedIn kaydı"},
        "en": {"title": "Entrepreneurship Certificate", "desc": "Certificate visual summarizing entrepreneurship and technology-focused training outcomes.", "btn": "Entrepreneurship certificate LinkedIn post"},
        "ru": {"title": "Сертификат по предпринимательству", "desc": "Визуал сертификата, подводящий итоги обучения по предпринимательству и технологиям.", "btn": "Пост LinkedIn о сертификате по предпринимательству"}
    },
    {
        "id": "innovation",
        "img": "innovationday.jpg",
        "link": "https://www.linkedin.com/posts/ka%C4%9Fan-samet-durmu%C5%9F-37676332b_innovationday-managementinformationsystems-activity-7412858899415846912-qsBO?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFM6QEoB3fJ7KWB-cZLfO1grw5j0KdYfJCM",
        "tr": {"title": "İnovasyon Günü Katılımı", "desc": "Uygulamalı öğrenme ve etkinlik görünürlüğünü gösteren İnovasyon Günü katılımı.", "btn": "İnovasyon Günü LinkedIn kaydı"},
        "en": {"title": "Innovation Day Participation", "desc": "Innovation Day participation highlight showing applied learning and event visibility.", "btn": "Innovation Day LinkedIn post"},
        "ru": {"title": "Участие в Innovation Day", "desc": "Участие в Innovation Day, демонстрирующее прикладное обучение и видимость на мероприятиях.", "btn": "Пост LinkedIn об Innovation Day"}
    },
    {
        "id": "linkedin",
        "img": "linkedin-profile-visibility.jpg",
        "link": "https://www.linkedin.com/posts/ka%C4%9Fan-samet-durmu%C5%9F-37676332b_managementinformationsystems-it-event-activity-7268885658868326400-dM4D?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFM6QEoB3fJ7KWB-cZLfO1grw5j0KdYfJCM",
        "tr": {"title": "LinkedIn Profil Görünürlüğü", "desc": "LinkedIn üzerindeki profesyonel ağımı, paylaşımlarımı ve görünürlüğümü destekleyen profil kaydı.", "btn": "LinkedIn profil görünürlüğü LinkedIn kaydı"},
        "en": {"title": "LinkedIn Profile Visibility", "desc": "Visibility signal reflecting public profile reach and professional network credibility on LinkedIn.", "btn": "LinkedIn visibility LinkedIn post"},
        "ru": {"title": "Видимость профиля LinkedIn", "desc": "Сигнал видимости, отражающий публичный охват профиля и профессиональную сеть в LinkedIn.", "btn": "Пост LinkedIn о видимости профиля"}
    },
    {
        "id": "russian",
        "img": "russianb1.jpeg",
        "link": "https://www.linkedin.com/posts/ka%C4%9Fan-samet-durmu%C5%9F-37676332b_russian-multilingual-education-activity-7413902758560501761-ZyuQ?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFM6QEoB3fJ7KWB-cZLfO1grw5j0KdYfJCM",
        "tr": {"title": "Rusça B1 - İSMEK", "desc": "Rusça öğrenimini yalnızca ilgi alanı olarak değil, çok dilli ürün geliştirme ve içerik üretimi için sürdürülen bir yetkinlik olarak konumlandırır.", "btn": "İSMEK Rusça B1 LinkedIn kaydı"},
        "en": {"title": "Russian B1 - ISMEK", "desc": "Language certificate validating B1 Russian proficiency, supporting multilingual communication capabilities.", "btn": "ISMEK Russian B1 LinkedIn post"},
        "ru": {"title": "Русский B1 - ИСМЕК", "desc": "Языковой сертификат, подтверждающий владение русским языком на уровне B1 и поддерживающий многоязычные коммуникативные навыки.", "btn": "Пост LinkedIn о русском B1"}
    },
    {
        "id": "office",
        "img": "temelofisprogramlari.jpeg",
        "link": "https://www.linkedin.com/posts/ka%C4%9Fan-samet-durmu%C5%9F-37676332b_enstitaesiaovstanbul-iaovsmek-eafbitim-activity-7353406307560734723-ae73?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFM6QEoB3fJ7KWB-cZLfO1grw5j0KdYfJCM",
        "tr": {"title": "Temel Ofis Programları - İSMEK", "desc": "Excel ve ofis araçlarıyla operasyonel kayıt, raporlama ve iş takibi tarafındaki uygulamalı zemini destekler.", "btn": "İSMEK Ofis Programları LinkedIn kaydı"},
        "en": {"title": "Basic Office Programs - ISMEK", "desc": "Supports the applied foundation in operational recording, reporting, and workflow tracking using Excel and office tools.", "btn": "ISMEK Office Programs LinkedIn post"},
        "ru": {"title": "Базовые офисные программы - ИСМЕК", "desc": "Поддерживает прикладную базу в операционном учете, отчетности и отслеживании рабочих процессов с использованием Excel и офисных инструментов.", "btn": "Пост LinkedIn об офисных программах"}
    },
    {
        "id": "sql",
        "img": "sqlserver.jpeg",
        "link": "https://www.linkedin.com/posts/ka%C4%9Fan-samet-durmu%C5%9F-37676332b_sql-veritabanaft-databasedesign-activity-7348663085248737281-ns9I?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFM6QEoB3fJ7KWB-cZLfO1grw5j0KdYfJCM",
        "tr": {"title": "SQL Server'da Temel Veritabanı Tasarımı - İSMEK", "desc": "Veritabanı modelleme, SQL ve veri yönetimi odağını akademik derslerin dışında da güçlendiren teknik eğitim kaydı.", "btn": "İSMEK SQL Server LinkedIn kaydı"},
        "en": {"title": "Basic Database Design in SQL Server - ISMEK", "desc": "Technical training record reinforcing database modeling, SQL, and data management focus outside of academic coursework.", "btn": "ISMEK SQL Server LinkedIn post"},
        "ru": {"title": "Базовое проектирование баз данных в SQL Server - ИСМЕК", "desc": "Запись о техническом обучении, усиливающая фокус на моделировании баз данных, SQL и управлении данными вне академических курсов.", "btn": "Пост LinkedIn о SQL Server"}
    },
    {
        "id": "foder",
        "img": "foder.jpeg",
        "link": "https://www.linkedin.com/posts/ka%C4%9Fan-samet-durmu%C5%9F-37676332b_financialliteracy-finance-finansalokuryazarlaftk-activity-7404814549729906688-NLPP?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFM6QEoB3fJ7KWB-cZLfO1grw5j0KdYfJCM",
        "tr": {"title": "Finansal Okuryazarlık Eğitimi - FODER", "desc": "Fintech, piyasa araştırması ve kişisel finans okuryazarlığı zeminini güçlendiren finans eğitimi kaydı.", "btn": "FODER Finansal Okuryazarlık LinkedIn kaydı"},
        "en": {"title": "Financial Literacy Training - FODER", "desc": "Finance training record strengthening the foundation for fintech, market research, and personal financial literacy.", "btn": "FODER Financial Literacy LinkedIn post"},
        "ru": {"title": "Обучение финансовой грамотности - FODER", "desc": "Запись о финансовом обучении, укрепляющая базу для финтеха, исследований рынка и личной финансовой грамотности.", "btn": "Пост LinkedIn о финансовой грамотности (FODER)"}
    },
    {
        "id": "23",
        "img": "finansalokuryazarlik23.jpeg",
        "link": "https://www.linkedin.com/posts/ka%C4%9Fan-samet-durmu%C5%9F-37676332b_financialliteracy-finance-economics-activity-7428065303059689472-4ZyD?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFM6QEoB3fJ7KWB-cZLfO1grw5j0KdYfJCM",
        "tr": {"title": "Finansal Okuryazarlık Sertifikası - 23", "desc": "Finansal okuryazarlık odağını destekleyen ek sertifika kaydı; proje sayfalarındaki finans araştırması yönüyle birlikte okunmalı.", "btn": "23 Finansal Okuryazarlık LinkedIn kaydı"},
        "en": {"title": "Financial Literacy Certificate - 23", "desc": "Additional certificate record supporting the financial literacy focus; should be read alongside the finance research angle in project pages.", "btn": "23 Financial Literacy LinkedIn post"},
        "ru": {"title": "Сертификат финансовой грамотности - 23", "desc": "Дополнительная запись о сертификате, поддерживающая фокус на финансовой грамотности; следует рассматривать вместе с финансовыми исследованиями на страницах проектов.", "btn": "Пост LinkedIn о финансовой грамотности (23)"}
    },
    {
        "id": "kentsel",
        "img": "kentseldonusum.jpeg",
        "link": "https://www.linkedin.com/posts/ka%C4%9Fan-samet-durmu%C5%9F-37676332b_urbantransformation-eventmanagement-operationalexcellence-activity-7439973894834356224-KRg2?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFM6QEoB3fJ7KWB-cZLfO1grw5j0KdYfJCM",
        "tr": {"title": "Uluslararası Kentsel Dönüşüm Zirvesi", "desc": "Aktif olarak organizasyonunda yer aldığım, kentsel dönüşüm vizyonunu destekleyen zirve katılımım.", "btn": "Kentsel Dönüşüm Zirvesi LinkedIn kaydı"},
        "en": {"title": "International Urban Transformation Summit", "desc": "Summit participation supporting the urban transformation vision, where I actively took part in the organization.", "btn": "Urban Transformation Summit LinkedIn post"},
        "ru": {"title": "Международный саммит по городской трансформации", "desc": "Участие в саммите, поддерживающем видение городской трансформации, где я активно участвовал в организации.", "btn": "Пост LinkedIn о саммите городской трансформации"}
    },
    {
        "id": "albaraka",
        "img": "alabaraka.jpg",
        "link": "",
        "tr": {"title": "Albaraka Sertifikası", "desc": "Albaraka etkinlik ve eğitim sertifikası, katılım bankacılığı farkındalığı.", "btn": ""},
        "en": {"title": "Albaraka Certificate", "desc": "Albaraka event and training certificate, participation banking awareness.", "btn": ""},
        "ru": {"title": "Сертификат Albaraka", "desc": "Сертификат мероприятия и обучения Albaraka, осведомленность об исламском банкинге.", "btn": ""}
    }
]

def build_container(lang):
    html = '            <div class="certificates-container">\n'
    for cert in certs:
        data = cert[lang]
        html += '                <article class="certificate-card">\n'
        html += '                    <div class="certificate-image-wrapper">\n'
        html += f'                        <img src="{cert["img"]}" alt="{data["title"]}" class="certificate-image" loading="lazy" decoding="async">\n'
        html += '                    </div>\n'
        title_tag = 'h4' if lang == 'tr' else 'h3'
        html += f'                    <{title_tag}>{data["title"]}</{title_tag}>\n'
        html += f'                    <p class="certificate-caption">{data["desc"]}</p>\n'
        if cert["link"]:
            html += f'                    <a href="{cert["link"]}" target="_blank" rel="noopener noreferrer" class="card-link">{data["btn"]}</a>\n'
        html += '                </article>\n'
    return html

files_info = [
    ('/Users/kagansmtdms/Downloads/Проекты/мойсайт/index.html', 'tr', '</section>'),
    ('/Users/kagansmtdms/Downloads/Проекты/мойсайт/certificates.html', 'en', '</main>'),
    ('/Users/kagansmtdms/Downloads/Проекты/мойсайт/certificates-ru.html', 'ru', '</main>')
]

for filepath, lang, closing_tag in files_info:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    parts = content.split('<div class="certificates-container">')
    # Everything before the first <div class="certificates-container">
    before = parts[0]
    
    # Everything after the LAST container in the section
    # Wait, the certificates container might be split differently now because I removed the second one!
    # So there is only ONE <div class="certificates-container"> in the file now!
    after_split = parts[1].split(closing_tag)
    after = closing_tag + closing_tag.join(after_split[1:])
    
    new_container = build_container(lang)
    
    new_content = before + new_container + '            </div>\n        ' + after
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Processed {filepath} for lang {lang}")

