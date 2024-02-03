/*虚假的管理员登录页面*/

const config = require('../../config');
const sweet = require('../tool/sweet');
const path = require("path");

const public = {
    sweet:true,
    route:'/admin',
    method:'post',
    main:async function(req,res){
        if(req.body.account!=config.sweet.account || req.body.password!=config.sweet.password){
            if(config.sweet.log){
                clearTimeout(sweet.timer);
                let log_text = `第${sweet.login_try}次尝试登陆并且失败`
                sweet.timer=setTimeout(()=>{
                    sweet.log(req,log_text);
                },10000);
            }
            sweet.login_try++;
            return res.sendFile(path.join(__rootdir,"public","admin","admin_fail.html"));
        }
        if(config.sweet.log){
            clearTimeout(sweet.timer);
            sweet.log(req,`第${sweet.login_try}次尝试登陆并且成功`);
        }
        let text = `恭喜你！经过${sweet.login_try}次尝试，攻破了本站的管理员弱密码`+config.sweet.response;
        sweet.login_try = 1;
        return res.send(text);
    }
};

module.exports = public;