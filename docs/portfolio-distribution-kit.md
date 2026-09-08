# Portföy İçerik ve Dağıtım Kiti

Durum: Pre-live hazırlık; dış paylaşım ve canlı performans doğrulaması yapılmadı.
Tarih: 2026-09-08
Kaynak: docs/portfolio-growth-plan.md

## 1. Kullanım amacı

Bu kit, beş vaka çalışmasını üç dilde sürdürülebilir içeriklere dönüştürmek için
kullanılır. Her içerik tek bir vaka URL'sine yönlenir, doğrulanabilir iddialarla
sınırlıdır ve bir sonraki ölçüm adımını açık bırakır.

Temel anlatı sırası:

Problem → Yaklaşım → Mimari/stack → Workflow → Kanıt → Sonuç → CTA

Kullanılmaması gereken dil:

- doğrulanmamış trafik, CTR, kullanıcı veya dönüşüm sayıları
- garanti getiri, otomatik kazanç veya yatırım tavsiyesi
- canlı olarak doğrulanmamış entegrasyon ya da ürün sonucu
- yalnızca teknoloji listesinden oluşan, probleme bağlanmayan açıklamalar

## 2. Vaka aileleri ve içerik açıları

Her içerik serisinde aynı vaka ailesinin birincil hedef URL'si, içeriğin diliyle
eşleşmelidir. URL'ler mevcut yapı korunarak seçilmiştir.

| Vaka ailesi | Türkçe | İngilizce | Rusça | Slug |
|---|---|---|---|---|
| FinTechTerms | /fintechterms-projesi.html | /fintechterms-project.html | /fintechterms-project-ru.html | fintechterms |
| Dış ticaret analitiği | /dis-ticaret-veri-analitigi-web-scraping-projesi.html | /foreign-trade-data-analytics-web-scraping-project.html | /foreign-trade-data-analytics-web-scraping-project-ru.html | foreign-trade-analytics |
| BIST–MOEX araştırması | /bist-moex-sektorel-karsilastirma-analizi.html | /bist-moex-sector-comparison-analysis.html | /bist-moex-sector-comparison-analysis-ru.html | bist-moex |
| BIST100 indikatörü | /bist100-teknik-analiz-tradingview-indikatoru.html | /bist100-technical-analysis-tradingview-indicator.html | /bist100-technical-analysis-tradingview-indicator-ru.html | bist100-indicator |
| AskViraBot | /askvirabot-telegram-botu.html | /askvirabot-telegram-bot.html | /askvirabot-telegram-bot-ru.html | askvirabot |

### FinTechTerms

- Problem açısı: Finans terimleri farklı dillerde dağınık, bağlamsız ve
  öğrenme akışından kopuk sunulabiliyor.
- Mimari açısı: Next.js, TypeScript, Supabase, kavram-temelli içerik modeli,
  çok dilli bilgi mimarisi ve SEO birlikte ele alınıyor.
- Kanıt açısı: Terim eşleme, ilgili içerik bağlantıları ve ürün akışı
  üzerinden erişilebilir bir finans öğrenme deneyimi kuruluyor.
- Sınır: Arama trafiği, terim sayısı veya ürün başarısı gibi sayılar yalnızca
  güncel ürün kaynağında yeniden doğrulanırsa kullanılabilir.

### Dış ticaret analitiği

- Problem açısı: Dış ticaret kaynakları farklı formatlarda bulunduğunda
  karşılaştırma ve raporlama manuel hale geliyor.
- Mimari açısı: Python veri toplama/temizleme, SQL veri modeli ve Streamlit
  raporlama katmanları tek pipeline içinde gösteriliyor.
- Kanıt açısı: Kaynaklardan veri çekme, normalize etme, sorgulama ve karar
  destek çıktısı üretme akışı anlatılıyor.
- Sınır: Kaynak şemaları değişebileceği için scraping çıktısı her yayın
  öncesi yeniden kontrol edilir; doğrulanmamış güncellik iddiası kurulmaz.

### BIST–MOEX araştırması

- Problem açısı: Farklı piyasalardaki benzer şirketleri yalnızca tekil
  oranlarla kıyaslamak bağlam kaybına yol açabiliyor.
- Mimari açısı: Sektör eşleme, karşılaştırılabilir metrikler, makro bağlam ve
  Python destekli araştırma akışı birlikte kuruluyor.
- Kanıt açısı: Şirket ve sektör gruplarının aynı araştırma şablonunda
  incelenmesi, metodolojinin genişletilebilirliğini gösteriyor.
- Sınır: Sayfa yatırım tavsiyesi değildir; piyasa ve şirket verileri analiz
  tarihine göre birincil kaynaklardan yeniden doğrulanır.

### BIST100 indikatörü

- Problem açısı: MACD, RSI, ADX ve destek/direnç sinyallerinin ayrı ayrı
  okunması karar öncesi tutarlılığı zayıflatabiliyor.
- Mimari açısı: Pine Script ve TradingView üzerinde trend, momentum, güç ve
  seviye okuması ortak bir karar destek çerçevesinde toplanıyor.
- Kanıt açısı: Tek bir sihirli sinyal yerine birbirini doğrulayan katmanlar
  ve yeniden kullanılabilir araştırma mantığı açıklanıyor.
- Sınır: Getiri, doğruluk veya risk azaltımı iddiası yayımlanmaz; sayfa yatırım
  tavsiyesi ve garanti al-sat sonucu sunmaz.

### AskViraBot

- Problem açısı: Tekrarlanan küçük yardımcı işler farklı uygulamalara
  dağıldığında kullanıcı bağlam değiştirmek zorunda kalıyor.
- Mimari açısı: Python, Telegram Bot API ve modüler yardımcı akışları tek
  sohbet yüzeyinde birleştiriliyor.
- Kanıt açısı: Komutun alınması, ilgili yardımcı akışa yönlendirilmesi ve
  sonucun aynı konuşmada döndürülmesi gösteriliyor.
- Sınır: Canlı bot bağlantısı, özellikleri ve erişilebilirliği paylaşım
  öncesinde yeniden kontrol edilir.

## 3. Kanal ve dil eşlemesi

| Kanal | Birincil dil | Kullanım | Hedef |
|---|---|---|---|
| LinkedIn | Türkçe | Yerel profesyonel ve akademik anlatı | Türkçe vaka URL'si |
| LinkedIn | İngilizce | Uluslararası teknik ve ürün anlatısı | İngilizce vaka URL'si |
| LinkedIn | Rusça | Rusça öğrenme/fintech bağlamı uygunsa | Rusça vaka URL'si |
| GitHub README | İngilizce | Teknik bağlam, kurulum, veri/lisans ve demo | İngilizce vaka URL'si veya repo içindeki vaka bölümü |
| Portföy içi bağlantı | Sayfanın locale'i | Bağlamsal keşif ve vaka geçişi | UTM'siz eş locale URL'si |
| İlgili ürün sitesi | Ürünün ana dili | Sadece gerçekten ilgili referans bağlantısı | Uygun vaka veya ürün URL'si |

Aynı metin üç dilde kelimesi kelimesine çoğaltılmaz. Problem, terminoloji,
örnek ve CTA ilgili kitlenin diline göre yeniden yazılır.

## 4. UTM sözleşmesi

Harici içeriklerde aşağıdaki şablon kullanılır:

https://kagansametdurmus.com.tr/<locale-project-url>?utm_source=<source>&utm_medium=<medium>&utm_campaign=portfolio_<slug>&utm_content=<locale>_<angle>

İzin verilen değerler:

- utm_source: linkedin, github, product-site, research-note
- utm_medium: organic_social, referral, contextual_link
- utm_campaign: portfolio_<slug>
- utm_content: <locale>_<angle>; angle değerleri problem, architecture,
  evidence, readme, research-note olabilir

Örnekler:

- LinkedIn Türkçe problem içeriği:
  https://kagansametdurmus.com.tr/fintechterms-projesi.html?utm_source=linkedin&utm_medium=organic_social&utm_campaign=portfolio_fintechterms&utm_content=tr_problem
- GitHub README İngilizce vaka bağlantısı:
  https://kagansametdurmus.com.tr/foreign-trade-data-analytics-web-scraping-project.html?utm_source=github&utm_medium=referral&utm_campaign=portfolio_foreign-trade-analytics&utm_content=en_readme
- Araştırma notu:
  https://kagansametdurmus.com.tr/bist-moex-sektorel-karsilastirma-analizi.html?utm_source=research-note&utm_medium=contextual_link&utm_campaign=portfolio_bist-moex&utm_content=tr_research-note

İç navigasyonda UTM kullanılmaz; aksi istenmedikçe iç bağlantılar temiz
canonical URL'ye gider. UTM'li URL'nin canonical'ı yine ilgili temiz URL'dir.

## 5. İçerik taslakları

### Türkçe LinkedIn iskeleti

[Vaka adı] üzerinde çalışırken önce teknoloji listesini değil, çözülmesi
gereken problemi tanımladım.

Problem: [tek cümle]

Yaklaşım: [veri/ürün/otomasyon akışı]

Mimari: [yalnızca gerçekten kullanılan teknoloji ve katmanlar]

Kanıt: [ölçüm uydurmadan doğrulanabilir çıktı veya metodoloji]

Vakanın tamamı: [tek UTM'li hedef URL]

### English LinkedIn skeleton

I started [project name] from a concrete problem rather than from a stack
list.

Problem: [one sentence]

Approach: [data, product, or automation workflow]

Architecture: [only verified technologies and layers]

Evidence: [a verifiable output or methodology, without invented metrics]

Case study: [one UTM-tagged target URL]

### Русский LinkedIn skeleton

В проекте [название] я начал с конкретной задачи, а не со списка
технологий.

Проблема: [одно предложение]

Подход: [поток данных, продукта или автоматизации]

Архитектура: [только проверенные технологии и слои]

Доказательство: [проверяемый результат или методология без выдуманных
метрик]

Кейс: [один URL с UTM-метками]

### GitHub README vaka bölümü

Her repo veya proje README'sinde bu sıra korunur:

1. Problem ve kapsam
2. Mimari ve teknoloji
3. Veri kaynağı, lisans ve güncellik sınırı
4. Çalıştırma veya demo koşulları
5. Doğrulanabilir çıktı
6. Portföy vaka bağlantısı

README, portföy sayfasının iddialarını genişletebilir; ancak portföyde
bulunmayan başarı metriklerini kanıt olmadan eklemez.

## 6. Yayın öncesi kontrol listesi

- Hedef URL'nin locale ile eşleştiği ve yerelde 200 döndüğü kontrol edilir.
- Hedef sayfada tek H1, title, description, canonical, hreflang ve breadcrumb
  doğrulanır.
- İçerikte tek birincil hedef URL ve tek ana CTA bırakılır.
- Ekran görüntülerinde kişisel veri, token, anahtar ve özel hesap bilgisi
  bulunmadığı kontrol edilir.
- Kullanılan teknoloji, ürün özelliği ve canlı bağlantı kaynak sayfada
  yeniden doğrulanır.
- Trafik, CTR, dönüşüm, kullanıcı veya gelir metriği için kaynak gösterildi;
  kaynak yoksa iddia çıkarılır.
- Finansal vaka metni yatırım tavsiyesi, garanti getiri veya otomatik kazanç
  dili içermemeli.
- UTM değerleri sözleşmeye uygun ve lowercase olmalıdır.
- LinkedIn/GitHub/ürün sitesi için tek hedef URL kullanılır.
- Yayın sonrası GA4 project_view ve project_cta_click ile izlenebilecek
  olaylar not edilir.

## 7. Ölçüm ve karar ritmi

| Sinyal | Olay/kaynak | Yorum sınırı |
|---|---|---|
| Vaka görüntüleme | project_view | Instrumentation doğrulamasıdır; tek başına nitelikli temas değildir |
| Vaka CTA tıklaması | project_cta_click | CTA ilgisini gösterir; form başarısı anlamına gelmez |
| Profil tıklaması | profile_click | Harici profil yönelimi; işe alım sonucu değildir |
| İletişim akışı | contact_view, contact_start, contact_submit, contact_success | contact_success canlı Formspree akışı doğrulanmadan performans sayılmaz |
| Organic görünürlük | Search Console | En az 28, tercihen 56 günlük dönemlerle değerlendirilir |

İlk hafta teknik/event doğrulaması içindir. 14. gün erken sinyaller, 28. gün
ilk karar, 56. gün kalıcı CTR ve trafik değerlendirmesi içindir. Üç ila yedi
günlük veriden site geneli büyüme sonucu çıkarılmaz.

## 8. Bu kitin durumu

- [x] Beş vaka ailesi için problem, mimari ve kanıt açıları tanımlandı.
- [x] Üç dil için kanal ve hedef URL eşlemesi yapıldı.
- [x] UTM isimlendirme sözleşmesi ve örnekleri yazıldı.
- [x] LinkedIn ve GitHub README şablonları hazırlandı.
- [x] Yayın öncesi iddia, gizlilik, SEO ve ölçüm kontrol listesi oluşturuldu.
- [ ] LinkedIn, GitHub veya ilgili ürün sitesinde dış yayın yapılmadı.
- [ ] Canlı GA4 Realtime doğrulaması yapılmadı.
- [ ] Formspree canlı test gönderimi yapılmadı.
- [ ] Search Console 28/56 günlük performans değerlendirmesi yapılmadı.
- [ ] Deployment ve canlı UAT yapılmadı.
