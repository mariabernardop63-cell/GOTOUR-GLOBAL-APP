import os
import sys
import subprocess

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

try:
    from PIL import Image
except ImportError:
    install('Pillow')
    from PIL import Image

def generate_favicons(source_path, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    img = Image.open(source_path)
    
    # Ensure it's RGBA
    if img.mode != 'RGBA':
        img = img.convert('RGBA')

    # Sizes to generate
    sizes = {
        "favicon-16x16.png": (16, 16),
        "favicon-32x32.png": (32, 32),
        "apple-touch-icon.png": (180, 180),
        "android-chrome-192x192.png": (192, 192),
        "android-chrome-512x512.png": (512, 512)
    }

    for filename, size in sizes.items():
        resized_img = img.resize(size, Image.Resampling.LANCZOS)
        resized_img.save(os.path.join(output_dir, filename))
        print(f"Generated {filename}")

    # Generate favicon.ico (multi-size)
    img.save(os.path.join(output_dir, "favicon.ico"), format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
    print("Generated favicon.ico")

source = r"c:\Users\MY PC\OneDrive\Desktop\New folder\src\assets\images\favicon_source.png"
output = r"c:\Users\MY PC\OneDrive\Desktop\New folder\public"

generate_favicons(source, output)
