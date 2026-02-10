import os
import sys
from PIL import Image

def generate_favicons(source_path, output_dir):
    print(f"Starting generation from {source_path} to {output_dir}")
    if not os.path.exists(source_path):
        print(f"Error: Source file not found at {source_path}")
        return

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        print(f"Created output directory {output_dir}")

    try:
        img = Image.open(source_path)
        print(f"Opened image: {img.format}, {img.size}, {img.mode}")
        
        # Ensure it's RGBA
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
            print("Converted to RGBA")

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
            out_path = os.path.join(output_dir, filename)
            resized_img.save(out_path)
            print(f"Generated {out_path}")

        # Generate favicon.ico (multi-size)
        ico_path = os.path.join(output_dir, "favicon.ico")
        img.save(ico_path, format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
        print(f"Generated {ico_path}")
        
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    source = r"c:\Users\MY PC\OneDrive\Desktop\New folder\src\assets\images\favicon_source.png"
    output = r"c:\Users\MY PC\OneDrive\Desktop\New folder\public"
    generate_favicons(source, output)
