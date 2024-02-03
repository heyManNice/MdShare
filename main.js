/*将main.js所在路径标记为根目录
 *全局变量__rootdir共给所有文件使用
 */
__rootdir = __dirname;

const fs = require("fs");
const path = require("path");
const utils = require('./server/tool/utils')

const self = {
    /*执行启动程序
     *获取./server/execute下的模块对象
     *并按照顺序执行对象脚本
     */
    start:function(){
        let exeArr = self.getExeArr();
        exeArr = self.sort(exeArr);
        self.logExe(exeArr);
        self.runExe(exeArr);
    },
    /*获取并载入./server/execute下的程序模块对象
    *无输入
    *返回execute下的对象
    */
    getExeArr:function(){
        let executeArr = fs.readdirSync(path.join(__rootdir,"server","execute"));
        for(let i=executeArr.length-1;i>-1;i--){
            if(path.extname(executeArr[i]) != ".js"){
                continue;
            }
            let basename = executeArr[i];
            executeArr[i]=require(path.join(__rootdir,"server","execute",executeArr[i]));
            executeArr[i].basename = basename.split('.')[0];
        }
        return executeArr;
    },
    /*已数组对象内的pid成员升序排序
     *输入需要排序的数组
     *返回排好序的数组
     */
    sort:function(arr){
        return arr.sort((a,b)=>{
            return a.pid-b.pid;
        });
    },
    /*按格式打印执行的脚本
     *传入存有对象的数组
     *打印出相应格式数据
     */
    logExe:function(executeArr){
        console.log("".padEnd(40,"-"));
        console.log(`${'pid'.padEnd(5)} ${'执行脚本'.padEnd(11)} 注释`);
        for(let i=0;i<executeArr.length;i++){
            let execute = executeArr[i];
            console.log(` ${execute.pid.toString().padEnd(4)} ${execute.basename.padEnd(15)} ${utils.getFileExplan("./server/execute/"+execute.basename+".js")}`);
        }
        console.log("".padEnd(40,"-"));
    },
    /*按顺序执行程序
     *传入程序对象数组
     */
    runExe:function(executeArr){
        for(let i=0;i<executeArr.length;i++){
            let execute = executeArr[i];
            execute.main && execute.main();
        }
    }
};

self.start();