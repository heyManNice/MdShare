

const path = require("path");
const fs = require("fs");
const self = {

}

const public = {
    getFileExplan:function(filepath){
        if(!path.isAbsolute(filepath)){
            filepath = path.join(__rootdir,filepath);
        }
        let string = fs.readFileSync(filepath).toString();
        let result = string.match(/(?<=^\/\*)[\s\S]+?(?=\*\/)/);
        let explan = (result?result[0]:"无注释");
        return explan.replace('\n','');
    }
}

module.exports = public;