/*启动服务器 加载中间件 解析路由对象
*/

//日志打印功能
print = function(msg,type){
    let temp = new Date();
    let H = temp.getHours();
    let M = temp.getMinutes();
    let S = temp.getSeconds();
    let fmsg = `[${temp.getFullYear()}-${temp.getMonth()+1}-${temp.getDate()} ${H<10?"0"+H:H}:${M<10?"0"+M:M}:${S<10?"0"+S:S}] ${msg}`;
    switch(type){
        case 'err':
            console.error(fmsg);
            break;
        default:
            console.log(fmsg);
    }
}
//格式化时间功能
FnewDate=function (time) {
    function padZero(num) {
        return (num < 10 ? '0' : '') + num;
    }
    if (time) {
        var date = new Date(time);
    } else {
        var date = new Date();
    }
    var year = date.getFullYear(),
        month = padZero(date.getMonth() + 1),
        day = padZero(date.getDate()),
        hour = padZero(date.getHours()),
        min = padZero(date.getMinutes()),
        sec = padZero(date.getSeconds());
    var newTime =
        year + '-' +
        month + '-' +
        day + ' ' +
        hour + ':' +
        min + ':' +
        sec;
    return newTime;
}


const rateLimit= require('express-rate-limit').rateLimit;
const bodyParser = require('body-parser');
const config = require('../../config');
const fs = require("fs");
const path = require("path");
const utils = require('../tool/utils')


const self = {
    server:require('express')(),
    loadPulg:function(){
        self.server.use(rateLimit({windowMs:config.rateLimit.time * 60 * 1000, limit: config.rateLimit.limit, standardHeaders: 'draft-7', legacyHeaders: false,message: {code:429,msg:"请求次数过多，请稍后再试"}}));
        self.server.use(bodyParser.json());
        self.server.use(bodyParser.urlencoded({ extended: false }));
    },
    loadRoute:function(){
        let jsArr = self.getJsArr();
        let objArr = self.getObjArr(jsArr);
        console.log(`${'类型'.padEnd(3)} ${'路径'.padEnd(18)} ${'文件名'.padEnd(12)} 注释`);
        for(let i=0;i<objArr.length;i++){
            let obj = objArr[i];
            if(obj.sweet){
                if(!config.sweet.enable){
                    continue;
                }
            }
            console.log(`${obj.method.padEnd(5)} ${obj.route.padEnd(20)} ${obj.basename.padEnd(15)} ${utils.getFileExplan("./server/route/"+obj.basename)}`);
            self.server[obj.method](obj.route,obj.main);
        }
        console.log("".padEnd(40,"-"));
    },
    getJsArr:function(){
        let fileArr = fs.readdirSync(path.join(__rootdir,"server","route")); 
        let jsArr = [];
        for(let i=0;i<fileArr.length;i++){
            if(path.extname(fileArr[i]) == ".js"){
                jsArr.push(fileArr[i]);
            }
        }
        return jsArr
    },
    getObjArr:function(jsArr){
        let objArr = [];
        for(let i=0;i<jsArr.length;i++){
            let basename = jsArr[i];
            objArr[i] = require(path.join(__rootdir,"server","route",jsArr[i]));
            objArr[i].basename = basename;
        }
        return objArr;
    }
};

const public= {
    pid:1,
    main:function(agrc,agrv){
        self.loadPulg();
        self.loadRoute();
        self.server.listen(config.port, () => {
            print(`系统已运行在${config.port}`);
        })
    }
};
module.exports = public;