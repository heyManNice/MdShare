const path = require('path');
const fs = require("fs");

pageRoute = {
    index:async function(req, res){
        return res.sendFile(path.join(main_dirname,"public","index.html"));
    },
    img:async function(req, res){
        let filepath = path.join(main_dirname,"public","img",req.params.filename);
        if(!fs.existsSync(filepath)){
            res.status(404);
            return res.send({code:404});
        }
        return res.sendFile(filepath);
    }
}