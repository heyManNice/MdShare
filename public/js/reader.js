config = {
    directory:[]
}
onload = async ()=>{
    let filename = request.getUrlParams(decodeURI(location.href)).file;
    document.title = filename;
    config.title = filename;
    document.querySelector(".md_title").innerHTML = filename;
    document.querySelector(".dir_title").innerHTML = filename;
    let result = await request.sync_post("getMd",{filename:filename+".md"});
    switch (result.code) {
        case 200:
            document.querySelector(".md_info").innerHTML = `创建：${FnewDate(result.metadata.ctime)} &nbsp;&nbsp;浏览：${result.metadata.look+1} &nbsp;&nbsp;收藏：${result.metadata.like} &nbsp;&nbsp;修改：${FnewDate(result.metadata.mtime)}`;
            showMd(result.content);
            break;
    
        default:
            console.log("请求失败");
            break;
    }
}
showMd = function(mdtext){
    document.querySelector(".article").innerHTML=marked.parse(mdtext.replace('﻿',''));
    MathJax.typeset([".article"]);
    hljs.highlightAll();
    setTitleNum(".article");
}
FnewDate=function (time) {
    function padZero(num) {
        return (num < 10 ? '0' : '') + num;
    }
    if (time) {
        var date = new Date(time);
    } else {
        var date = new Date();
    }
    var year = date.getFullYear(),
        month = padZero(date.getMonth() + 1),
        day = padZero(date.getDate()),
        hour = padZero(date.getHours()),
        min = padZero(date.getMinutes()),
        sec = padZero(date.getSeconds());
    var newTime =
        year + '-' +
        month + '-' +
        day + ' ' +
        hour + ':' +
        min + ':' +
        sec;
    return newTime;
}
setTitleNum = function(emName){
    let emList = document.querySelector(emName).children;
    let Num = [];
    for(var i=0;i<emList.length;i++){
        let tagName = emList[i].tagName;
        if(tagName.length != 2 || tagName.slice(0,1) != "H" || isNaN(Number(tagName.slice(1,2)))){
            continue;
        }
        let bit = tagName.slice(1,2);
        Num = Num.splice(0,bit);
        if(Num[bit-1]===undefined){
            Num[bit-1] = 1;
        }else{
            Num[bit-1]++;
        }
        let pText = Num.join(".")+"、"+emList[i].innerHTML;
        emList[i].innerHTML = pText;
        let pString = "p"+Num.join("_");
        emList[i].setAttribute("id",pString);
        config.directory.push({anchor:pString,text:pText});
    }
    setDirectory(config.directory);
}
setDirectory = function(data){
    let dirEm = document.querySelector("header");
    let content = "";
    for(var i=0;i<data.length;i++){
        content += `<div onclick = "pScrollTo('#${data[i].anchor}')" class="${'p_h'+(data[i].anchor.length)/2}" data-anchor="${data[i].anchor}">${data[i].text}</div>`
    }
    dirEm.innerHTML += content;
}
pScrollTo = function(idName){
    document.querySelector(idName).scrollIntoView({behavior:"smooth"});
}