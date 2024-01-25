/*用于解决html页面中不同页面使用相同的元素该如何处理的问题
 *只用于对html文件的解析，将天马行空的自定义语法解析为浏览器可执行的html文件
 *解析的文件来自./public目录下的html文件，解析结果在./build中
 *使用到的js css等资源文件仍然在./public文件夹中，不需要转移到./build文件夹
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
        let dirPath = path.join(__dirname,"build");
        fs.existsSync(dirPath) || fs.mkdirSync(dirPath);
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
    getElementAll:function(str){
        let reg = /<.*build=.*>.*<\/.*>/g;
        return str.match(reg);
    },
    getDom:function(str){
        let reg = /(?<=<html>)[\s\S]*?(?=<\/html>)/g;
        htmlStr = str.match(reg)[0];
        
        let elements = build.getElementAll(htmlStr);
        let dom = {
            html:{}
        };
        for(let i=0;i<elements.length;i++){
            let element = elements[i];
            let tagName = element.match(/(?<=<)[\s\S]*?(?= )/)[0];
            let filePath = element.match(/(?<=build=")[\s\S]*?(?=")/)[0];
            let attribute = build.getAttribute(element);
            dom.html[tagName]={
                tagName:tagName,
                build:filePath,
                attribute:attribute
            }
        }
        return dom;
    },
    loopAnalysis:function(str){
        let cout=0;
        while(1){
            let buildList = build.getElementAll(str);
            if(!buildList){
                break;
            }
            let element = buildList[0];
            let tagName = element.match(/(?<=<)[\s\S]*?(?= )/)[0];
            let filePath = element.match(/(?<=build=")[\s\S]*?(?=")/)[0];
            let attribute = build.getAttribute(element);
            console.log(`第${++cout}次迭代解析${tagName}:${filePath}`);
            let content = build.read(path.join(__dirname,"public","html",filePath));
            let html = `<${tagName+" "+attribute}>${content}</${tagName}>`;
            str = str.replace(element,html);
        }
        return str;
    },
    getAttribute:function(element){
        let attribute = element.match(/(?<=^<.*? )[\s\S]*?(?=>)/)[0];
        return attribute.replace(/build=".*?"/,"");
    },
    makeFile:function(fileName){
        build.targetData = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">`;
        let text = build.read(path.join(__dirname,"public",fileName));
        eval(build.getScript(text));
        let dom = build.getDom(text);
        build.targetData+=`</head><body>`;
        for(let key in dom.html){
            let content = build.read(path.join(__dirname,"public",dom.html[key].build));
            content = build.loopAnalysis(content);
            let attribute = dom.html[key].attribute;
            build.targetData+=`<${key+" "+attribute}>${content}</${key}>\n`;
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