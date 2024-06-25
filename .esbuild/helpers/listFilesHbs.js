import fs from "fs";
import path from "path";

export const listFilesHbs = (dir, filelist = []) => {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((file) => {
    const dirFile = path.join(dir, file.name);
    if (file.isDirectory()) {
      filelist = listFilesHbs(dirFile, filelist);
    } else if (file.name.endsWith(".hbs")) {
      filelist.push(dirFile);
    }
  });
  return filelist;
};

export const listFilesJS = (dir, filelist = []) => {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((file) => {
    const dirFile = path.join(dir, file.name);
    if (file.isDirectory()) {
      filelist = listFilesJS(dirFile, filelist);
    } else if (file.name.endsWith(".js")) {
      filelist.push(dirFile);
    }
  });
  return filelist;
};

export const listFilesCSS = (dir, filelist = []) => {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((file) => {
    const dirFile = path.join(dir, file.name);
    if (file.isDirectory()) {
      filelist = listFilesCSS(dirFile, filelist);
    } else if (file.name.endsWith(".css")) {
      filelist.push(dirFile);
    }
  });
  return filelist;
};


export default listFilesHbs;
