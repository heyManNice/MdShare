/*只用于对html文件的解析，讲天马行空的自定义语法解析为浏览器可执行的html文件
 *
 *
 * 
*/
const fs = require("fs");
const path = require('path');

const build = {
    targetData:"",
    use:function(json){
        json.title && build.addTitle(json);
        json.css && build.addCss(json);
        json.js && build.addJs(json);
    },
    addTitle:function(json){
        build.targetData+=`<title>${json.title}</title>`;
    },
    addJs:function(json){
        if(json.link){
            build.targetData+=`<script src="${json.js}"></script>`;
        }else{
            let filePath = path.join(__dirname,"public",json.js);
            build.targetData+=`<script type="text/javascript">${build.read(filePath)}</script>`;
        }
    },
    addCss:function(json){
        if(json.link){
            build.targetData+=`<link rel="stylesheet" type="text/css" href="${json.css}">`;
        }else{
            let filePath = path.join(__dirname,"public",json.css);
            build.targetData+=`<style>${build.read(filePath)}</style>`;
        }
    },
    read:function(filePath){
        if(!fs.existsSync(filePath)){
            throw new Error("找不到"+filePath);
        }
        return fs.readFileSync(filePath).toString();
    },
    write:function(fileName,data){
        let filepath = path.join(__dirname,"build",fileName);
        fs.writeFileSync(filepath,data);
    },
    getList:function(){
        let dirPath = path.join(__dirname,"public");
        if(!fs.existsSync(dirPath)){
            throw new Error("找不到 ./public文件夹");
        }
        let arr = fs.readdirSync(dirPath);
        let result = [];
        let reg = /\.html$/i;
        for(let i=0;i<arr.length;i++){
            reg.test(arr[i]) && result.push(arr[i]);
        }
        return result;
    },
    getScript:function(str){
        let reg = /(?<=<script build>)[\s\S]*?(?=<\/script>)/g;
        return reg.exec(str)[0];
    },
    getDom:function(str){
        let getElementAll=function(str){
            let reg = /<.*build=.*>.*<\/.*>/g;
            return str.match(reg);
        }

        let reg = /(?<=<html>)[\s\S]*?(?=<\/html>)/g;
        htmlStr = str.match(reg)[0];
        
        let elements = getElementAll(htmlStr);
        let dom = {
            html:{}
        };
        for(let i=0;i<elements.length;i++){
            let element = elements[i];
            let tagName = element.match(/(?<=<)[\s\S]*?(?= )/)[0];
            let filePath = element.match(/(?<=build=")[\s\S]*?(?=")/)[0];
            dom.html[tagName]={
                tagName:tagName,
                build:filePath
            }
        }
        return dom;
    },
    makeFile:function(fileName){
        build.targetData = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">`;
        let text = build.read(path.join(__dirname,"public",fileName))
        eval(build.getScript(text))
        let dom = build.getDom(text);
        build.targetData+=`</head><body>`;
        for(let key in dom.html){
            build.targetData+=`<${key}>${build.read(path.join(__dirname,"public",dom.html[key].build))}</${key}>\n`;
        }
        build.targetData+=`</body></html>`;
        build.write(fileName,build.targetData);
    }
}

let fileList = build.getList();
console.log("待解析的文件："+fileList);
for(let i=0;i<fileList.length;i++){
    console.log("正在解析"+fileList[i]);
    build.makeFile(fileList[i]);
}
console.log("解析完成");