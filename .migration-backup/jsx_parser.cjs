const fs = require('fs');
const parser = require('@babel/parser');

const code = fs.readFileSync('c:/Users/MY PC/OneDrive/Desktop/New folder/src/pages/Welcome/FeaturesSection/FeaturesSection.jsx', 'utf-8');

let outputText = 'Valid JSX';

try {
  parser.parse(code, {
    sourceType: "module",
    plugins: ["jsx"]
  });
} catch (e) {
  outputText = `BABEL_ERROR: ${e.message} at line ${e.loc ? e.loc.line : 'unknown'}, column ${e.loc ? e.loc.column : 'unknown'}`;
}

fs.writeFileSync('c:/Users/MY PC/OneDrive/Desktop/New folder/jsx_error.txt', outputText);
console.log('Done');
