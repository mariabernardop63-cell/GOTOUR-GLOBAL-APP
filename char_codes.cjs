const fs = require('fs');

const code = fs.readFileSync('c:/Users/MY PC/OneDrive/Desktop/New folder/src/pages/Welcome/FeaturesSection/FeaturesSection.jsx', 'utf-8');
const lines = code.split('\n');

let output = [];

for (let i = 14; i < 30; i++) {
    const line = lines[i];
    if (!line) continue;
    let codes = [];
    for (let j = 0; j < line.length; j++) {
        codes.push(`${line[j]}(${line.charCodeAt(j)})`);
    }
    output.push(`${i + 1}: ${codes.join(' ')}`);
}

fs.writeFileSync('c:/Users/MY PC/OneDrive/Desktop/New folder/codes_error.txt', output.join('\n'));
console.log('Done');
