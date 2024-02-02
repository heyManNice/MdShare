config = {
    directory:[]
}
onload = async ()=>{
    let filename = request.getUrlParams(decodeURI(location.href)).file;
    document.title = filename;
    config.title = filename;
    document.querySelector(".md_title").innerHTML = filename;
    let em_dir_title = document.querySelector(".dir_title");
    em_dir_title.innerHTML= filename;
    em_dir_title.setAttribute("title",filename)
    let result = await request.sync_get(`md/${filename}.md`);
    switch (result.code) {
        case 200:
            document.querySelector(".md_info").innerHTML = `创建：${FnewDate(result.metadata.ctime)} &nbsp;&nbsp;浏览：${result.metadata.look+1} &nbsp;&nbsp;收藏：${result.metadata.like} &nbsp;&nbsp;修改：${FnewDate(result.metadata.mtime)}`;
            showMd(result.content);
            break;
        case 429:
            console.log("过多请求");
            document.querySelector(".article").innerHTML = "请求次数过多，请稍后重试";
            break;
        case 404:
            document.querySelector(".article").innerHTML = "文件不存在";
            break;
        default:
            console.log("请求失败");
            break;
    }
}
showMd = function(mdtext){
    let articleEm = document.querySelector(".article");
    articleEm.innerHTML=markedKatex.parse(mdtext.replace('﻿',''));
    hljs.highlightAll();
    setTitleNum(".article");
    setCodeBtn(".article");
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
        let pString = "p"+Num.join("_");
        let hr = ""
        if(Num.length<3){
            function insertAfter(newElement, targetElement) {
                let parent = targetElement.parentNode;
                if (parent.lastChild == targetElement) {
                    parent.appendChild(newElement);
                } else {
                    parent.insertBefore(newElement, targetElement.nextSibling);
                }
            }
            insertAfter(document.createElement("hr"),emList[i]);
        }
        config.directory.push({anchor:pString,text:pText,title:emList[i].innerHTML});
        emList[i].setAttribute("id",pString);
        emList[i].innerHTML = pText;
    }
    setDirectory(config.directory);
    observTitle(config.directory);
}
setDirectory = function(data){
    let dirEm = document.querySelector("header");
    let content = "";
    for(var i=0;i<data.length;i++){
        content += `<div onclick = "pScrollTo('#${data[i].anchor}')" class="${'p_h'+(data[i].anchor.length)/2}" data-anchor="${data[i].anchor}" title="${data[i].title}">${data[i].text}</div>`
    }
    dirEm.innerHTML += content;
}
pScrollTo = function(idName){
    document.querySelector(idName).scrollIntoView({behavior:"smooth"});
}
activeEm = function(em){
    let oldActive = document.querySelector("header .active");
    if(oldActive){
        oldActive.classList.remove("active");
    }
    em.classList.add("active");
}
observTitle = function(directory){
    if(window.innerWidth<768){
        return;
    }
    let options = {rootMargin:`0px 0px -${document.querySelector("section").clientHeight-32}px 0px`}
    let observer = new IntersectionObserver(function(e){
        if(!e[0].isIntersecting){
            return;
        }
        let active = document.querySelector(`header div[data-anchor=${e[0].target.id}]`)
        activeEm(active);
    },options);
    for(var i=0;i<directory.length;i++){
        observer.observe(document.querySelector("#"+directory[i].anchor));
    }
}
setCodeBtn = function(emName){
    let getLanguage = function(_emName){
        let classList = _emName.querySelector("code").classList;
        let language;
        for(let i=0;i<classList.length;i++){
            if(language = classList[i].match(/(?<=^language-).*/)){
                break;
            }
        }
        return language[0];
    }
    let preCodeList = document.querySelectorAll(emName+" pre");
    for(let i=0;i<preCodeList.length;i++){
        let div = document.createElement("div");
        div.setAttribute("class","code_bar");
        div.innerHTML = `<span onclick="switchCodeView(this)"><i class="fa fa-angle-down" aria-hidden="true" /></i>${getLanguage(preCodeList[i])}</span><button onclick="copyCode(this)"><i class="fa fa-copy" aria-hidden="true" /></i> 复制</button>`;
        preCodeList[i].prepend(div);
        let realH = preCodeList[i].offsetHeight;
        preCodeList[i].setAttribute("real_heigh",realH);
        preCodeList[i].style.height = realH+"px";
        preCodeList[i].setAttribute("close_heigh",div.offsetHeight);
        preCodeList[i].setAttribute("class","expand");
    }
}

copy = function(str) {
    let textArea = document.createElement("textArea");
    textArea.value = str;
    textArea.style.position = "absolute";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
}
copyCode = function(em){
    let text = em.parentElement.parentElement.querySelector("code").innerText;
    copy(text);
}
switchCodeView = function(em){
    let pre = em.parentElement.parentElement;
    console.log(pre);
    if(pre.classList.contains("expand")){
        pre.classList.remove("expand");
        pre.style.height=pre.getAttribute("close_heigh")+"px";
    }else{
        pre.classList.add("expand");
        pre.style.height=pre.getAttribute("real_heigh")+"px";
    }
}