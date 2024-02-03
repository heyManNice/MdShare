/*返回latex需要的字体
 */

const path = require("path");
const fs = require("fs");

const public = {
    route:'/css/fonts/:font',
    method:'get',
    main:async function(req,res){
        if(!req.params.font){
            res.status(403);
            return res.send({code:403});
        }
        let filepath = path.join(__rootdir,"public","webfonts",req.params.font);
        if(!fs.existsSync(filepath)){
            res.status(404);
            return res.send({code:404});
        }
        return res.sendFile(filepath);
    }
};

module.exports = public;