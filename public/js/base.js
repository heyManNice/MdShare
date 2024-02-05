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
        profile:`/bin`
    },
    root:{
        test:{

        },
        readme:"test"
    },
    usr:{
        include:{
            stdio:{
                printf:function(string,...format){
                    document.querySelector("#cmd_div").innerHTML+=`<p>${string}</p>`;
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
        ls:function(){
            let stdio = self.usr.include.stdio;
            let dir = self;
            for(let i=0;i<memory.pwd.length;i++){
                dir = dir[memory.pwd[i]]
            }
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
        cd:function(cmd){
            let stdio = self.usr.include.stdio;
            let pathArr = cmd[1].split("/");
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
                        let dir = self;
                        for(let i=0;i<memory.pwd.length;i++){
                            dir = dir[memory.pwd[i]]
                        }
                        if(dir[pathArr[i]]){
                            memory.pwd.push(pathArr[i]);
                        }else{
                            stdio.printf(`-cd: no such file or directory: ${cmd[1]}`);
                            document.querySelector("#input_cmd span").innerHTML = `root@debian:/${memory.pwd.join("/")} #`;
                            return
                        }
                        break;
                }
            }
            document.querySelector("#input_cmd span").innerHTML = `root@debian:/${memory.pwd.join("/")} #`;
        },
        cat:function(cmd){
            let file = cmd[1];
            let dir = self;
            for(let i=0;i<memory.pwd.length;i++){
                dir = dir[memory.pwd[i]]
            }
            if(dir[file]){
                self.usr.include.stdio.printf(dir[file]);
            }
        },
        flash:function(){
            self.usr.include.stdio.printf("正在刷新...");
            location.reload();
        }
    }
}};
{let self= window.base = {
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