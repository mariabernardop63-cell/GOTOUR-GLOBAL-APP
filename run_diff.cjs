const { execSync } = require('child_process');
const fs = require('fs');

try {
  const diff = execSync('git diff "c:\\Users\\MY PC\\OneDrive\\Desktop\\New folder\\src\\pages\\Welcome\\FeaturesSection\\FeaturesSection.jsx"', { encoding: 'utf-8' });
  fs.writeFileSync('c:\\Users\\MY PC\\OneDrive\\Desktop\\New folder\\diff.txt', diff);
  console.log('Diff written');
} catch (e) {
  console.log(`ERROR: ${e.message}`);
}
