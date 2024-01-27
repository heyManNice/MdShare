const fs = require("fs");
const path = require('path');

const configChecker = {
    check:function(){
        if(!fs.existsSync(path.join(main_dirname,"build"))){
            console.log("\x1b[31m[错误]\x1b[0m 前端html文件未编译,请执行node build_html.js后再启动此文件");
            return process.exit(1);
        }
        if(!fs.existsSync(path.join(main_dirname,"config.js"))){
            console.log("\x1b[31m[错误]\x1b[0m 配置文件config.js文件不存在,请将config.js_example文件更名为config.js并填写相关配置后再启动此文件");
            return process.exit(1);
        }
    }
}
configChecker.check();