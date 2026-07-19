import os

files = [
    '/Users/kagansmtdms/Downloads/Проекты/мойсайт/index.html',
    '/Users/kagansmtdms/Downloads/Проекты/мойсайт/certificates.html',
    '/Users/kagansmtdms/Downloads/Проекты/мойсайт/certificates-ru.html'
]

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the two containers
    # The first one is <div class="certificates-container">
    # The second one is <h3 class="section-title section-title--compact">...
    
    parts = content.split('            <h3 class="section-title section-title--compact">')
    if len(parts) < 2:
        return # already processed maybe
        
    part1 = parts[0]
    part2 = parts[1]
    
    # Extract the second container contents
    # It starts with the title, intro, and then <div class="certificates-container">
    
    container_split = part2.split('<div class="certificates-container">')
    if len(container_split) < 2:
        return
        
    # The inner content is container_split[1] up to the closing </div> of that container, then </section>
    inner_split = container_split[1].split('</section>')
    
    items_html = inner_split[0].strip() # This contains the articles and the closing </div>
    # remove the closing </div>
    items_html = items_html.rsplit('</div>', 1)[0]
    
    # Now we need to process items_html
    # Remove the 1Ci duplicate
    # Split by <article class="certificate-card">
    articles = items_html.split('<article class="certificate-card">')
    new_articles = []
    
    for art in articles:
        if not art.strip(): continue
        
        # Determine which one it is and add image
        image_html = ""
        if '1Ci' in art or 'Low-Code' in art:
            continue # skip duplicate
        elif 'Rusça B1' in art or 'Russian B1' in art or 'русском B1' in art or 'B1 Russian' in art or 'русским языком на уровне B1' in art:
            image_html = '''                <div class="certificate-image-wrapper">
                    <img src="russianb1.jpeg" alt="Rusça B1 sertifikası" class="certificate-image" loading="lazy" decoding="async">
                </div>
'''
        elif 'Temel Ofis Programları' in art or 'Office Programs' in art or 'Офисные программы' in art or 'офисных программ' in art or 'Excel' in art:
            image_html = '''                <div class="certificate-image-wrapper">
                    <img src="temelofisprogramlari.jpeg" alt="Ofis Programları sertifikası" class="certificate-image" loading="lazy" decoding="async">
                </div>
'''
        elif 'SQL Server' in art:
            image_html = '''                <div class="certificate-image-wrapper">
                    <img src="sqlserver.jpeg" alt="SQL Server sertifikası" class="certificate-image" loading="lazy" decoding="async">
                </div>
'''
        elif 'TODER' in art or 'FODER' in art:
            image_html = '''                <div class="certificate-image-wrapper">
                    <img src="foder.jpeg" alt="FODER sertifikası" class="certificate-image" loading="lazy" decoding="async">
                </div>
'''
        elif '23' in art and 'Finans' in art or 'Financial Literacy Certificate - 23' in art or 'Сертификат финансовой грамотности - 23' in art:
            image_html = '''                <div class="certificate-image-wrapper">
                    <img src="finansalokuryazarlik23.jpeg" alt="23 Finansal Okuryazarlık sertifikası" class="certificate-image" loading="lazy" decoding="async">
                </div>
'''
        elif 'Kentsel Dönüşüm' in art or 'Urban Transformation' in art or 'городской трансформации' in art:
            image_html = '''                <div class="certificate-image-wrapper">
                    <img src="kentseldonusum.jpeg" alt="Kentsel Dönüşüm Zirvesi" class="certificate-image" loading="lazy" decoding="async">
                </div>
'''
        else:
            image_html = ""

        # Reconstruct article
        new_art = '            <article class="certificate-card">\n' + image_html + art
        new_articles.append(new_art)
        
    # Now append new_articles to the FIRST container.
    # The first container ends with </div> just before the <h3... we split on.
    
    # We need to find the </div> of the first container.
    first_container = part1.rstrip()
    if first_container.endswith('</div>'):
        first_container = first_container[:-6] # remove the </div>
    
    combined_content = first_container + '\n' + "".join(new_articles) + '\n            </div>\n        </section>' + inner_split[1]
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(combined_content)

for fp in files:
    process_file(fp)
    print(f"Processed {fp}")
