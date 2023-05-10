//requiring path and fs modules
import path from 'path';
import fs from 'fs';
//joining path of directory
const directoryPath = path.join(__dirname, 'public/files');
//passsing directoryPath and callback function

export const getFile = filename => {
  console.log(filename, 'directroy');
  const filepath = 'public/files/' + filename;
  fs.readFile(filepath, function (err, file) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    console.log(file);
    return { file, filepath };
  });
};

export const fileImporter = async file => {
  const p = path.join(__dirname, '..', 'db', file);
  console.log(p);
  try {
    const data = await import(p);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const removeFile = async file => {
  const filepath = path.join(__dirname, '..', 'uploads/' + file);
  console.log(filepath);
  try {
    fs.unlinkSync(filepath);
  } catch (error) {
    console.log(error);
  }
};
