const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2Q5ZDgyYjZkMDFjYTRiMTE5MGJjYzc1OWRkNTM0Njk1EgsSBxCHjonRyxkYAZIBIwoKcHJvamVjdF9pZBIVQhM1MzExMzM2Mzg2Mjc3OTE2NTMx&filename=&opi=96797242';
const dest = path.join(__dirname, 'stitch_about.html');

https.get(url, (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        fs.writeFileSync(dest, rawData);
        console.log('Downloaded stitch_about.html');
    });
}).on('error', (e) => {
    console.error(e);
});
