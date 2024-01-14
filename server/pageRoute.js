 const path = require('path');

pageRoute = {
    index:async function(req, res){
        res.sendFile(path.join(main_dirname,"public","index.html"));
    }
}