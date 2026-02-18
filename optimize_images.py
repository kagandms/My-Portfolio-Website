import os
from PIL import Image

def optimize_image(filename, max_width=800):
    try:
        if not os.path.exists(filename):
            print(f"File not found: {filename}")
            return False

        original_size = os.path.getsize(filename)
        img = Image.open(filename)
        
        # Calculate new dimensions
        ratio = max_width / float(img.size[0])
        new_height = int((float(img.size[1]) * float(ratio)))
        
        if img.size[0] > max_width:
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            
        new_filename = os.path.splitext(filename)[0] + ".webp"
        img.save(new_filename, "WEBP", quality=80)
        
        new_size = os.path.getsize(new_filename)
        savings = original_size - new_size
        print(f"Optimized {filename}: {original_size/1024:.2f}KB -> {new_size/1024:.2f}KB (Saved {savings/1024:.2f}KB)")
        return True
    except Exception as e:
        print(f"Error optimizing {filename}: {e}")
        return False

files_to_optimize = ["kapakfoto.png", "logo.png"]

for f in files_to_optimize:
    optimize_image(f)
