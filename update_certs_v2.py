import os

files = [
    '/Users/kagansmtdms/Downloads/Проекты/мойсайт/index.html',
    '/Users/kagansmtdms/Downloads/Проекты/мойсайт/certificates.html',
    '/Users/kagansmtdms/Downloads/Проекты/мойсайт/certificates-ru.html'
]

def add_image_wrapper(article_html):
    img = ""
    if 'Rusça B1' in article_html or 'Russian B1' in article_html or 'русском B1' in article_html or 'B1 Russian' in article_html or 'русским языком на уровне B1' in article_html:
        img = 'russianb1.jpeg'
    elif 'Temel Ofis Programları' in article_html or 'Office Programs' in article_html or 'Офисные программы' in article_html or 'офисных программ' in article_html or 'Excel' in article_html:
        img = 'temelofisprogramlari.jpeg'
    elif 'SQL Server' in article_html:
        img = 'sqlserver.jpeg'
    elif 'TODER' in article_html or 'FODER' in article_html:
        img = 'foder.jpeg'
    elif '23' in article_html and 'Finans' in article_html or 'Financial Literacy Certificate - 23' in article_html or 'Сертификат финансовой грамотности - 23' in article_html:
        img = 'finansalokuryazarlik23.jpeg'
    elif 'Kentsel Dönüşüm' in article_html or 'Urban Transformation' in article_html or 'городской трансформации' in article_html:
        img = 'kentseldonusum.jpeg'
    
    if img:
        img_html = f'''                <div class="certificate-image-wrapper">
                    <img src="{img}" alt="{img.split(".")[0]} sertifikası" class="certificate-image" loading="lazy" decoding="async">
                </div>
'''
        return article_html.replace('<article class="certificate-card">', '<article class="certificate-card">\n' + img_html)
    return article_html


for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    parts = content.split('<div class="certificates-container">')
    if len(parts) >= 3:
        p1_split = parts[1].split('</div>')
        first_container_articles = '</div>'.join(p1_split[:-1]).strip()
        
        # Determine the tag that closes the section, usually </section>
        # However, certificates.html has </main> at the end instead of </section>
        closing_tag = '</section>'
        if '</section>' not in parts[2]:
            closing_tag = '</main>'
        
        p2_split = parts[2].split(closing_tag)
        second_container_content = p2_split[0]
        second_container_articles = second_container_content.rsplit('</div>', 1)[0].strip()
        
        articles = second_container_articles.split('<article class="certificate-card">')
        new_articles = []
        for a in articles:
            if not a.strip(): continue
            a = '<article class="certificate-card">' + a
            if '1Ci' in a or 'Low-Code' in a:
                continue 
            a = add_image_wrapper(a)
            new_articles.append(a)
            
        combined_articles = first_container_articles + '\n\n' + '\n\n'.join(new_articles)
        
        new_content = parts[0] + '<div class="certificates-container">\n' + combined_articles + '\n            </div>\n        ' + closing_tag + closing_tag.join(p2_split[1:])
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Successfully processed {filepath}")
    else:
        print(f"Skipping {filepath}, <div class=\"certificates-container\"> not found twice.")
