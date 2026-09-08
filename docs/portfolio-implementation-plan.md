# Kağan Samet Durmuş Portföyü — Uygulama Planı

Durum: Faz 0–2 kod ve yerel doğrulama tamamlandı; Faz 3 pre-live hazırlığı sürüyor.
Tarih: 2026-09-08
Kaynak tasarım: `docs/portfolio-growth-plan.md`

## 1. Understanding summary

- Site, Türkçe, İngilizce ve Rusça profesyonel portföy deneyimi sunacak.
- Birincil hedef kitle fintech, veri analizi ve otomasyon alanlarında aday arayan ekiplerdir.
- Ana konumlandırma finans/ekonomi bilgisini veri analizi, otomasyon ve çok dilli dijital ürünlerle birleştirmektir.
- Mevcut URL aileleri korunacak; URL migration veya framework migration yapılmayacak.
- Beş Türkçe hub sayfası eksiktir: `hakkinda.html`, `yetenekler.html`, `projeler.html`, `sertifikalar.html`, `iletisim.html`.
- Vaka çalışmaları üç dilde ayrı URL aileleri olarak korunacaktır.
- Ölçümleme, teknik doğrulamadan sonra eklenecek; instrumentation doğrulaması performans başarısı sayılmayacaktır.

## 2. Başlangıç durumu ve kanıt

Bu bölüm, ilk uygulama değişikliklerinden önceki baseline'ı kaydeder. Aşağıdaki
başarısızlık ve eksik olay notları başlangıç kanıtıdır; güncel durum, bu bölümün
sonundaki yürütme özeti ve sonraki faz durumlarında tutulur.

- Repo statik HTML/CSS/JS yapısındadır.
- Mevcut checkout'ta 31 HTML dosyası vardır; üç yardımcı sayfa çıkarıldığında 28 indexlenebilir HTML dosyası kalır.
- `npm run verify:syntax` başarılıdır.
- `npm run verify`, mevcut olmayan `iletisim.html` okunamadığı için başarısız olmaktadır. Bu, mevcut test akışındaki ilk bloklayıcı hatadır.
- Mevcut indexlenebilir içerik ve vaka sayfalarında canonical, hreflang, JSON-LD ve breadcrumb altyapısının önemli bölümü bulunmaktadır.
- `script.js` GA4 yüklemesi ve `client_recoverable_error` olayını içerir; proje/iletişim dönüşüm olayları henüz yoktur.
- Kullanıcının mevcut çalışma ağacındaki dosyalar uygulama sırasında korunacaktır.

### Güncel yürütme durumu

- Beş Türkçe hub sayfası eklenmiş ve toplam HTML dosyası 36'ya çıkmıştır.
- Üç yardımcı sayfa çıkarıldığında 33 indexlenebilir HTML dosyası kalır.
- npm run verify:syntax, npm run verify ve git diff --check başarılıdır.
- Yerel tarayıcı kontrolünde yeni Türkçe route'lar, tek H1, breadcrumb,
  iletişim başarı durumu ve vaka sayfası konsol davranışı kontrol edilmiştir.
- GA4 kuyruğu, locale/proje bağlamı ve proje/iletişim olayları script.js içine
  eklenmiştir.
- CV linki veya CV asset'i bulunmadığı için cv_download olayı bağlanmamıştır.
- Canlı GA4, canlı Formspree gönderimi, deployment ve UAT yapılmamıştır.

## 3. Tasarım kararları

### D1 — Statik fazlı iyileştirme

Mevcut statik yapı ve URL'ler korunacaktır. Beş Türkçe hub sayfası önce tamamlanacak, framework veya generator refactor'u bu faza alınmayacaktır.

Alternatifler: veri tabanlı statik üretim veya framework migration. Bu alternatifler daha iyi uzun vadeli tekrar kullanılabilirlik sağlayabilir; ancak mevcut kapsamda URL, deploy ve içerik regresyonu riskini artırır.

### D2 — Hub ve vaka ayrımı

Ana sayfa hızlı karar ve kanıt özeti olarak kalacaktır. Hakkında, yetenekler, projeler, sertifikalar ve iletişim sayfaları derinleştirilebilir hub katmanı olacaktır. Vaka sayfaları standart `Problem → Yaklaşım → Mimari/stack → Workflow → Kanıt → Sonuç → CTA` akışını izleyecektir.

### D3 — Locale bütünlüğü

Her indexlenebilir sayfada tek H1, tek birincil arama amacı, locale-specific metadata, self-canonical, `tr`, `en`, `ru`, `x-default` hreflang, breadcrumb ve sitemap kaydı bulunacaktır.

### D4 — Dönüşüm ölçümünde gerçek başarı

`contact_submit` gönderim teşebbüsünü, `contact_success` ise Formspree başarı durumunu temsil edecektir. Başarı olayı, locale'e özgü başarı durumu veya başarı URL'si doğrulanmadan üretilemeyecektir.

## 4. Sayfa ve içerik blueprint'i

### Ana sayfa

- H1: finans, veri analizi, otomasyon ve çok dilli ürün konumlandırması.
- H2: odak alanları, kanıtlar, öne çıkan projeler, iletişim CTA'sı.
- Mevcut Türkçe anchor bölümleri ilk fazda korunur; hub sayfaları tamamlandıktan sonra ana navigasyonla desteklenir.

### Hakkında

- H2: MIS + Ekonomi temeli, akademik durum, deneyim, projelere dönüşen yaklaşım.
- Proje ve yetenek hub'larına bağlanan kanıt blokları.

### Yetenekler

- H2: veri analizi/pipeline, fintech araştırması, otomasyon, çok dilli ürün mimarisi.
- Her kümede teknoloji, yetkinlik açıklaması ve en az bir kanıt projesi.

### Projeler

- Beş ana vaka ailesi için problem, yaklaşım, çıktı ve vaka bağlantısı.
- İlgili yetenek ve iletişim sayfalarına bağlanan hub CTA'sı.

### Sertifikalar

- Eğitim, etkinlik ve dış doğrulama kümeleri.
- Sertifika kartları ilgili yetenek/proje kanıtına bağlanır; yalnızca görsel galerisi olarak bırakılmaz.

### İletişim

- İletişim amacı, form, alternatif profesyonel kanallar ve veri kullanımı açıklaması.
- Locale'e özgü başarı durumu ve ölçülebilir form akışı.

## 5. İç bağlantı matrisi

| Kaynak | Birincil hedefler | Amaç |
|---|---|---|
| Ana sayfa | Hakkında, Yetenekler, Projeler, İletişim, beş vaka | Hızlı keşif ve karar |
| Hakkında | Yetenekler, Projeler, ilgili vaka sayfaları | Arka planı kanıta bağlamak |
| Yetenekler | İlgili vaka sayfaları, Projeler, İletişim | İddia → kanıt akışı |
| Projeler | Beş vaka, Yetenekler, İletişim | Vaka keşfi ve dönüşüm |
| Vaka sayfası | İlgili hub, ilgili yetenek, İletişim | Derin inceleme → temas |
| Sertifikalar | İlgili yetenek/proje | Dış doğrulama |
| İletişim | Başarı durumu ve güvenli iletişim bilgisi | Nitelikli temas |

Her sayfada tekrar eden, bağlamsız bağlantı sayısı artırılmayacak; link metinleri hedef sayfanın gerçek rolünü açıklayacaktır.

## 6. Uygulama sırası

### Faz 0A — İçerik sözleşmesi

1. Beş Türkçe sayfa için H1, title, description, OG görseli, primary intent ve CTA tablosunu hazırlamak.
2. İngilizce/Rusça eş sayfalarla bilgi mimarisini eşlemek.
3. Türkçe metinleri mekanik çeviri yerine doğal profesyonel terminolojiyle yazmak.
4. Formspree başarı durumu/URL davranışını her locale için belirlemek.

### Faz 0B — Route ve SEO bütünlüğü

1. Beş Türkçe hub HTML dosyasını oluşturmak.
2. Navigation, dil değiştirici, breadcrumb ve iç bağlantıları eklemek.
3. Canonical/hreflang reciprocity, JSON-LD ve H1 kurallarını uygulamak.
4. Sitemap'e yalnızca indexlenebilir gerçek URL'leri almak; yardımcı sayfaları dışarıda tutmak.
5. Yerel bağlantı, schema, sitemap ve noindex testlerini çalıştırmak.

### Faz 1 — Mesaj ve dönüşüm

1. Hub sayfalarının üst bölümünde hedef kitleye uygun ana mesajı kullanmak.
2. Vaka kartlarını problem/stack/çıktı/bağlantı formatına standardize etmek.
3. Mobilde ana CTA'nın erken görünmesini doğrulamak.
4. Form başarı durumunu locale bazında doğrulamak.

### Faz 2 — GA4 ve Search Console

1. `language_select`, `project_view`, `project_cta_click`, `profile_click`, `contact_view`, `contact_start`, `contact_submit`, `contact_success`, `cv_download` olaylarını eklemek.
2. `locale`, `page_type`, `project_slug`, `cta_position` parametrelerini standardize etmek.
3. GA4 Realtime ile instrumentation doğrulamak.
4. Search Console'da en az 28 günlük, tercihen 56 günlük karşılaştırma dönemleriyle CTR fırsatlarını değerlendirmek.

### Faz 3 — İçerik dağıtımı

1. Her vaka için problem, mimari ve kanıt formatında içerik üretmek.
2. LinkedIn, GitHub ve ilgili ürün sitelerinde tek hedef URL kullanmak.
3. UTM ve locale kırılımını korumak.
4. Ölçülmemiş metrikleri başarı iddiası olarak yayımlamamak.

## 7. Kalite kapıları

### Statik ve kaynak doğrulaması

- `npm run verify`
- `npm run verify:syntax`
- `git diff --check`
- Tüm yerel referansların mevcut dosyaya ulaşması
- Tek H1, canonical, dört hreflang ve geçerli JSON-LD
- Sitemap ile indexlenebilir dosyaların birebir eşleşmesi

### Tarayıcı doğrulaması

- Üç locale arasında dil değişimi
- Mobil menü ve CTA akışı
- Hub → vaka → yetenek → iletişim akışı
- Form alan doğrulaması ve locale başarı durumu
- Console/network hatalarının kontrolü

### Canlı doğrulama

- Tüm sitemap route'ları `200`
- `/program.html`, `/schedule.html`, `/schedule-ru.html` için `noindex` ve `X-Robots-Tag`
- robots.txt ve sitemap erişimi
- GA4 Realtime olayları
- Formspree başarı gönderimi

Build, canlı workflow, deployment ve UAT ayrı sonuçlar olarak raporlanacaktır. Herhangi bir kalite kapısı başarısızsa deploy veya büyüme sonucu ilan edilmeyecektir.

## 8. Kapsam dışı

- URL migration
- Framework migration
- Doğrulanmamış trafik/CTR/dönüşüm hedefleri
- Freelance hizmet kataloğu yaklaşımı
- Kullanıcının mevcut çalışma dosyalarının silinmesi veya üzerine yazılması

## 9. Uygulama başlangıç koşulu ve gerçekleşen yürütme

Başlangıç koşulu gereği ilk değişiklik seti Faz 0A ve Faz 0B ile sınırlı tutuldu.
Bu set tamamlandıktan sonra Faz 1 ve Faz 2'nin güvenli, yerel doğrulanabilir
adımları yürütüldü. Dış yayın, canlı form gönderimi, deployment ve canlı GA4
doğrulaması hâlâ ayrı kalite kapılarıdır.

## 10. Faz 0A–0B uygulama durumu

- [x] `hakkinda.html` oluşturuldu.
- [x] `yetenekler.html` oluşturuldu.
- [x] `projeler.html` oluşturuldu.
- [x] `sertifikalar.html` oluşturuldu.
- [x] `iletisim.html` oluşturuldu.
- [x] Türkçe navigation, dil değiştirici ve iç bağlantı akışı eklendi.
- [x] Her yeni sayfaya locale metadata, self-canonical, dört hreflang, tek H1, breadcrumb ve JSON-LD eklendi.
- [x] Yeni Türkçe URL'lerin sitemap `lastmod` değerleri gerçek değişiklik tarihiyle güncellendi.
- [x] Gerçek `styles.css` ve `script.js` hash'leri tüm HTML asset referanslarıyla eşitlendi.
- [x] `npm run verify` başarılı.
- [x] Yerel tarayıcı kontrolünde beş route'un tamamı açıldı; her route'ta tek H1 ve breadcrumb doğrulandı.
- [x] İletişim formunun Formspree action'ı ve tarayıcı konsolu kontrol edildi.
- [ ] Canlı deployment, canlı route doğrulaması ve UAT henüz yapılmadı.

## 11. Faz 1–2 başlangıç ve yerel doğrulama durumu

- [x] Türkçe ana sayfa navigasyonu anchor hedeflerinden hub URL'lerine taşındı.
- [x] Ana CTA doğrudan `iletisim.html` sayfasına bağlandı.
- [x] Ana proje CTA'sı doğrudan `projeler.html` sayfasına bağlandı.
- [x] GA4 olay kuyruğu ve locale/proje bağlamı `script.js` içine eklendi.
- [x] `language_select`, `project_view`, `project_cta_click`, `profile_click`, `contact_view`, `contact_start`, `contact_submit` ve `contact_success` olayları bağlandı.
- [x] Üç iletişim formuna locale'e özgü Formspree `_next` başarı URL'si ve görünür başarı durumu eklendi.
- [x] Localhost başarı URL'sinde Türkçe başarı durumu tarayıcıda doğrulandı.
- [ ] GA4 Realtime ve Formspree canlı gönderim doğrulaması henüz yapılmadı.

## 12. Faz 3 pre-live hazırlık durumu

- [x] Beş vaka ailesi için problem, mimari ve kanıt içerik açıları tanımlandı.
- [x] Türkçe, İngilizce ve Rusça kanal/hedef URL eşlemesi hazırlandı.
- [x] UTM isimlendirme sözleşmesi ve locale/angle örnekleri hazırlandı.
- [x] LinkedIn içerik iskeletleri ve GitHub README vaka bölümü hazırlandı.
- [x] Yayın öncesi SEO, gizlilik, iddia ve ölçüm kontrol listesi hazırlandı.
- [x] Ayrıntılı kit docs/portfolio-distribution-kit.md dosyasına eklendi.
- [ ] LinkedIn, GitHub veya ilgili ürün sitesinde dış yayın yapılmadı.
- [ ] Canlı GA4 Realtime doğrulaması yapılmadı.
- [ ] Formspree canlı test gönderimi yapılmadı.
- [ ] Search Console 28/56 günlük performans değerlendirmesi yapılmadı.
- [ ] Deployment ve canlı UAT yapılmadı.

Bu aşamada güvenli yerel hazırlık tamamlanmış, dış sistemlerde geri döndürülemez
veya ölçüm sonuçlarını etkileyen adımlar bilinçli olarak bekletilmiştir.
