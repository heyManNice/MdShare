//加载基础初始化服务
main_dirname = __dirname;
require('./server/init.js');
require('./server/configChecker.js');
require('./config.js');

const server = require('express')();
const rateLimit= require('express-rate-limit').rateLimit;
const bodyParser = require('body-parser');

//访问限制
server.use(rateLimit({windowMs:config.rateLimit.time * 60 * 1000, limit: config.rateLimit.limit, standardHeaders: 'draft-7', legacyHeaders: false,message: {code:429,msg:"请求次数过多，请稍后再试"}}));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

//加载服务组件
loadServer('pageRoute');
loadServer('watchFile');
loadServer('scanner');
loadServer('sql');
loadServer('sweet');

//路由
server.get('/', pageRoute.index );
server.get('/favicon.ico', pageRoute.favicon);
server.get('/test', pageRoute.test );
server.get('/reader', pageRoute.reader );
server.get('/:type/:filename', pageRoute.public );

//api
server.get('/api/md/:filename', pageRoute.getMd );

//为latex字体的独立路由
server.get('/js/output/chtml/fonts/woff-v2/:font', pageRoute.latex.font );

//为攻击者开发的路由
if(config.sweet.enable){
    server.get('/admin', pageRoute.admin );
    server.post('/admin', pageRoute.admin_post );
}

server.listen(config.port, () => {
    print(`系统已运行在${config.port}`);
})