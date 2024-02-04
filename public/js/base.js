sleep = function(ms){
    return new Promise(( resolve, reject ) => {
        setTimeout(function(){
            resolve(ms);
        },ms)
    });
}
{let self= window.base = {
    cmds:{
        flash:function(){
            location.reload()
            return "<p>正在刷新</p>";
        },
        ls:function(){
            return `<p><span style="color:#3B78CA;">公共 &nbsp;模板 &nbsp;视频 &nbsp;图片 &nbsp;文档 &nbsp;下载 &nbsp;音乐 &nbsp;Desktop</span></p>`;
        },
        cd:function(argv){
            if(argv.length == 1){
                return "";
            }
            return `<p>-bash: cd: ${argv[1]}: 无效的选项</p><p>cd: 用法：cd 没有用法</p>`
        }
    },
    runCmd:function(e,em){
        if(e.keyCode == 13){
            let cmd = em.value.split(" ");
            let result = "";
            if(self.cmds[cmd[0]]){
                result=self.cmds[cmd[0]](cmd);
            }else{
                result=`<p>-bash: ${cmd[0]}: command not found</p>`;
            }
            document.querySelector("#cmd_div").innerHTML+=`<p><span style="color: #0DAE0D;">root@debian:/root#</span> ${em.value}</p>${result}`;
            em.value = "";
            window.scrollTo(0, document.body.scrollHeight);
        }
    },
    countdown:async function(em_id){
        let em = document.querySelector(em_id);
        if(em.innerHTML<=0){
            location.reload()
        }else{
            await sleep(1000);
            em.innerHTML--;
            self.countdown(em_id);
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
            document.querySelector("#input_cmd").innerHTML=`<span style="color: #0DAE0D;">root@debian:/root#</span> <input autofocus="true" style="background-color: black;color: white;outline: none;border: none;font-size: 1rem;padding: 0;" onkeydown="base.runCmd(event,this)" type="text">`;
            self.countdown("#timer_s");
        }
    }
}};

document.addEventListener('error',base.loadError,true);