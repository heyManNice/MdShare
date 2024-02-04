/*返回md文件当中的图片*/
const path = require("path");
const scanner = require('../tool/scanner');
const fs = require("fs");

const public = {
    route:'/assets/:mdfile/:picname',
    method:'get',
    main:async function(req,res){
        let mdfile = req.params.mdfile;
        let picname = req.params.picname;
        if(!mdfile||!picname){
            res.status(403);
            return res.send({code:403});
        }
        if(!scanner.fileList[mdfile+".md"]){
            res.status(404);
            return res.send({code:404});
        }
        let picpath = path.join(__rootdir,"data",scanner.fileList[mdfile+".md"].class,"assets",mdfile,picname);
        if(!fs.existsSync(picpath)){
            res.status(404);
            return res.send({code:404});
        }
        return res.sendFile(picpath);
    }
};

module.exports = public;