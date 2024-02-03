
const path = require("path");

const public = {
    route:'/favicon.ico',
    method:'get',
    main:async function(req,res){
        return res.sendFile(path.join(__rootdir,"public","favicon.ico"));
    }
};

module.exports = public;