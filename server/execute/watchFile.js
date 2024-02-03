/*监视./data中的文件是否被修改*/

const path = require('path');
const chokidar = require('chokidar');
const fs = require("fs");
const scanner = require('../tool/scanner')

const self = {
  timer:undefined,
  watch:function(){
    chokidar.watch(path.join(__rootdir,"data")).on('all', (event, pathName) => {
      //print(event+":"+pathName);
      switch (event) {
        case "change":
          let filepath = path.join(__rootdir,"metadata",path.basename(pathName)+".json");
          scanner.setFileMeta(filepath,{mtime:new Date().getTime()});
          break;
        
        case "unlink":
          let filename = path.basename(pathName)+".json";
          fs.renameSync(path.join(__rootdir,"metadata",filename),path.join(__rootdir,"metaRecycle",filename));
          delete scanner.fileList[path.basename(pathName)];
          print("删除："+pathName);
          break;
          
        default:
          clearTimeout(self.timer);
          self.timer = setTimeout(scanner.scan,100);
          break;
      }
    });
  }
};

const public= {
  pid:2,
  main:function(agrc,agrv){
      self.watch();
  }
};
module.exports = public;