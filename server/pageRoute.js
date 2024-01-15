const path = require('path');
const fs = require("fs");

pageRoute = {
    index:async function(req, res){
        return res.sendFile(path.join(main_dirname,"public","index.html"));
    },
    public:async function(req, res){
        let types = ["img","css","js"];
        if(types.indexOf(req.params.type)===-1 || !req.params.filename){
            return res.send({code:403});
        }
        let filepath = path.join(main_dirname,"public",req.params.type,req.params.filename);
        if(!fs.existsSync(filepath)){
            res.status(404);
            return res.send({code:404});
        }
        return res.sendFile(filepath);
    },
    test:async function(req,res){
        return res.send(scanner.fileList);
    },
    reader:async function(req,res){
        return res.sendFile(path.join(main_dirname,"public","reader.html"));
    }
}