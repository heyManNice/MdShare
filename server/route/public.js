

const path = require("path");
const fs = require("fs");

const public = {
    route:'/:type/:filename',
    method:'get',
    main:async function(req,res){
        let types = ["img","css","js","webfonts"];
        if(types.indexOf(req.params.type)===-1 || !req.params.filename){
            res.status(403);
            return res.send({code:403});
        }
        let filepath = path.join(__rootdir,"public",req.params.type,req.params.filename);
        if(!fs.existsSync(filepath)){
            res.status(404);
            return res.send({code:404});
        }
        return res.sendFile(filepath); 
    }
};

module.exports = public;