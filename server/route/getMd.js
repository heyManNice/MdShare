/*获取md文件数据的api
 */

const scanner = require('../tool/scanner');
const path = require("path");
const fs = require("fs");

const public = {
    route:'/api/md/:filename',
    method:'get',
    main:async function(req,res){
        if(!req.params.filename){
            res.status(400);
            return res.send({code:400});
        }
        if(!scanner.fileList[req.params.filename]){
            res.status(404);
            return res.send({code:404});
        }
        let filepath = path.join(__rootdir,"data",scanner.fileList[req.params.filename].class,req.params.filename);
        let content = fs.readFileSync(filepath);
        let metadata = scanner.getFileMeta(path.join(__rootdir,"metadata",req.params.filename+".json"));
        if(metadata.comment){
            delete metadata.comment;
        }
        return res.send({code:200,content:content.toString(),metadata:metadata});
    }
};

module.exports = public;