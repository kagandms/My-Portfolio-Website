# Kağan Samet Durmuş Portföyü: Üç Dilli SEO, Trafik ve Dönüşüm Tasarımı

Durum: Tasarım onaylandı; uygulama henüz başlamadı.
Tarih: 2026-09-08

## 1. Amaç ve kapsam

Bu doküman, kişisel portföy sitesini üç dilde sürdürülebilir, arama motorlarınca anlaşılabilir ve nitelikli profesyonel temas üreten bir yapıya dönüştürmek için onaylanan tasarımı tanımlar.

Kapsam:

- Türkçe, İngilizce ve Rusça sayfa mimarisi
- Fintech, veri analizi, otomasyon ve çok dilli ürün konumlandırması
- Organic search, CTR ve trafik büyümesi
- GA4 ve Search Console ölçümleme
- Vaka çalışmaları, iç bağlantılar ve içerik dağıtımı
- Teknik doğrulama, yayın güvenliği ve kalite kapıları

Kapsam dışı:

- Bu aşamada doğrudan kod yazmak
- URL migration yapmak
- Doğrulanmamış trafik, CTR veya dönüşüm hedefleri uydurmak
- Siteyi freelance hizmet kataloğuna dönüştürmek

## 2. Onaylanan hedef kitle

### Birincil kitle

Fintech, data analytics ve automation alanlarında aday arayan işe alım yöneticileri, teknik liderler, fintech ürün ekipleri ve araştırma/analitik ekipleri.

### İkincil kitle

Akademik danışmanlar, araştırma ortakları ve ekonomi-finans alanında proje geliştirmek isteyen kişiler.

### Üçüncül kitle

Veri analitiği, otomasyon veya bilgi mimarisi konusunda proje iş birliği arayan kişiler.

## 3. Konumlandırma

Önerilen ana mesaj:

> Finans ve ekonomi bilgisini veri analizi, otomasyon ve çok dilli dijital ürünlerle birleştirerek araştırma ve ürün problemlerini yapılandırılmış sistemlere dönüştürüyorum.

Bu mesaj, portföyü genel bir “Python bilen öğrenci” profilinden çıkarıp finans, veri ve ürün arasında köprü kuran disiplinlerarası bir aday olarak konumlandırır.

## 4. Üç dilli URL mimarisi

Mevcut URL’ler korunacak. Türkçe tarafında eksik olan beş hub sayfası yeniden oluşturulacak:

```text
/                                      Türkçe ana portföy
/hakkinda.html                         Türkçe hakkında
/yetenekler.html                       Türkçe yetenekler
/projeler.html                         Türkçe proje hub’ı
/sertifikalar.html                     Türkçe sertifikalar
/iletisim.html                         Türkçe iletişim
```

İngilizce ve Rusça mevcut URL’leri korunacak:

```text
/about.html                            /about-ru.html
/skills.html                           /skills-ru.html
/projects.html                         /projects-ru.html
/certificates.html                     /certificates-ru.html
/contact.html                          /contact-ru.html
```

Beş ana proje vaka ailesi Türkçe, İngilizce ve Rusça ayrı URL’lerde tutulacak. Her indexlenebilir sayfa:

- Tek H1
- Tek birincil arama amacı
- Locale-specific title ve description
- Self-canonical
- `tr`, `en`, `ru`, `x-default` hreflang
- Breadcrumb
- Geçerli iç bağlantılar
- Sitemap kaydı

`program.html`, `schedule.html` ve `schedule-ru.html` yardımcı sayfaları `noindex` ve sitemap dışında kalacak.

## 5. Sayfa rolleri

### Ana sayfa

İlk izlenim ve hızlı karar sayfasıdır. İsim, uzmanlık konumlandırması, üç ana kanıt, öne çıkan projeler ve tek ana CTA içermelidir.

### Hakkında

MIS + Ekonomi kombinasyonunu, akademik durumu, profesyonel deneyimi ve bu geçmişin projelere nasıl dönüştüğünü açıklar.

### Yetenekler

Her yetenek kümesini gerçek bir projeye bağlar. Yetenek iddiası, teknoloji listesi ve kanıt sayfası birlikte gösterilir.

### Proje hub’ı

Beş ana vaka çalışmasına yönlendiren keşif ve iç bağlantı merkezidir. Kartlarda problem, stack, sonuç ve vaka bağlantısı bulunur.

### Vaka çalışmaları

Standart akış:

```text
Problem → Yaklaşım → Mimari/stack → Workflow → Kanıt → Sonuç → İletişim CTA
```

### Sertifikalar

Ana trafik kaynağı değil, projeleri destekleyen güven ve dış doğrulama katmanıdır.

### İletişim

Kısa, sade ve ölçülebilir dönüşüm sayfasıdır. Form başlangıcı, gönderim ve başarı durumu ayrı izlenmelidir.

## 6. Locale bazlı arama niyeti

### Türkçe

Kağan Samet Durmuş, fintech ve veri analizi portföyü, Python/SQL, BIST100, BIST-MOEX, Türkçe özgeçmiş ve kariyer aramaları.

### İngilizce

Fintech data analyst portfolio, Python data analytics project, foreign trade data analytics, BIST technical analysis, multilingual fintech product ve automation case study aramaları.

### Rusça

Fintech/data analytics portföyü, BIST/MOEX karşılaştırması, Python otomasyonu ve çok dilli ürün mimarisi aramaları.

Metinler mekanik çeviri olarak değil, ilgili dilin arama niyeti ve profesyonel terminolojisine göre hazırlanmalıdır.

## 7. Organic search ve CTR sistemi

Önce Search Console verisi locale, sayfa, sorgu, ülke, cihaz ve pozisyon kırılımlarıyla çıkarılacak.

| Fırsat | Müdahale |
|---|---|
| Yüksek gösterim, pozisyon 1–10, düşük CTR | Title, description ve snippet mesajı |
| Pozisyon 11–20 | İçerik derinliği, H2 yapısı ve iç bağlantı |
| Düşük gösterim, yüksek niyet | Yeni içerik veya daha net arama hedefi |
| Yanlış locale gösterimi | Hreflang, canonical ve içerik kontrolü |
| Marka sorgusu | İsim, profil, proje ve sosyal kanıt bütünlüğü |

Her deneyde tek sayfa veya sayfa ailesi değiştirilecek. Önceki 28 veya tercihen 56 günlük baz dönem kaydedilecek. Benzer değişmeyen sayfalar kontrol grubu olarak tutulacak. 3–7 günlük verilerle site geneli sonuç çıkarılmayacak.

## 8. Ölçümleme mimarisi

### North Star metriği

Vaka çalışması veya yetenek sayfasını inceledikten sonra gerçekleşen nitelikli profesyonel temas.

### Birincil KPI’lar

- Organic clicks
- Organic CTR
- Average position
- Nitelikli iletişim gönderimleri
- Vaka çalışmasından iletişime geçiş oranı
- Organic trafikten gelen temas oranı
- LinkedIn ve GitHub tıklamaları

### GA4 olayları

```text
language_select
project_view
project_cta_click
profile_click
contact_view
contact_start
contact_submit
contact_success
cv_download
```

Olay parametreleri: `locale`, `page_type`, `project_slug`, `cta_position`, `traffic_source`.

### Ölçüm ritmi

- İlk hafta: teknik ve event doğrulama
- 14. gün: erken sinyaller
- 28. gün: ilk karar
- 56. gün: kalıcı CTR ve trafik değerlendirmesi

Instrumentation doğrulaması performans başarısı olarak raporlanmayacak.

## 9. Trafik ve içerik dağıtımı

Her vaka çalışması üç içerik formatına dönüştürülecek:

1. Problem: Hangi gerçek problemi çözüyordu?
2. Mimari: Hangi veri, teknoloji veya workflow kullanıldı?
3. Kanıt: Ne çıktı ve ne öğrenildi?

Dağıtım kanalları:

- LinkedIn: Türkçe yerel/akademik, İngilizce uluslararası teknik kitle
- GitHub: README, demo, teknoloji, veri/lisans ve site bağlantısı
- FinTechTerms ve ilgili ürün siteleri: karşılıklı referans bağlantıları
- Araştırma notları: BIST/MOEX, data pipeline, fintech ürün mimarisi, API otomasyonu ve çok dilli bilgi mimarisi

Her içerikte tek hedef URL, UTM takibi ve doğrulanabilir iddia bulunmalıdır. Üç dilde aynı metin mekanik olarak çoğaltılmamalıdır.

## 10. Uygulama sırası

### Faz 0 — Teknik bütünlük

- Eksik Türkçe sayfaları oluştur
- Beş canlı sitemap 404’ünü düzelt
- Hreflang reciprocity’yi düzelt
- Sitemap’i gerçek URL’lerle eşitle
- Eski OG görsellerini ve bağlantıları temizle
- Statik/canlı doğrulamayı tüm rotaları kapsayacak şekilde düzelt

### Faz 1 — Bilgi mimarisi ve mesaj

- Üç dilde aynı sayfa türlerini oluştur
- Hero mesajını hedef kitleye göre keskinleştir
- Mobil CTA’yı erken görünür yap
- Proje, yetenek, hakkında ve iletişim akışını düzenle
- CV indirme seçeneğini değerlendir

### Faz 2 — On-page SEO ve CTR

- Locale-specific title, description ve H1
- GSC verisiyle pozisyon 1–10 düşük CTR fırsatları
- Vaka çalışması kanıtlarını güçlendir
- İç bağlantı matrisi oluştur
- Schema ve breadcrumb kontrolleri

### Faz 3 — İçerik ve dağıtım

- Vaka çalışması tabanlı LinkedIn içerikleri
- GitHub README ve demo bağlantıları
- Araştırma notları
- Nitelikli dış bağlantılar
- UTM ve locale bazlı kanal ölçümü

## 11. Kalite kapıları

### Teknik

- Sitemap URL’lerinin tamamı canlıda `200`
- Hreflang hedeflerinin tamamı geçerli
- Canonical, lang, title, description ve H1 tutarlı
- JSON-LD parse edilebilir
- Mobil navigasyon ve CTA çalışır
- Form gerçek testle doğrulanır
- GA4 olayları Realtime’da görünür
- `npm run verify` ve canlı rota doğrulaması geçer

### İçerik

- Her sayfada tek ana arama niyeti
- Locale’e doğal uyarlanmış metin
- Her yetenek iddiası proje kanıtına bağlı
- Ölçülmemiş metrikler başarı gibi sunulmaz
- Güncelleme tarihleri içerikle uyumludur
- Vaka sayfalarında kaynak/metodoloji notu vardır

## 12. Karar kaydı

1. Site üç dilde korunacak.
2. Mevcut URL yapısı korunacak.
3. Eksik Türkçe hub sayfaları geri oluşturulacak.
4. Birincil kitle fintech/data/automation işe alım ekipleri olacak.
5. Akademik iş birlikleri ikincil kitle olacak.
6. North Star metriği nitelikli profesyonel temas olacak.
7. CTR değişiklikleri kontrollü ve 28–56 günlük dönemlerle ölçülecek.
8. Önce teknik bütünlük, sonra SEO/CTR, sonra içerik dağıtımı uygulanacak.
9. Sertifikalar destekleyici güven katmanı, vaka çalışmaları ana trafik/kanıt katmanı olacak.

## 13. Açık uygulama girdileri

Uygulamaya başlamadan önce güncel olarak alınması gereken veriler:

- Search Console son 28 ve 56 günlük export’u
- GA4 son 28 ve 90 günlük raporu
- Mevcut form gönderimlerinin nitelikli/niteliksiz ayrımı
- Hangi iş/rol başvurularının öncelikli olduğu
- CV PDF eklenip eklenmeyeceği
- Proje vaka sayfalarında kullanılabilecek gerçek ekran görüntüleri, GitHub bağlantıları ve doğrulanabilir metrikler
