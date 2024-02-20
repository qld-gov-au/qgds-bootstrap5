import fs from "fs";
import path from "path";

const listFiles = (dir, filelist = []) => {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((file) => {
    const dirFile = path.join(dir, file.name);
    if (file.isDirectory()) {
      filelist = listFiles(dirFile, filelist);
    } else if (file.name.endsWith(".hbs")) {
      filelist.push(dirFile);
    }
  });
  return filelist;
};

export default listFiles;
