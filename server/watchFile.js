const path = require('path');
const chokidar = require('chokidar');

chokidar.watch(path.join(main_dirname,"data")).on('all', (event, path) => {
  print(event+":"+path);
});