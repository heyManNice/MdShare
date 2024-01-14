const path = require('path');
const fs = require("fs");

fs.watch(path.join(main_dirname,"data"),function(eventType, filename){
    print(eventType+":"+filename);
});