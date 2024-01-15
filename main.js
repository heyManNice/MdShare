//加载基础初始化服务
require('./server/init.js');
main_dirname = __dirname;

const server = require('express')();
const rateLimit= require('express-rate-limit').rateLimit;
const bodyParser = require('body-parser');
const port = 8081;

//访问限制
server.use(rateLimit({windowMs:60 * 1000, limit: 60, standardHeaders: 'draft-7', legacyHeaders: false,}));

server.use(bodyParser.json());

//加载服务组件
loadServer('pageRoute');
loadServer('watchFile');
loadServer('scanner');

//路由
server.get('/', pageRoute.index )
server.get('/test', pageRoute.test )
server.get('/reader', pageRoute.reader )
server.get('/:type/:filename', pageRoute.public )

server.post('/api/getMd', pageRoute.getMd )

server.listen(port, () => {
    print(`系统已运行在 ${port}`);
})