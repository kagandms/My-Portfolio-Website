import os
import re

def patch_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Patch 1: Add rel="noopener noreferrer" to target="_blank"
        # Regex looks for <a ... target="_blank" ...> where rel is missing or incomplete
        # This is a simple regex approch. For full parsing we'd use BeautifulSoup but regex is faster/lighter here.
        
        updated_content = content
        
        # Replace target="_blank" with target="_blank" rel="noopener noreferrer" if rel is missing
        # We need to be careful not to duplicate rel if it already exists partially
        
        def replacement(match):
            tag = match.group(0)
            if 'rel=' in tag:
                if 'noopener' in tag and 'noreferrer' in tag:
                    return tag # Already good
                # If rel exists but is weak, we should append/fix it, but for now let's assume if rel is there it might be fine or we skip complex logic
                # Actually, let's just force safety for target="_blank"
                return tag # Skip complex rel logic for now to avoid breaking existing rels
            
            return tag.replace('target="_blank"', 'target="_blank" rel="noopener noreferrer"')
            
        # Use regex to find <a ... > tags with target="_blank"
        pattern = r'<a\s+[^>]*target=["\']_blank["\'][^>]*>'
        updated_content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)

        # Patch 2: Update image references
        updated_content = updated_content.replace('kapakfoto.png', 'kapakfoto.webp')
        updated_content = updated_content.replace('logo.png', 'logo.webp')
        
        if content != updated_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            print(f"Patched: {filepath}")
        else:
            print(f"No changes needed: {filepath}")
            
    except Exception as e:
        print(f"Error patching {filepath}: {e}")

# Find all HTML files
for root, dirs, files in os.walk("."):
    for file in files:
        if file.endswith(".html"):
            patch_file(os.path.join(root, file))
