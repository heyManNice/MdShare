const path = require('path');
const fs = require("fs");

pageRoute = {
    //主页文件
    index:async function(req, res){
        return res.sendFile(path.join(main_dirname,"public","index.html"));
    },
    //public文件
    public:async function(req, res){
        let types = ["img","css","js","webfonts"];
        if(types.indexOf(req.params.type)===-1 || !req.params.filename){
            res.status(403);
            return res.send({code:403});
        }
        let filepath = path.join(main_dirname,"public",req.params.type,req.params.filename);
        if(!fs.existsSync(filepath)){
            res.status(404);
            return res.send({code:404});
        }
        return res.sendFile(filepath);
    },
    //测试路径
    test:async function(req,res){
        return res.send(scanner.fileList);
    },
    //阅读页面文件
    reader:async function(req,res){
        if(config.sweet.enable){
            if(sql.isDanger(req.query)){
                sweet.log(req,"在阅读器页面SQL注入");
                return res.send(config.sweet.response);
            }
        }
        return res.sendFile(path.join(main_dirname,"public","reader.html"));
    },
    //获取md文件api
    getMd:async function(req,res){
        if(!req.body.filename){
            res.status(400);
            return res.send({code:400});
        }
        if(!scanner.fileList[req.body.filename]){
            res.status(404);
            return res.send({code:404});
        }
        let filepath = path.join(main_dirname,"data",scanner.fileList[req.body.filename].class,req.body.filename);
        let content = fs.readFileSync(filepath);
        let metadata = scanner.getFileMeta(path.join(main_dirname,"metadata",req.body.filename+".json"));
        if(metadata.comment){
            delete metadata.comment;
        }
        return res.send({code:200,content:content.toString(),metadata:metadata});
    },
    //为攻击者准备的后台管理页面
    admin:async function(req,res){
        return res.sendFile(path.join(main_dirname,"public","admin","admin_login.html"));
    },
    admin_post:async function(req,res){
        if(req.body.account!="admin" || req.body.password!="12345"){
            if(sweet.timer){
                clearTimeout(sweet.timer);
            }
            sweet.timer=setTimeout(()=>{
                sweet.log(req,sweet.login_try+"次尝试登陆并且失败");
            },10000);
            sweet.login_try++;
            return res.sendFile(path.join(main_dirname,"public","admin","admin_fail.html"));
        }
        if(sweet.timer){
            clearTimeout(sweet.timer);
        }
        sweet.log(req,sweet.login_try+"次尝试登陆并且成功");
        let text = `经过${sweet.login_try}次尝试，你攻破了本站的弱密码！<script>window.history.replaceState(null, null, window.location.href);</script>`;
        sweet.login_try = 1;
        return res.send(`恭喜你！经过${sweet.login_try}次尝试，攻破了本站的管理员弱密码`+config.sweet.response);
    }
}