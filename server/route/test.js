/*访问此处返回测试的数据
 */

const scanner = require('../tool/scanner')

const public = {
    route:'/test',
    method:'get',
    main:async function(req,res){
        return res.send(scanner.fileList);
    }
};

module.exports = public;