const fs = require('fs');

try {
  const diff = fs.readFileSync('c:/Users/MY PC/OneDrive/Desktop/New folder/diff.txt', 'utf-8');
  const lines = diff.split('\n');
  lines.forEach(line => {
    if (line.startsWith('+') || line.startsWith('-')) {
      console.log(line);
    }
  });
} catch (e) {
  console.log(`ERROR: ${e.message}`);
}
