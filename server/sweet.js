const fs = require("fs");
const os = require('os');
const path = require('path');

sweet = {
    log:function(req,msg="无信息"){
        if(!config.sweet.log){
            return
        }
        let filepath = path.join(main_dirname,"log","sweet.log");
        let ip = sweet.ipv6ToV4(sweet.getClientIp(req));
        let data = `[${FnewDate(new Date())}] ${ip} ${msg} => ${req.method +" "+JSON.stringify(req.method=='GET'?req.query:req.body)} ${decodeURI(req.url)}`;
        let dir = path.join(main_dirname,"log");
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        fs.writeFileSync(filepath,data+os.EOL,{flag:"as"});
    },
    getClientIp:function(req) {
        return req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress ||
        '';
    },
    ipv6ToV4:function(ip) {
        if(ip.split(',').length>0){
            ip = ip.split(',')[0]
        }
        ip = ip.substr(ip.lastIndexOf(':')+1,ip.length);
        return ip
    }
}