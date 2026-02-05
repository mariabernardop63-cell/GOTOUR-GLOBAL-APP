import sys
import subprocess

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

try:
    from PIL import Image
except ImportError:
    install('Pillow')
    from PIL import Image

def convert_to_transparent(input_path, output_path):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # If pixel is white (or close to white), make it transparent
        if item[0] > 200 and item[1] > 200 and item[2] > 200:
            newData.append((255, 255, 255, 0))
        else:
            # Keep original color (should be black)
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Successfully converted {input_path} to {output_path}")

convert_to_transparent(
    r"c:\Users\MY PC\OneDrive\Desktop\New folder\src\assets\images\feed_icon_ref.jpg",
    r"c:\Users\MY PC\OneDrive\Desktop\New folder\src\assets\images\feed_icon_transparent.png"
)
