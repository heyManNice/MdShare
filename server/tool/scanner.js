const fs = require("fs");
const path = require('path');

const public = {
    fileList:{},
    scan:function(){
        public.fileList={};
        let dirArr = fs.readdirSync(path.join(__rootdir,"data"));
        for(var i = 0;i<dirArr.length;i++){
            let fileArr = fs.readdirSync(path.join(__rootdir,"data",dirArr[i]));
            for(var j = 0;j < fileArr.length;j++){
                public.fileList[fileArr[j]] = {class:dirArr[i]};
            }
        }
        print("内存缓存："+JSON.stringify(public.fileList));
        public.flashMeta();
    },
    flashMeta:function(){
        for(var key in public.fileList){
            let filepath = path.join(__rootdir,"metadata",key+".json");
            if(fs.existsSync(filepath)){
                continue;
            }
            let metaJson = {ctime:new Date().getTime(),mtime:new Date().getTime(),class:public.fileList[key]["class"],look:0,like:0,comment:{}}
            fs.writeFileSync(filepath,JSON.stringify(metaJson),{flag:"wx"})
        }
    },
    setFileMeta:function(filepath,obj){
        if(!fs.existsSync(filepath) && Object.keys(obj).length != 0){
            return 1;
        }
        let jsonData = JSON.parse(fs.readFileSync(filepath));
        for(var key in obj){
            jsonData[key] = obj[key];
        }
        fs.writeFileSync(filepath,JSON.stringify(jsonData));
    },
    getFileMeta:function(filepath){
        if(!fs.existsSync(filepath)){
            return {code:1};
        }
        return JSON.parse(fs.readFileSync(filepath));
    }
}

module.exports = public;