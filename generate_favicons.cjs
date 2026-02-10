const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');

async function generateFavicons() {
    const sourcePath = path.resolve(__dirname, 'src/assets/images/favicon_source.png');
    const outputDir = path.resolve(__dirname, 'public');

    console.log(`Source: ${sourcePath}`);
    console.log(`Output: ${outputDir}`);

    if (!fs.existsSync(sourcePath)) {
        console.error('Source file not found!');
        process.exit(1);
    }

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    try {
        const image = await Jimp.read(sourcePath);
        console.log('Image loaded successfully');

        // Autocrop to remove excess whitespace and maximize logo size
        image.autocrop();
        console.log('Image autocropped to maximize size');

        const sizes = [
            { name: 'favicon-16x16.png', size: 16 },
            { name: 'favicon-32x32.png', size: 32 },
            { name: 'apple-touch-icon.png', size: 180 },
            { name: 'android-chrome-192x192.png', size: 192 },
            { name: 'android-chrome-512x512.png', size: 512 }
        ];

        for (const { name, size } of sizes) {
            const outPath = path.join(outputDir, name);
            const cloned = image.clone();
            await cloned.resize(size, size).writeAsync(outPath);
            console.log(`Generated ${name}`);
        }

        // For favicon.ico, we usually use a different tool or just copy the 32x32 png / convert it
        // Jimp doesn't support writing .ico directly easily without plugins.
        // However, modern browsers support PNG favicons.
        // But for completeness, let's try to write a 48x48 png and name it favicon.ico? 
        // No, that's not a real ICO.
        // But many servers serve it with correct mime type and browsers handle it.
        // Alternatively, we use the 32x32 png as favicon.ico (rename) but it's not a real ICO container.
        // Given constraints, I will generate a 32x32 PNG and name it favicon.ico. It works in most cases.
        // Or better, I can try to find if there is a way to write ICO.
        // But for now, let's stick to PNGs and rename one for legacy support if needed.
        // Or just leave favicon.ico as a copy of the 32x32 png.

        const icoPath = path.join(outputDir, 'favicon.ico');
        const icoImage = image.clone().resize(32, 32);
        await icoImage.writeAsync(icoPath); // This writes PNG content to .ico file. Most browsers accept this.
        console.log('Generated favicon.ico (PNG content)');

    } catch (error) {
        console.error('Error generating favicons:', error);
        process.exit(1);
    }
}

generateFavicons();
