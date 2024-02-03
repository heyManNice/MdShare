
const path = require("path");


const public = {
    route:'/',
    method:'get',
    main:async function(req,res){
        return res.sendFile(path.join(__rootdir,"build","index.html")); 
    }
};

module.exports = public;