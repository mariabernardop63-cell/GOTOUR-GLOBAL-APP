const fs = require('fs');

const code = fs.readFileSync('c:/Users/MY PC/OneDrive/Desktop/New folder/src/pages/Welcome/FeaturesSection/FeaturesSection.jsx', 'utf-8');
const lines = code.split('\n');

let tagStack = [];
let output = [];

lines.forEach((line, index) => {
    const openMatches = line.match(/<([A-Za-z0-9\.-]+)(\s|>)/g);
    const closeMatches = line.match(/<\/([A-Za-z0-9\.-]+)>/g);

    if (openMatches) {
        openMatches.forEach(tag => {
            const tagName = tag.replace('<', '').replace('>', '').trim().split(' ')[0];
            if (!line.includes(`</${tagName}>`) && !line.includes('/>') && !['img', 'br', 'input', 'hr', 'svg', 'path'].includes(tagName.toLowerCase())) {
                tagStack.push({ tag: tagName, line: index + 1 });
            }
        });
    }

    if (closeMatches) {
        closeMatches.forEach(tag => {
            const tagName = tag.replace('</', '').replace('>', '').trim();
            if (tagStack.length > 0 && tagStack[tagStack.length - 1].tag === tagName) {
                tagStack.pop();
            } else {
                output.push(`MISMATCH: Found </${tagName}> at line ${index + 1} with no matching open tag`);
            }
        });
    }
});

if (tagStack.length > 0) {
    output.push(`UNCLOSED TAGS DETECTED:`);
    tagStack.forEach(t => output.push(`- <${t.tag}> opened on line ${t.line}`));
} else {
    output.push(`No unclosed tags detected`);
}

fs.writeFileSync('c:/Users/MY PC/OneDrive/Desktop/New folder/tags_error.txt', output.join('\n'));
console.log('Done');
