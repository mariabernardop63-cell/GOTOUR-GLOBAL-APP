import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ5Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpYCiVodG1sXzIyOWJhNTE2NmYzYzQyYjBhYjljMzcwOGZjZGYyMGE2EgsSBxCKiNLIhxMYAZIBIQoKcHJvamVjdF9pZBITQhE0NjE0MzQzODUyMjA4OTM2NQ&filename=&opi=89354086';
const dest = path.join(__dirname, 'immersive_about.html');

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
      }

      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

download(url, dest)
  .then(() => console.log('Successfully downloaded immersive_about.html'))
  .catch((err) => console.error('Error downloading:', err.message));
