const fs = require('fs');
const path = require('path');

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
        // List of files expected by index.html and other manifests
        const filesToGenerate = [
            'favicon-16x16.png',
            'favicon-32x32.png',
            'apple-touch-icon.png',
            'android-chrome-192x192.png',
            'android-chrome-512x512.png',
            'favicon.ico' // We'll just copy the png as ico for now to satisfy the build
        ];

        for (const file of filesToGenerate) {
            const destPath = path.join(outputDir, file);
            fs.copyFileSync(sourcePath, destPath);
            console.log(`Generated ${file} (copy)`);
        }

        console.log('Favicons generated successfully (fallback copy mode).');

    } catch (error) {
        console.error('Error generating favicons:', error);
        process.exit(1);
    }
}

generateFavicons();
