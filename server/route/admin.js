/*虚假的管理员登录页面*/
const path = require("path");

const public = {
    sweet:true,
    route:'/admin',
    method:'get',
    main:async function(req,res){
        return res.sendFile(path.join(__rootdir,"public","admin","admin_login.html"));
    }
};

module.exports = public;