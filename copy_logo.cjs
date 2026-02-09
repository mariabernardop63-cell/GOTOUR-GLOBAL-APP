const fs = require('fs');
const path = require('path');

const source = String.raw`C:\Users\MY PC\.gemini\antigravity\brain\96a59a68-417e-4440-86b6-554a0703d7ff\uploaded_media_1770491496976.png`;
const destDir = String.raw`c:\Users\MY PC\OneDrive\Desktop\New folder\src\assets\images`;
const filesToReplace = ['gotour_icon.png', 'logo_gotour_new.png', 'gotour_logo_white.png'];

console.log('Starting copy process...');
console.log(`Source: ${source}`);

if (!fs.existsSync(source)) {
    console.error('ERROR: Source file does not exist!');
    process.exit(1);
}

const stats = fs.statSync(source);
console.log(`Source size: ${stats.size} bytes`);

filesToReplace.forEach(file => {
    const destPath = path.join(destDir, file);
    try {
        if (fs.existsSync(destPath)) {
            console.log(`Deleting existing ${file}...`);
            fs.unlinkSync(destPath);
        }
        console.log(`Copying to ${destPath}...`);
        fs.copyFileSync(source, destPath);
        const newStats = fs.statSync(destPath);
        console.log(`Success! New size of ${file}: ${newStats.size} bytes`);
    } catch (err) {
        console.error(`ERROR copying to ${file}:`, err);
    }
});
