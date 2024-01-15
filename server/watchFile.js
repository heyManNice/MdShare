const path = require('path');
const chokidar = require('chokidar');
const fs = require("fs");

let timer;
chokidar.watch(path.join(main_dirname,"data")).on('all', (event, pathName) => {
  //print(event+":"+pathName);
  switch (event) {
    case "change":
      let filepath = path.join(main_dirname,"metadata",path.basename(pathName)+".json");
      scanner.setFileMeta(filepath,{mtime:new Date().getTime()});
      break;
    
    case "unlink":
      let filename = path.basename(pathName)+".json";
      fs.renameSync(path.join(main_dirname,"metadata",filename),path.join(main_dirname,"metaRecycle",filename));
      delete scanner.fileList[path.basename(pathName)];
      print("删除："+pathName);
      break;
      
    default:
      clearTimeout(timer);
      timer = setTimeout(scanner.scan,100);
      break;
  }
});