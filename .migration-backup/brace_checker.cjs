const fs = require('fs');

const code = fs.readFileSync('c:/Users/MY PC/OneDrive/Desktop/New folder/src/pages/Welcome/FeaturesSection/FeaturesSection.jsx', 'utf-8');
const lines = code.split('\n');

let depth = 0;
let inString = false;
let stringChar = '';
let output = [];

lines.forEach((line, index) => {
    for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (inString) {
            if (c === stringChar && line[i-1] !== '\\\\') {
                inString = false;
            }
        } else {
            if (c === '"' || c === "'" || c === '`') {
                inString = true;
                stringChar = c;
            } else if (c === '(') {
                depth++;
            } else if (c === ')') {
                depth--;
            }
        }
    }
    if (index > 4) {
        output.push(`P_LINE: ${index + 1}: Depth: ${depth} | ${line.trim()}`);
    }
});

output.push(`Final Parenthesis Depth: ${depth}`);
fs.writeFileSync('c:/Users/MY PC/OneDrive/Desktop/New folder/paren_cjs.txt', output.join('\n'));
console.log('Done');
