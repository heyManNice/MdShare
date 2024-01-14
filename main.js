const server = require('express')();
const path = require('path');
const rateLimit= require('express-rate-limit').rateLimit;

const port = 8081;


server.use(rateLimit({
	windowMs:60 * 1000,
	limit: 60,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
}))

server.get('/', function (req, res) {
   res.sendFile(path.join(__dirname,"public","index.html"));
})
 
server.listen(port, () => {
    console.log(`系统已运行在 ${port}`);
})