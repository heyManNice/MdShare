# Linux如何关机呢
1. 测试1  
2. 测试2  
3. 测试3  

在我自己，本以为现在是已经并非一个切迫而不能已于言的人了，但或者也还未能忘怀于当日自己的寂寞的悲哀罢，所以有时候仍不免呐喊几声，聊以慰藉那在寂寞里奔驰的猛士，使他不惮于前驱。至于我的喊声是勇猛或是悲哀，是可憎或是可笑，那倒是不暇顾及的;但既然是呐喊，则当然须听将令的了，所以我往往不恤用了曲笔，在《药》的瑜儿的坟上平空添上一个花环，在《明天》里也不叙单四嫂子竟没有做到看见儿子的梦，因为   
```cpp
#include <stdafx.h>
#include <windows.h>
#include <objidl.h>
#include <gdiplus.h>
using namespace Gdiplus;
#pragma comment (lib,"Gdiplus.lib")

VOID OnPaint(HDC hdc)
{
   Graphics graphics(hdc);
   Pen      pen(Color(255, 0, 0, 255));
   graphics.DrawLine(&pen, 0, 0, 200, 100);
}

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);

INT WINAPI WinMain(HINSTANCE hInstance, HINSTANCE, PSTR, INT iCmdShow)
{
   HWND                hWnd;
   MSG                 msg;
   WNDCLASS            wndClass;
   GdiplusStartupInput gdiplusStartupInput;
   ULONG_PTR           gdiplusToken;
   
   // Initialize GDI+.
   GdiplusStartup(&gdiplusToken, &gdiplusStartupInput, NULL);
   
   wndClass.style          = CS_HREDRAW | CS_VREDRAW;
   wndClass.lpfnWndProc    = WndProc;
   wndClass.cbClsExtra     = 0;
   wndClass.cbWndExtra     = 0;
   wndClass.hInstance      = hInstance;
   wndClass.hIcon          = LoadIcon(NULL, IDI_APPLICATION);
   wndClass.hCursor        = LoadCursor(NULL, IDC_ARROW);
   wndClass.hbrBackground  = (HBRUSH)GetStockObject(WHITE_BRUSH);
   wndClass.lpszMenuName   = NULL;
   wndClass.lpszClassName  = TEXT("GettingStarted");
   
   RegisterClass(&wndClass);
   
   hWnd = CreateWindow(
      TEXT("GettingStarted"),   // window class name
      TEXT("Getting Started"),  // window caption
      WS_OVERLAPPEDWINDOW,      // window style
      CW_USEDEFAULT,            // initial x position
      CW_USEDEFAULT,            // initial y position
      CW_USEDEFAULT,            // initial x size
      CW_USEDEFAULT,            // initial y size
      NULL,                     // parent window handle
      NULL,                     // window menu handle
      hInstance,                // program instance handle
      NULL);                    // creation parameters
      
   ShowWindow(hWnd, iCmdShow);
   UpdateWindow(hWnd);
   
   while(GetMessage(&msg, NULL, 0, 0))
   {
      TranslateMessage(&msg);
      DispatchMessage(&msg);
   }
   
   GdiplusShutdown(gdiplusToken);
   return msg.wParam;
}  // WinMain

LRESULT CALLBACK WndProc(HWND hWnd, UINT message, 
   WPARAM wParam, LPARAM lParam)
{
   HDC          hdc;
   PAINTSTRUCT  ps;
   
   switch(message)
   {
   case WM_PAINT:
      hdc = BeginPaint(hWnd, &ps);
      OnPaint(hdc);
      EndPaint(hWnd, &ps);
      return 0;
   case WM_DESTROY:
      PostQuitMessage(0);
      return 0;
   default:
      return DefWindowProc(hWnd, message, wParam, lParam);
   }
} // WndProc
```
那时的主将是不主张消极的。至于自己，却也并不愿将自以为苦的寂寞，再来传染给也如我那年青时候似的正做着好梦的青年在我自己，本以为现在是已经并非一个切迫而不能已于言的人了，但或者也还未能忘怀于当日自己的寂寞的悲哀罢，所以有时候仍不免呐喊几声，聊以慰藉那在寂寞里奔驰的猛士，使他不惮于前驱。至于我的喊声是勇猛或是悲哀，是可憎或是可笑，那倒是不暇顾及的;但既然是呐喊，则当然须听将令的了，所以我往往不恤用了曲笔，在《药》的瑜儿的坟上平空添上一个花环，在《明天》里也不叙单四嫂子竟没有做到看见儿子的梦，因为那时的主将是不主张消极的。至于自己，却也并不愿将自以为苦的寂寞，再来传染给也如我那年青时候似的正做着好梦的青年

## python程序  
```python
print("Hello, World!");
def test():
    a = 1 + 1
    return a
```  
## 无法识别的程序  
```
llllllll
```
## 表格  
这里是测试用的表格：  

|姓名|电话   |地址|
|----|------|----|
|小红|123123|地区|
|小兰|123123|地区|
|骁龙|123123|地区|  

**<center>表 1.1</center>**
### 公式  

$$f(x) \ne 0$$  

- [x] 事件1  
- [ ] 事件2  
- [ ] 事件3  

在我自己，本以为现在是已经并非一个切迫而不能已于言的人了，但或者也还未能忘怀于当日自己的寂寞的悲哀罢，所以有时候仍不免呐喊几声，聊以慰藉那在寂寞里奔驰的猛士，使他不惮于前驱。至于我的喊声是勇猛或是悲哀，是可憎或是可笑，那倒是不暇顾及的;但既然是呐喊，则当然须听将令的了，所以我往往不恤用了曲笔，在《药》的瑜儿的坟上平空添上一个花环，在《明天》里也不叙单四嫂子竟没有做到看见儿子的梦，因为   
```javascript
/*用于解决html页面中不同页面使用相同的元素该如何处理的问题
 *只用于对html文件的解析，将天马行空的自定义语法解析为浏览器可执行的html文件
 *解析的文件来自./public目录下的html文件，解析结果在./build中
 *使用到的js css等资源文件仍然在./public文件夹中，不需要转移到./build文件夹
*/
const fs = require("fs");
const path = require('path');

const build = {
    targetData:"",
    use:function(json){
        json.title && build.addTitle(json);
        json.css && build.addCss(json);
        json.js && build.addJs(json);
    },
    addTitle:function(json){
        build.targetData+=`<title>${json.title}</title>`;
    },
    addJs:function(json){
        if(json.link){
            build.targetData+=`<script src="${json.js}"></script>`;
        }else{
            let filePath = path.join(__dirname,"public",json.js);
            build.targetData+=`<script type="text/javascript">${build.read(filePath)}</script>`;
        }
    },
    addCss:function(json){
        if(json.link){
            build.targetData+=`<link rel="stylesheet" type="text/css" href="${json.css}">`;
        }else{
            let filePath = path.join(__dirname,"public",json.css);
            build.targetData+=`<style>${build.read(filePath)}</style>`;
        }
    },
    read:function(filePath){
        if(!fs.existsSync(filePath)){
            throw new Error("找不到"+filePath);
        }
        return fs.readFileSync(filePath).toString();
    },
    write:function(fileName,data){
        let dirPath = path.join(__dirname,"build");
        fs.existsSync(dirPath) || fs.mkdirSync(dirPath);
        let filepath = path.join(__dirname,"build",fileName);
        fs.writeFileSync(filepath,data);
    },
    getList:function(){
        let dirPath = path.join(__dirname,"public");
        if(!fs.existsSync(dirPath)){
            throw new Error("找不到 ./public文件夹");
        }
        let arr = fs.readdirSync(dirPath);
        let result = [];
        let reg = /\.html$/i;
        for(let i=0;i<arr.length;i++){
            reg.test(arr[i]) && result.push(arr[i]);
        }
        return result;
    },
    getScript:function(str){
        let reg = /(?<=<script build>)[\s\S]*?(?=<\/script>)/g;
        return reg.exec(str)[0];
    },
    getElementAll:function(str){
        let reg = /<.*build=.*>.*<\/.*>/g;
        return str.match(reg);
    },
    getDom:function(str){
        let reg = /(?<=<html>)[\s\S]*?(?=<\/html>)/g;
        htmlStr = str.match(reg)[0];
        
        let elements = build.getElementAll(htmlStr);
        let dom = {
            html:{}
        };
        for(let i=0;i<elements.length;i++){
            let element = elements[i];
            let tagName = element.match(/(?<=<)[\s\S]*?(?= )/)[0];
            let filePath = element.match(/(?<=build=")[\s\S]*?(?=")/)[0];
            let attribute = build.getAttribute(element);
            dom.html[tagName]={
                tagName:tagName,
                build:filePath,
                attribute:attribute
            }
        }
        return dom;
    },
    loopAnalysis:function(str){
        let cout=0;
        while(1){
            let buildList = build.getElementAll(str);
            if(!buildList){
                break;
            }
            let element = buildList[0];
            let tagName = element.match(/(?<=<)[\s\S]*?(?= )/)[0];
            let filePath = element.match(/(?<=build=")[\s\S]*?(?=")/)[0];
            let attribute = build.getAttribute(element);
            console.log(`第${++cout}次迭代解析${tagName}:${filePath}`);
            let content = build.read(path.join(__dirname,"public","html",filePath));
            let html = `<${tagName+" "+attribute}>${content}</${tagName}>`;
            str = str.replace(element,html);
        }
        return str;
    },
    getAttribute:function(element){
        let attribute = element.match(/(?<=^<.*? )[\s\S]*?(?=>)/)[0];
        return attribute.replace(/build=".*?"/,"");
    },
    makeFile:function(fileName){
        build.targetData = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">`;
        let text = build.read(path.join(__dirname,"public",fileName));
        eval(build.getScript(text));
        let dom = build.getDom(text);
        build.targetData+=`</head><body>`;
        for(let key in dom.html){
            let content = build.read(path.join(__dirname,"public",dom.html[key].build));
            content = build.loopAnalysis(content);
            let attribute = dom.html[key].attribute;
            build.targetData+=`<${key+" "+attribute}>${content}</${key}>\n`;
        }
        build.targetData+=`</body></html>`;
        build.write(fileName,build.targetData);
    }
}

let fileList = build.getList();
console.log("待解析的文件："+fileList);
for(let i=0;i<fileList.length;i++){
    console.log("正在解析"+fileList[i]);
    build.makeFile(fileList[i]);
}
console.log("解析完成");
```
那时的主将是不主张消极的。至于自己，却也并不愿将自以为苦的寂寞，再来传染给也如我那年青时候似的正做着好梦的青年在我自己，本以为现在是已经并非一个切迫而不能已于言的人了，但或者也还未能忘怀于当日自己的寂寞的悲哀罢，所以有时候仍不免呐喊几声，聊以慰藉那在寂寞里奔驰的猛士，使他不惮于前驱。至于我的喊声是勇猛或是悲哀，是可憎或是可笑，那倒是不暇顾及的;但既然是呐喊，则当然须听将令的了，所以我往往不恤用了曲笔，在《药》的瑜儿的坟上平空添上一个花环，在《明天》里也不叙单四嫂子竟没有做到看见儿子的梦，因为那时的主将是不主张消极的。至于自己，却也并不愿将自以为苦的寂寞，再来传染给也如我那年青时候似的正做着好梦的青年

$$\frac{\text{群佬}}{\text{我}+\text{群佬}} = \text{群佬}$$
# Linux如何关机呢
1. 测试1  
2. 测试2  
3. 测试3  

在我自己，本以为现在是已经并非一个切迫而不能已于言的人了，但或者也还未能忘怀于当日自己的寂寞的悲哀罢，所以有时候仍不免呐喊几声，聊以慰藉那在寂寞里奔驰的猛士，使他不惮于前驱。至于我的喊声是勇猛或是悲哀，是可憎或是可笑，那倒是不暇顾及的;但既然是呐喊，则当然须听将令的了，所以我往往不恤用了曲笔，在《药》的瑜儿的坟上平空添上一个花环，在《明天》里也不叙单四嫂子竟没有做到看见儿子的梦，因为那时的主将是不主张消极的。至于自己，却也并不愿将自以为苦的寂寞，再来传染给也如我那年青时候似的正做着好梦的青年在我自己，本以为现在是已经并非一个切迫而不能已于言的人了，但或者也还未能忘怀于当日自己的寂寞的悲哀罢，所以有时候仍不免呐喊几声，聊以慰藉那在寂寞里奔驰的猛士，使他不惮于前驱。至于我的喊声是勇猛或是悲哀，是可憎或是可笑，那倒是不暇顾及的;但既然是呐喊，则当然须听将令的了，所以我往往不恤用了曲笔，在《药》的瑜儿的坟上平空添上一个花环，在《明天》里也不叙单四嫂子竟没有做到看见儿子的梦，因为那时的主将是不主张消极的。至于自己，却也并不愿将自以为苦的寂寞，再来传染给也如我那年青时候似的正做着好梦的青年
$$f(x) \ne 0$$  

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |  

在我自己，本以为现在是已经并非一个切迫而不能已于言的人了，但或者也还未能忘怀于当日自己的寂寞的悲哀罢，所以有时候仍不免呐喊几声，聊以慰藉那在寂寞里奔驰的猛士，使他不惮于前驱。至于我的喊声是勇猛或是悲哀，是可憎或是可笑，那倒是不暇顾及的;但既然是呐喊，则当然须听将令的了，所以我往往不恤用了曲笔，在《药》的瑜儿的坟上平空添上一个花环，在《明天》里也不叙单四嫂子竟没有做到看见儿子的梦，因为那时的主将是不主张消极的。至于自己，却也并不愿将自以为苦的寂寞，再来传染给也如我那年青时候似的正做着好梦的青年在我自己，本以为现在是已经并非一个切迫而不能已于言的人了，但或者也还未能忘怀于当日自己的寂寞的悲哀罢，所以有时候仍不免呐喊几声，聊以慰藉那在寂寞里奔驰的猛士，使他不惮于前驱。至于我的喊声是勇猛或是悲哀，是可憎或是可笑，那倒是不暇顾及的;但既然是呐喊，则当然须听将令的了，所以我往往不恤用了曲笔，在《药》的瑜儿的坟上平空添上一个花环，在《明天》里也不叙单四嫂子竟没有做到看见儿子的梦，因为那时的主将是不主张消极的。至于自己，却也并不愿将自以为苦的寂寞，再来传染给也如我那年青时候似的正做着好梦的青年  

- [x] 事件1  
- [ ] 事件2  
- [ ] 事件3
# Linux如何关机呢
1. 测试1  
2. 测试2  
3. 测试3  

在我自己，本以为现在是已经并非一个切迫而不能已于言的人了，但或者也还未能忘怀于当日自己的寂寞的悲哀罢，所以有时候仍不免呐喊几声，聊以慰藉那在寂寞里奔驰的猛士，使他不惮于前驱。至于我的喊声是勇猛或是悲哀，是可憎或是可笑，那倒是不暇顾及的;但既然是呐喊，则当然须听将令的了，所以我往往不恤用了曲笔，在《药》的瑜儿的坟上平空添上一个花环，在《明天》里也不叙单四嫂子竟没有做到看见儿子的梦，因为那时的主将是不主张消极的。至于自己，却也并不愿将自以为苦的寂寞，再来传染给也如我那年青时候似的正做着好梦的青年在我自己，本以为现在是已经并非一个切迫而不能已于言的人了，但或者也还未能忘怀于当日自己的寂寞的悲哀罢，所以有时候仍不免呐喊几声，聊以慰藉那在寂寞里奔驰的猛士，使他不惮于前驱。至于我的喊声是勇猛或是悲哀，是可憎或是可笑，那倒是不暇顾及的;但既然是呐喊，则当然须听将令的了，所以我往往不恤用了曲笔，在《药》的瑜儿的坟上平空添上一个花环，在《明天》里也不叙单四嫂子竟没有做到看见儿子的梦，因为那时的主将是不主张消极的。至于自己，却也并不愿将自以为苦的寂寞，再来传染给也如我那年青时候似的正做着好梦的青年

## python程序  
```python
#!/usr/bin/env python3
print("Hello, World!");
def test():
    a = 1 + 1
    return a
```
## 表格  
这里是测试用的表格：  

|姓名|电话   |地址|
|----|------|----|
|小红|123123|地区|
|小兰|123123|地区|
|骁龙|123123|地区|  

**<center>表 1.1</center>**
### 公式  

$$f(x) \ne 0$$  

- [x] 事件1  
- [ ] 事件2  
- [ ] 事件3  

在我自己，本以为现在是已经并非一个切迫而不能已于言的人了，但或者也还未能忘怀于当日自己的寂寞的悲哀罢，所以有时候仍不免呐喊几声，聊以慰藉那在寂寞里奔驰的猛士，使他不惮于前驱。至于我的喊声是勇猛或是悲哀，是可憎或是可笑，那倒是不暇顾及的;但既然是呐喊，则当然须听将令的了，所以我往往不恤用了曲笔，在《药》的瑜儿的坟上平空添上一个花环，在《明天》里也不叙单四嫂子竟没有做到看见儿子的梦，因为那时的主将是不主张消极的。至于自己，却也并不愿将自以为苦的寂寞，再来传染给也如我那年青时候似的正做着好梦的青年在我自己，本以为现在是已经并非一个切迫而不能已于言的人了，但或者也还未能忘怀于当日自己的寂寞的悲哀罢，所以有时候仍不免呐喊几声，聊以慰藉那在寂寞里奔驰的猛士，使他不惮于前驱。至于我的喊声是勇猛或是悲哀，是可憎或是可笑，那倒是不暇顾及的;但既然是呐喊，则当然须听将令的了，所以我往往不恤用了曲笔，在《药》的瑜儿的坟上平空添上一个花环，在《明天》里也不叙单四嫂子竟没有做到看见儿子的梦，因为那时的主将是不主张消极的。至于自己，却也并不愿将自以为苦的寂寞，再来传染给也如我那年青时候似的正做着好梦的青年

$$\frac{\text{群佬}}{\text{我}+\text{群佬}} = \text{群佬}$$
# Linux如何关机呢
1. 测试1  
2. 测试2  
3. 测试3  

在我自己，本以为现在是已经并非一个切迫而不能已于言的人了，但或者也还未能忘怀于当日自己的寂寞的悲哀罢，所以有时候仍不免呐喊几声，聊以慰藉那在寂寞里奔驰的猛士，使他不惮于前驱。至于我的喊声是勇猛或是悲哀，是可憎或是可笑，那倒是不暇顾及的;但既然是呐喊，则当然须听将令的了，所以我往往不恤用了曲笔，在《药》的瑜儿的坟上平空添上一个花环，在《明天》里也不叙单四嫂子竟没有做到看见儿子的梦，因为那时的主将是不主张消极的。至于自己，却也并不愿将自以为苦的寂寞，再来传染给也如我那年青时候似的正做着好梦的青年在我自己，本以为现在是已经并非一个切迫而不能已于言的人了，但或者也还未能忘怀于当日自己的寂寞的悲哀罢，所以有时候仍不免呐喊几声，聊以慰藉那在寂寞里奔驰的猛士，使他不惮于前驱。至于我的喊声是勇猛或是悲哀，是可憎或是可笑，那倒是不暇顾及的;但既然是呐喊，则当然须听将令的了，所以我往往不恤用了曲笔，在《药》的瑜儿的坟上平空添上一个花环，在《明天》里也不叙单四嫂子竟没有做到看见儿子的梦，因为那时的主将是不主张消极的。至于自己，却也并不愿将自以为苦的寂寞，再来传染给也如我那年青时候似的正做着好梦的青年  

$$f(x) \ne 0$$  

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |  

在我自己，本以为现在是已经并非一个切迫而不能已于言的人了，但或者也还未能忘怀于当日自己的寂寞的悲哀罢，所以有时候仍不免呐喊几声，聊以慰藉那在寂寞里奔驰的猛士，使他不惮于前驱。至于我的喊声是勇猛或是悲哀，是可憎或是可笑，那倒是不暇顾及的;但既然是呐喊，则当然须听将令的了，所以我往往不恤用了曲笔，在《药》的瑜儿的坟上平空添上一个花环，在《明天》里也不叙单四嫂子竟没有做到看见儿子的梦，因为那时的主将是不主张消极的。至于自己，却也并不愿将自以为苦的寂寞，再来传染给也如我那年青时候似的正做着好梦的青年在我自己，本以为现在是已经并非一个切迫而不能已于言的人了，但或者也还未能忘怀于当日自己的寂寞的悲哀罢，所以有时候仍不免呐喊几声，聊以慰藉那在寂寞里奔驰的猛士，使他不惮于前驱。至于我的喊声是勇猛或是悲哀，是可憎或是可笑，那倒是不暇顾及的;但既然是呐喊，则当然须听将令的了，所以我往往不恤用了曲笔，在《药》的瑜儿的坟上平空添上一个花环，在《明天》里也不叙单四嫂子竟没有做到看见儿子的梦，因为那时的主将是不主张消极的。至于自己，却也并不愿将自以为苦的寂寞，再来传染给也如我那年青时候似的正做着好梦的青年  

- [x] 事件1  
- [ ] 事件2  
- [ ] 事件3
