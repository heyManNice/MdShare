sleep = function(ms){
    return new Promise(( resolve, reject ) => {
        setTimeout(function(){
            resolve(ms);
        },ms)
    });
}
memory = {
    pwd:['root']
};
{let self = window.linux = {
    etc:{
        profile:`/bin`,
        apt:{
            "sources.list":"https://heymannice.github.io/staticAssets/MdShare/apt_src.js"
        }
    },
    root:{
        test:{

        },
        "readme.md":"test"
    },
    usr:{
        include:{
            stdio:{
                printf:function(string,...format){
                    document.querySelector("#cmd_div").innerHTML+=`<p>${string}</p>`;
                }
            },
            stdlib:{
                _pgmptr:function(){
                    let dir = self;
                    for(let i=0;i<memory.pwd.length;i++){
                        dir = dir[memory.pwd[i]]
                    }
                    return dir;
                }
            }
        }
    },
    bin:{
        bash:function(args){
            let stdio = self.usr.include.stdio;
            if(window.memory==undefined||window.memory.bin==undefined){
                if(!window.memory){
                    window.memory = {};
                }
                window.memory.bin={};
                let envList = self.etc.profile.split('\n');
                for(let i=0;i<envList.length;i++){
                    let pathArr = envList[i].split("/");
                    pathArr.shift();
                    let binDir = self;
                    for(let i=0;i<pathArr.length;i++){
                        binDir=binDir[pathArr[i]];
                    }
                    for(let key in binDir){
                        if(typeof binDir[key] == 'function'){
                            window.memory.bin[key] = binDir[key];
                        }
                    }
                }
            }
            if(!args){
                return "";
            }
            let cmd = args.split(" ");
            document.querySelector("#cmd_div").innerHTML+=`<p><span style="color: #0DAE0D;">root@debian:/${memory.pwd.join("/")} #</span> ${args}</p>`;
            if(memory.bin[cmd[0]]){
                memory.bin[cmd[0]](cmd);
            }else{
                stdio.printf(`-bash: ${cmd[0]}: command not found`);
            }
            document.querySelector("#input_cmd input").value = "";
            window.scrollTo(0, document.body.scrollHeight);
            
        },
        ls:function(argv){
            let stdio = self.usr.include.stdio;
            let stdlib = self.usr.include.stdlib;
            let dir = stdlib._pgmptr();
            let result = "";
            for(let key in dir){
                switch (typeof dir[key]) {
                    case 'object':
                        result+=`<span style="color:#3B78CA;">${key} &nbsp;</span>`;
                        break;
                    case 'function':
                        result+=`<span style="color:#3de057;">${key} &nbsp;</span>`; 
                        break;
                    default:
                        result+=`${key} &nbsp;`;
                        break;
                }
            }
            stdio.printf(result);
            return 0;
        },
        cd:function(argv){
            let stdio = self.usr.include.stdio;
            let path = argv[1];
            let pathArr = path.split("/");
            for(let i=0;i<pathArr.length;i++){
                if(pathArr[i]==""&&i){
                    break
                }
                switch (pathArr[i]) {
                    case "":
                        memory.pwd = [];
                        break;
                    case ".":
                        break;
                    case "..":
                        memory.pwd.pop();
                        break;
                    default:
                        let stdlib = self.usr.include.stdlib;
                        let dir = stdlib._pgmptr();
                        let target = dir[pathArr[i]];
                        if(!target){
                            stdio.printf(`-cd: no such file or directory: ${path}`);
                            base.updataPwd();
                            return;
                        }
                        if(typeof target != 'object'){
                            stdio.printf(`-cd: not a directory: ${path}`);
                            base.updataPwd();
                            return;
                        }
                        memory.pwd.push(pathArr[i]);
                        break;
                }
            }
            base.updataPwd();
        },
        cat:function(argv){
            let file = argv[1];
            let stdlib = self.usr.include.stdlib;
            let stdio = self.usr.include.stdio;
            let dir = stdlib._pgmptr();
            if(!dir[file]){
                return stdio.printf(`-cat: ${file}: no such file or directory`);
            }
            if(typeof dir[file] == 'object'){
                return stdio.printf(`-cat: ${file}: Is a directory`);
            }
            self.usr.include.stdio.printf(dir[file]);
        },
        flash:function(){
            self.usr.include.stdio.printf("正在刷新...");
            location.reload();
        },
        apt:async function(argv){
            let inputEm = document.querySelector("#input_cmd");
            inputEm.style.display = "none";
            let stdio = self.usr.include.stdio;
            let command = argv[1];
            switch (command) {
                case "install":
                    if(!window.memory.apt_src){
                        stdio.printf(`Reading package lists... <span style="color:#E74856">Error</span>`);
                        return stdio.printf(`Try apt update to get the package lists`);
                    }
                    stdio.printf(`Reading package lists... Done`);
                    await sleep(400);
                    packages = argv.slice(2);
                    stdio.printf(`Building dependency tree... Done`);
                    await sleep(200);
                    stdio.printf(`Reading state information... Done`);
                    for(let i=0;i<packages.length;i++){
                        if(!memory.apt_src[packages[i]]){
                            stdio.printf(`<span style="color:#E74856">E: </span>Unable to locate package ${packages[i]}`);
                        }
                    }
                    break;
                case "update":
                    if(document.querySelector("#apt_src_js")){
                        stdio.printf("ok");
                        return;
                    }
                    let js = document.createElement("script");
                    js.setAttribute("id","apt_src_js");
                    js.src = self.etc.apt["sources.list"];
                    document.querySelector("head").appendChild(js);
                    break;
                default:
                    break;
            }
            await sleep(1000);
            inputEm.style.display = "inline";
            window.scrollTo(0, document.body.scrollHeight);
        }
    }
}};
{let self= window.base = {
    updataPwd:function(){
        document.querySelector("#input_cmd span").innerHTML = `root@debian:/${memory.pwd.join("/")} #`;
    },
    countdown:async function(em_id){
        let em = document.querySelector(em_id);
        if(em.innerHTML<=0){
            location.reload()
        }else{
            await sleep(1000);
            em.innerHTML--;
            //self.countdown(em_id);
        }
    },
    loadError:function(e){
        document.removeEventListener('error',self.loadError,true);
        window.onload = async function(){
            document.querySelector("html").innerHTML = `
                <p>Linux debian 6.1.0-10-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.1.38-1 (2023-07-14) x86_64</p><br>
                <p>The programs included with the Debian GNU/Linux system are free software;</p>
                <p>the exact distribution terms for each program are described in the</p>
                <p>individual files in /usr/share/doc/*/copyright.</p><br>
                <p>Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent</p>
                <p>permitted by applicable law.</p>
                <p>Last login: Sun Jan 14 21:50:08 2024 from 127.0.0.1</p>
                <div id="fail_div"></div>
                <div id="cmd_div"></div>
                <p id="input_cmd"></p>
                <style>
                    body,html{
                        margin: 0;
                        padding: 0;
                    }
                    body{
                        padding: 5px 5px;
                        background-color: black;
                        color: white;
                    }
                    p{
                        margin: 0px 0px 0px 0px;
                    }
                </style>
            `;
            document.title = "ssh root@"+location.href.split("/")[2].split(":")[0];
            await sleep(50);
            let em = document.querySelector("#fail_div");
            for(var i=0;i<10;i++){
                em.innerHTML+= `<p><span style="color: #E74856;">Fail:</span> GET ${decodeURI(location.href)} <span style="color: #A758BD;">net::ERR_ABORTED</span> <span style="color: #57F9F4;">429</span> (Too Many Requests)</p>`;
                await sleep(50);
            }
            await sleep(500);
            em.innerHTML+=`<p>请求次数过多，<span id="timer_s">60</span>秒后自动重试。输入flash手动刷新页面</p>`;
            document.querySelector("#input_cmd").innerHTML=`<span style="color: #0DAE0D;">root@debian:/${memory.pwd.join("/")} #</span> <input autofocus="true" style="background-color: black;color: white;outline: none;border: none;font-size: 1rem;padding: 0;" onkeydown="if(event.keyCode==13){linux.bin.bash(this.value)}" type="text">`;
            self.countdown("#timer_s");
        }
    }
}};

document.addEventListener('error',base.loadError,true);