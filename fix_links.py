import re

files = [
    '/Users/kagansmtdms/Downloads/Проекты/мойсайт/index.html',
    '/Users/kagansmtdms/Downloads/Проекты/мойсайт/certificates.html',
    '/Users/kagansmtdms/Downloads/Проекты/мойсайт/certificates-ru.html'
]

link_map = {
    '1ci': 'https://www.linkedin.com/posts/ka%C4%9Fan-samet-durmu%C5%9F-37676332b_1ci-erp-lowcode-activity-7373363778568155136-_Ked?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFM6QEoB3fJ7KWB-cZLfO1grw5j0KdYfJCM',
    'yeni_dunya': 'https://www.linkedin.com/posts/ka%C4%9Fan-samet-durmu%C5%9F-37676332b_managementinformationsystems-it-event-activity-7268885658868326400-dM4D?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFM6QEoB3fJ7KWB-cZLfO1grw5j0KdYfJCM',
    'sql': 'https://www.linkedin.com/posts/ka%C4%9Fan-samet-durmu%C5%9F-37676332b_sql-veritabanaft-databasedesign-activity-7348663085248737281-ns9I?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFM6QEoB3fJ7KWB-cZLfO1grw5j0KdYfJCM',
    'office': 'https://www.linkedin.com/posts/ka%C4%9Fan-samet-durmu%C5%9F-37676332b_enstitaesiaovstanbul-iaovsmek-eafbitim-activity-7353406307560734723-ae73?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFM6QEoB3fJ7KWB-cZLfO1grw5j0KdYfJCM',
    'foder': 'https://www.linkedin.com/posts/ka%C4%9Fan-samet-durmu%C5%9F-37676332b_financialliteracy-finance-finansalokuryazarlaftk-activity-7404814549729906688-NLPP?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFM6QEoB3fJ7KWB-cZLfO1grw5j0KdYfJCM',
    'innovation': 'https://www.linkedin.com/posts/ka%C4%9Fan-samet-durmu%C5%9F-37676332b_innovationday-managementinformationsystems-activity-7412858899415846912-qsBO?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFM6QEoB3fJ7KWB-cZLfO1grw5j0KdYfJCM',
    'rusca': 'https://www.linkedin.com/posts/ka%C4%9Fan-samet-durmu%C5%9F-37676332b_russian-multilingual-education-activity-7413902758560501761-ZyuQ?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFM6QEoB3fJ7KWB-cZLfO1grw5j0KdYfJCM',
    'finans23': 'https://www.linkedin.com/posts/ka%C4%9Fan-samet-durmu%C5%9F-37676332b_financialliteracy-finance-economics-activity-7428065303059689472-4ZyD?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFM6QEoB3fJ7KWB-cZLfO1grw5j0KdYfJCM',
    'kentsel': 'https://www.linkedin.com/posts/ka%C4%9Fan-samet-durmu%C5%9F-37676332b_urbantransformation-eventmanagement-operationalexcellence-activity-7439973894834356224-KRg2?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFM6QEoB3fJ7KWB-cZLfO1grw5j0KdYfJCM'
}

for f in files:
    with open(f, 'r') as file:
        content = file.read()
    
    # 1Ci Low-Code ERP (card)
    content = content.replace('1Ci Low-Code ERP eğitimi sürecini belgeleyen çıktı; profesyonel görünürlük ve kariyer odağını güçlendiren bir dönüm noktası.</p>',
                              f'1Ci Low-Code ERP eğitimi sürecini belgeleyen çıktı; profesyonel görünürlük ve kariyer odağını güçlendiren bir dönüm noktası.</p>\n                <a href="{link_map["1ci"]}" target="_blank" rel="noopener noreferrer" class="card-link">1Ci Eğitim LinkedIn kaydı</a>')
    
    content = content.replace('External signal from 1Ci Low-Code ERP Training, reinforcing professional visibility and career positioning.</p>',
                              f'External signal from 1Ci Low-Code ERP Training, reinforcing professional visibility and career positioning.</p>\n                <a href="{link_map["1ci"]}" target="_blank" rel="noopener noreferrer" class="card-link">1Ci Training LinkedIn post</a>')
    
    content = content.replace('Обучение 1Ci Low-Code ERP, усиливающее профессиональную видимость.</p>',
                              f'Обучение 1Ci Low-Code ERP, усиливающее профессиональную видимость.</p>\n                <a href="{link_map["1ci"]}" target="_blank" rel="noopener noreferrer" class="card-link">Пост LinkedIn о 1Ci Training</a>')

    # Social impact project -> Yeni Dünya Zirvesi
    content = content.replace('<h4>Social impact project</h4>', '<h4>Yeni Dünya Zirvesi</h4>')
    content = content.replace('<h3>Social impact project</h3>', '<h3>Yeni Dünya Zirvesi (New World Summit)</h3>')
    
    content = content.replace('Sosyal etki odaklı proje ve etkinlik katılımını destekleyen kanıt.</p>',
                              f'Sosyal etki odaklı proje ve etkinlik katılımını destekleyen kanıt.</p>\n                <a href="{link_map["yeni_dunya"]}" target="_blank" rel="noopener noreferrer" class="card-link">Yeni Dünya Zirvesi LinkedIn kaydı</a>')
    
    content = content.replace('Supporting evidence of project and event participation with a social impact angle.</p>',
                              f'Supporting evidence of project and event participation with a social impact angle.</p>\n                <a href="{link_map["yeni_dunya"]}" target="_blank" rel="noopener noreferrer" class="card-link">New World Summit LinkedIn post</a>')
    
    content = content.replace('Подтверждение участия в проекте и мероприятии с социальным влиянием.</p>',
                              f'Подтверждение участия в проекте и мероприятии с социальным влиянием.</p>\n                <a href="{link_map["yeni_dunya"]}" target="_blank" rel="noopener noreferrer" class="card-link">Пост LinkedIn о Новом Мире</a>')

    # Entrepreneurship
    content = content.replace('Girişimcilik ve teknoloji odaklı eğitim çıktılarını özetleyen sertifika görseli.</p>',
                              f'Girişimcilik ve teknoloji odaklı eğitim çıktılarını özetleyen sertifika görseli.</p>\n                <a href="{link_map["yeni_dunya"]}" target="_blank" rel="noopener noreferrer" class="card-link">Girişimcilik sertifikası LinkedIn kaydı</a>')
    content = content.replace('Certificate visual summarizing entrepreneurship and technology-focused training outcomes.</p>',
                              f'Certificate visual summarizing entrepreneurship and technology-focused training outcomes.</p>\n                <a href="{link_map["yeni_dunya"]}" target="_blank" rel="noopener noreferrer" class="card-link">Entrepreneurship certificate LinkedIn post</a>')
    content = content.replace('Визуал сертификата, подводящий итоги обучения по предпринимательству и технологиям.</p>',
                              f'Визуал сертификата, подводящий итоги обучения по предпринимательству и технологиям.</p>\n                <a href="{link_map["yeni_dunya"]}" target="_blank" rel="noopener noreferrer" class="card-link">Пост LinkedIn о сертификате по предпринимательству</a>')

    # Innovation Day
    content = content.replace('Uygulamalı öğrenme ve etkinlik görünürlüğünü gösteren İnovasyon Günü katılımı.</p>',
                              f'Uygulamalı öğrenme ve etkinlik görünürlüğünü gösteren İnovasyon Günü katılımı.</p>\n                <a href="{link_map["innovation"]}" target="_blank" rel="noopener noreferrer" class="card-link">İnovasyon Günü LinkedIn kaydı</a>')
    content = content.replace('Innovation Day participation highlight showing applied learning and event visibility.</p>',
                              f'Innovation Day participation highlight showing applied learning and event visibility.</p>\n                <a href="{link_map["innovation"]}" target="_blank" rel="noopener noreferrer" class="card-link">Innovation Day LinkedIn post</a>')
    content = content.replace('Участие в Innovation Day, демонстрирующее прикладное обучение и видимость на мероприятиях.</p>',
                              f'Участие в Innovation Day, демонстрирующее прикладное обучение и видимость на мероприятиях.</p>\n                <a href="{link_map["innovation"]}" target="_blank" rel="noopener noreferrer" class="card-link">Пост LinkedIn об Innovation Day</a>')

    # LinkedIn profile visibility
    content = content.replace('LinkedIn üzerindeki profesyonel ağımı, paylaşımlarımı ve görünürlüğümü destekleyen profil kaydı.</p>\n                <a href="https://www.linkedin.com/in/ka%C4%9Fan-samet-durmu%C5%9F-37676332b/" target="_blank" rel="noopener noreferrer" class="card-link">LinkedIn profil görünürlüğü kaydı</a>',
                              f'LinkedIn üzerindeki profesyonel ağımı, paylaşımlarımı ve görünürlüğümü destekleyen profil kaydı.</p>\n                <a href="{link_map["yeni_dunya"]}" target="_blank" rel="noopener noreferrer" class="card-link">LinkedIn profil görünürlüğü LinkedIn kaydı</a>')
    content = content.replace('Visibility signal reflecting public profile reach and professional network credibility on LinkedIn.</p>\n                <a href="https://www.linkedin.com/in/ka%C4%9Fan-samet-durmu%C5%9F-37676332b/" target="_blank" rel="noopener noreferrer" class="card-link">LinkedIn visibility profile</a>',
                              f'Visibility signal reflecting public profile reach and professional network credibility on LinkedIn.</p>\n                <a href="{link_map["yeni_dunya"]}" target="_blank" rel="noopener noreferrer" class="card-link">LinkedIn visibility LinkedIn post</a>')
    content = content.replace('Сигнал видимости, отражающий публичный охват профиля и профессиональную сеть в LinkedIn.</p>\n                <a href="https://www.linkedin.com/in/ka%C4%9Fan-samet-durmu%C5%9F-37676332b/" target="_blank" rel="noopener noreferrer" class="card-link">Профиль LinkedIn как сигнал видимости</a>',
                              f'Сигнал видимости, отражающий публичный охват профиля и профессиональную сеть в LinkedIn.</p>\n                <a href="{link_map["yeni_dunya"]}" target="_blank" rel="noopener noreferrer" class="card-link">Пост LinkedIn о видимости профиля</a>')

    # CV certificates (Add links)
    content = content.replace('Rusça dil becerimi (B1 seviyesi) doğrulayan ve çok dilli iletişim yetkinliğimi destekleyen dil sertifikası.</p>',
                              f'Rusça dil becerimi (B1 seviyesi) doğrulayan ve çok dilli iletişim yetkinliğimi destekleyen dil sertifikası.</p>\n                    <a href="{link_map["rusca"]}" target="_blank" rel="noopener noreferrer" class="card-link">İSMEK Rusça B1 LinkedIn kaydı</a>')
    content = content.replace('Language certificate validating B1 Russian proficiency, supporting multilingual communication capabilities.</p>',
                              f'Language certificate validating B1 Russian proficiency, supporting multilingual communication capabilities.</p>\n                    <a href="{link_map["rusca"]}" target="_blank" rel="noopener noreferrer" class="card-link">ISMEK Russian B1 LinkedIn post</a>')
    content = content.replace('Языковой сертификат, подтверждающий владение русским языком на уровне B1 и поддерживающий многоязычные коммуникативные навыки.</p>',
                              f'Языковой сертификат, подтверждающий владение русским языком на уровне B1 и поддерживающий многоязычные коммуникативные навыки.</p>\n                    <a href="{link_map["rusca"]}" target="_blank" rel="noopener noreferrer" class="card-link">Пост LinkedIn о русском B1</a>')

    content = content.replace('Excel ve ofis araçlarıyla operasyonel kayıt, raporlama ve iş takibi tarafındaki uygulamalı zemini destekler.</p>',
                              f'Excel ve ofis araçlarıyla operasyonel kayıt, raporlama ve iş takibi tarafındaki uygulamalı zemini destekler.</p>\n                    <a href="{link_map["office"]}" target="_blank" rel="noopener noreferrer" class="card-link">İSMEK Ofis Programları LinkedIn kaydı</a>')
    content = content.replace('Supports the applied foundation in operational recording, reporting, and workflow tracking using Excel and office tools.</p>',
                              f'Supports the applied foundation in operational recording, reporting, and workflow tracking using Excel and office tools.</p>\n                    <a href="{link_map["office"]}" target="_blank" rel="noopener noreferrer" class="card-link">ISMEK Office Programs LinkedIn post</a>')
    content = content.replace('Поддерживает прикладную базу в операционном учете, отчетности и отслеживании рабочих процессов с использованием Excel и офисных инструментов.</p>',
                              f'Поддерживает прикладную базу в операционном учете, отчетности и отслеживании рабочих процессов с использованием Excel и офисных инструментов.</p>\n                    <a href="{link_map["office"]}" target="_blank" rel="noopener noreferrer" class="card-link">Пост LinkedIn об офисных программах</a>')

    content = content.replace('Veritabanı modelleme, SQL ve veri yönetimi odağını akademik derslerin dışında da güçlendiren teknik eğitim kaydı.</p>',
                              f'Veritabanı modelleme, SQL ve veri yönetimi odağını akademik derslerin dışında da güçlendiren teknik eğitim kaydı.</p>\n                    <a href="{link_map["sql"]}" target="_blank" rel="noopener noreferrer" class="card-link">İSMEK SQL Server LinkedIn kaydı</a>')
    content = content.replace('Technical training record reinforcing database modeling, SQL, and data management focus outside of academic coursework.</p>',
                              f'Technical training record reinforcing database modeling, SQL, and data management focus outside of academic coursework.</p>\n                    <a href="{link_map["sql"]}" target="_blank" rel="noopener noreferrer" class="card-link">ISMEK SQL Server LinkedIn post</a>')
    content = content.replace('Запись о техническом обучении, усиливающая фокус на моделировании баз данных, SQL и управлении данными вне академических курсов.</p>',
                              f'Запись о техническом обучении, усиливающая фокус на моделировании баз данных, SQL и управлении данными вне академических курсов.</p>\n                    <a href="{link_map["sql"]}" target="_blank" rel="noopener noreferrer" class="card-link">Пост LinkedIn о SQL Server</a>')

    content = content.replace('ERP sistemleri, iş süreçleri ve yazılım geliştirme arasındaki bağlantıyı destekleyen ürün ve operasyon odaklı eğitim.</p>',
                              f'ERP sistemleri, iş süreçleri ve yazılım geliştirme arasındaki bağlantıyı destekleyen ürün ve operasyon odaklı eğitim.</p>\n                    <a href="{link_map["1ci"]}" target="_blank" rel="noopener noreferrer" class="card-link">1Ci Low-Code ERP LinkedIn kaydı</a>')
    content = content.replace('Training that connects ERP systems, business processes, and software development from a product and operations perspective.</p>',
                              f'Training that connects ERP systems, business processes, and software development from a product and operations perspective.</p>\n                    <a href="{link_map["1ci"]}" target="_blank" rel="noopener noreferrer" class="card-link">1Ci Low-Code ERP LinkedIn post</a>')
    content = content.replace('Обучение, связывающее ERP-системы, бизнес-процессы и разработку ПО с точки зрения продукта и операций.</p>',
                              f'Обучение, связывающее ERP-системы, бизнес-процессы и разработку ПО с точки зрения продукта и операций.</p>\n                    <a href="{link_map["1ci"]}" target="_blank" rel="noopener noreferrer" class="card-link">Пост LinkedIn о 1Ci ERP</a>')

    content = content.replace('Fintech, piyasa araştırması ve kişisel finans okuryazarlığı zeminini güçlendiren finans eğitimi kaydı.</p>',
                              f'Fintech, piyasa araştırması ve kişisel finans okuryazarlığı zeminini güçlendiren finans eğitimi kaydı.</p>\n                    <a href="{link_map["foder"]}" target="_blank" rel="noopener noreferrer" class="card-link">FODER Finansal Okuryazarlık LinkedIn kaydı</a>')
    content = content.replace('Finance training record strengthening the foundation for fintech, market research, and personal financial literacy.</p>',
                              f'Finance training record strengthening the foundation for fintech, market research, and personal financial literacy.</p>\n                    <a href="{link_map["foder"]}" target="_blank" rel="noopener noreferrer" class="card-link">FODER Financial Literacy LinkedIn post</a>')
    content = content.replace('Запись о финансовом обучении, укрепляющая базу для финтеха, исследований рынка и личной финансовой грамотности.</p>',
                              f'Запись о финансовом обучении, укрепляющая базу для финтеха, исследований рынка и личной финансовой грамотности.</p>\n                    <a href="{link_map["foder"]}" target="_blank" rel="noopener noreferrer" class="card-link">Пост LinkedIn о финансовой грамотности (FODER)</a>')

    content = content.replace('Finansal okuryazarlık odağını destekleyen ek sertifika kaydı; proje sayfalarındaki finans araştırması yönüyle birlikte okunmalı.</p>',
                              f'Finansal okuryazarlık odağını destekleyen ek sertifika kaydı; proje sayfalarındaki finans araştırması yönüyle birlikte okunmalı.</p>\n                    <a href="{link_map["finans23"]}" target="_blank" rel="noopener noreferrer" class="card-link">23 Finansal Okuryazarlık LinkedIn kaydı</a>')
    content = content.replace('Additional certificate record supporting the financial literacy focus; should be read alongside the finance research angle in project pages.</p>',
                              f'Additional certificate record supporting the financial literacy focus; should be read alongside the finance research angle in project pages.</p>\n                    <a href="{link_map["finans23"]}" target="_blank" rel="noopener noreferrer" class="card-link">23 Financial Literacy LinkedIn post</a>')
    content = content.replace('Дополнительная запись о сертификате, поддерживающая фокус на финансовой грамотности; следует рассматривать вместе с финансовыми исследованиями на страницах проектов.</p>',
                              f'Дополнительная запись о сертификате, поддерживающая фокус на финансовой грамотности; следует рассматривать вместе с финансовыми исследованиями на страницах проектов.</p>\n                    <a href="{link_map["finans23"]}" target="_blank" rel="noopener noreferrer" class="card-link">Пост LinkedIn о финансовой грамотности (23)</a>')

    # ADD Kentsel Donusum Zirvesi under CV certificates
    kentsel_tr = f"""                <article class="certificate-card">
                    <h4>Uluslararası Kentsel Dönüşüm Zirvesi - Bahçelievler Belediyesi</h4>
                    <p class="certificate-caption">Aktif olarak organizasyonunda yer aldığım, kentsel dönüşüm vizyonunu destekleyen zirve katılımım.</p>
                    <a href="{link_map["kentsel"]}" target="_blank" rel="noopener noreferrer" class="card-link">Kentsel Dönüşüm Zirvesi LinkedIn kaydı</a>
                </article>
            </div>"""

    kentsel_en = f"""                <article class="certificate-card">
                    <h3>International Urban Transformation Summit - Bahçelievler Municipality</h3>
                    <p class="certificate-caption">Summit participation supporting the urban transformation vision, where I actively took part in the organization.</p>
                    <a href="{link_map["kentsel"]}" target="_blank" rel="noopener noreferrer" class="card-link">Urban Transformation Summit LinkedIn post</a>
                </article>
            </div>"""

    kentsel_ru = f"""                <article class="certificate-card">
                    <h3>Международный саммит по городской трансформации - Муниципалитет Бахчелиэвлер</h3>
                    <p class="certificate-caption">Участие в саммите, поддерживающем видение городской трансформации, где я активно участвовал в организации.</p>
                    <a href="{link_map["kentsel"]}" target="_blank" rel="noopener noreferrer" class="card-link">Пост LinkedIn о саммите городской трансформации</a>
                </article>
            </div>"""

    if 'index.html' in f:
        if 'Uluslararası Kentsel Dönüşüm Zirvesi' not in content:
            content = content.replace('            </div>\n        </section>\n\n        <!-- ===== PROJELER', kentsel_tr + '\n        </section>\n\n        <!-- ===== PROJELER')
    elif 'certificates-ru.html' in f:
        if 'Международный саммит по городской трансформации' not in content:
            content = content.replace('            </div>\n        </main>', kentsel_ru + '\n        </main>')
    else:
        if 'International Urban Transformation Summit' not in content:
            content = content.replace('            </div>\n        </main>', kentsel_en + '\n        </main>')

    with open(f, 'w') as file:
        file.write(content)
