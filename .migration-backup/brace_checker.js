const fs = require('fs');

const code = fs.readFileSync('c:/Users/MY PC/OneDrive/Desktop/New folder/src/pages/Welcome/FeaturesSection/FeaturesSection.jsx', 'utf-8');
const lines = code.split('\n');

let depth = 0;
let inString = false;
let stringChar = '';

lines.forEach((line, index) => {
    let lineText = '';
    for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (inString) {
            if (c === stringChar && line[i-1] !== '\\\\') {
                inString = false;
            }
        } else {
            if (c === '"' || c === "'" || c === '`') {
                // Ignore JS strings
                inString = true;
                stringChar = c;
            } else if (c === '{') {
                depth++;
            } else if (c === '}') {
                depth--;
            }
        }
    }
    // Only print when depth reaches 0 or breaks
    if (index > 10 && depth <= 0) {
        console.log(`ALERT: Depth hit ${depth} on line ${index + 1}: ${line.trim()}`);
    }
});

console.log(`Final Depth at EOF: ${depth}`);
