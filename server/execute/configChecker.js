/*启动程序时检查配置是否可用
 */

const fs = require("fs");
const path = require('path');


const self = {
    existDir:function(dir){
        return fs.existsSync(path.join(__rootdir,dir));
    },
    err:function(msg){
        console.log("\x1b[31m[错误]\x1b[0m "+msg);
        return process.exit(1);
    },
    check:function(){
        self.existDir("build") || self.err("前端html文件未编译,请执行node build_html.js后再启动此文件");
        self.existDir("config.js") || self.err("配置文件config.js文件不存在,请将config.js_example文件更名为config.js并填写相关配置后再启动此文件");
    }
};

const public= {
    pid:0,
    main:function(agrc,agrv){
       self.check();
    }
};
module.exports = public;