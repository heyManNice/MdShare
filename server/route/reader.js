/*返回编译好的reader.html阅读器页面
 */

const config = require('../../config');
const sql = require('../tool/sql')
const path = require("path");

const public = {
    route:'/reader',
    method:'get',
    main:async function(req,res){
        if(config.sweet.enable){
            if(sql.isDanger(req.query)){
                sweet.log(req,"在阅读器页面SQL注入");
                return res.send(config.sweet.response);
            }
        }
        return res.sendFile(path.join(__rootdir,"build","reader.html"));
    }
};

module.exports = public;