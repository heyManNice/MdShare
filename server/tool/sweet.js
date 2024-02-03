const fs = require("fs");
const os = require('os');
const path = require('path');
const config = require('../../config');


const self = {
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
};

const public = {
    log:function(req,msg="无信息"){
        if(!config.sweet.log){
            return
        }
        let filepath = path.join(__rootdir,"log","sweet.log");
        let ip = self.ipv6ToV4(self.getClientIp(req));
        let data = `[${FnewDate(new Date())}] ${ip} ${msg} => ${req.method +" "+JSON.stringify(req.method=='GET'?req.query:req.body)} ${decodeURI(req.url)}`;
        let dir = path.join(__rootdir,"log");
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        fs.writeFileSync(filepath,data+os.EOL,{flag:"as"});
    },
    login_try:1,
    timer:undefined
}

module.exports = public;