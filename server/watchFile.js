const path = require('path');
const chokidar = require('chokidar');

let timer;
chokidar.watch(path.join(main_dirname,"data")).on('all', (event, path) => {
  //print(event+":"+path);
  clearTimeout(timer);
  timer = setTimeout(scanner.scan,100);
});