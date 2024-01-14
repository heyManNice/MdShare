const fs = require("fs");
const path = require('path');


scanner = {
    fileList:{},
    scan:function(){
        scanner.fileList={};
        let dirArr = fs.readdirSync(path.join(main_dirname,"data"));
        for(var i = 0;i<dirArr.length;i++){
            let fileArr = fs.readdirSync(path.join(main_dirname,"data",dirArr[i]));
            for(var j = 0;j < fileArr.length;j++){
                scanner.fileList[fileArr[j]] = {class:dirArr[i]};
            }
        }
        print(JSON.stringify(scanner.fileList));
        scanner.flashMeta();
    },
    flashMeta:function(){
        let metadataArr = fs.readdirSync(path.join(main_dirname,"metadata"));
        for(var i = 0;i<metadataArr.length;i++){
            if(scanner.fileList[metadataArr[i].slice(0,-5)]){
                continue;
            }
            fs.unlinkSync(path.join(main_dirname,"metadata",metadataArr[i]));
        }
        for(var key in scanner.fileList){
            let filepath = path.join(main_dirname,"metadata",key+".json");
            print(filepath);
            if(fs.existsSync(filepath)){
                continue;
            }
            let metaJson = {date:new Date().getTime (),class:scanner.fileList[key]["class"],look:0,like:0,comment:{}}
            let fd = fs.openSync(filepath, "wx");
            fs.writeSync(fd, JSON.stringify(metaJson), 0, 'utf8');
            fs.closeSync(fd);
        }
    }
}
