import axios from 'axios';
const fs = require('fs');
import path from 'path';
export const fetchData = async (url, dest) => {
  const { data } = await axios.get(url, { responseType: 'stream' });
  console.log('saving to file...');
  const p = path.join(__dirname, '..', 'db', dest);
  console.log(p);
  const str = fs.createWriteStream(dest);
  data.pipe(str);
  str.on('finish', () => {
    fs.rename('./' + dest, p, err => {
      console.log(err);
    });
  });
  return;
};
