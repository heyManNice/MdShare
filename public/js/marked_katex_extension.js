/*调用mared和katex并实现自动解析公式
 *此js加载时机没有要求
 *但要求执行parse方法前确保已经加载marked和katex对象在全局变量
 *执行markedKatex.parse即可返回katex和marked处理过的字符串
 *本js对latex公式的识别有特殊要求
 * 1.只能使用$$和$包含块公式和行内公式
 * 2.$$外第一个字符必须是空白、换行和终止字符中的任意一个
 * 3.$外第一个字符必须是空白、换行、终止字符、英文逗号中的任意一个
 * 4.$$和$内第一个字符必须是至少一个空白字符
 */

/*定义全局变量
 *这是传统js cdn或者require导入的用法
 *如果使用此方法请注释掉export const markedKatex = {};
 */
markedKatex = {};

/*导出对象
 *这是es6 import导入的用法
 *如果使用此方法请注释掉markedKatex = {};
 */
//export const markedKatex = {};

//为全局变量赋值，并设置slef为该对象的自指
{let slef =  markedKatex = {
  /*katex和marked共同的配置
   */
  options:{
    /*katex的配置，里面的内容直接传给katex
     *throwOnError启用控制台报错，会中断渲染
     *其他配置请查阅katex官方手册
     */
    katex:{
      throwOnError: false
    },
    /*marked的配置，里面的内容直接传给marked
     *此处未设置，使用marked默认配置
     *其他配置请查阅marked官方手册
     */
    marked:{

    }
  },
  /*将md和latex字符串解析为html
   *传入含有md和latex的字符串
   *返回html字符串
   */
  parse:function(string){
    marked || slef.err("marked插件未加载");
    katex || slef.err("katex插件未加载");
    string = slef.parseBlockLatex(string);
    string = slef.parseInlineLatex(string); 
    marked.setOptions(slef.options.marked);
    return marked.parse(string);
  },
  /*获取$$之间包含的公式
   *传入需要处理的字符串
   *返回由$$包含的字符串数组，含有$$
   *获取不到时返回null
   */
  getBlockLatexList:function(string){
    return string.match(/(?<=[\s\n]|^)\$\$\s[^\$]+?\s\$\$(?=[\s\n]|$)/g);
  },
  /*解析$$之间包含的公式
   *传入需要处理的字符串
   *返回处理完成含有部分html的字符串
   */
  parseBlockLatex:function(string){
    let blockLatexList = slef.getBlockLatexList(string);
    while(blockLatexList && blockLatexList.length){
      let raw = blockLatexList.shift();
      let html = katex.renderToString(slef.clearSymbols(raw),slef.options.katex);
      string = string.replace(raw,`<p class="latex_block" align="center">${html}</p>`);
    }
    return string;
  },
  /*获取$之间包含的公式
   *传入需要处理的字符串
   *返回由$包含的字符串数组，含有$
   *获取不到时返回null
   */
  getInlineLatexList:function(string){
    return string.match(/(?<=[,\s\n]|^)\$\s[^\$]+?\s\$(?=[,\s\n]|$)/g);
  },
  /*解析$之间包含的公式
   *传入需要处理的字符串
   *返回处理完成含有不烦html的字符串
   */
  parseInlineLatex:function(string){
    let inlineLatexList = slef.getInlineLatexList(string);
    while(inlineLatexList && inlineLatexList.length){
      let raw = inlineLatexList.shift();
      let html = katex.renderToString(slef.clearSymbols(raw),slef.options.katex);
      string = string.replace(raw,`<span class="latex_inline">${html}</span>`);
    }
    return string;
  },
  /*清除字符串中的$符号
   *传入需要处理的字符串
   *返回去除了$符号的字符串
   */
  clearSymbols:function(string){
    return string.replace(/\$/g,'');
  },
  /*设置katex和marked的配置
   *传入设置的配置对象，覆盖写入配置
   *配置必须是对象
   *该对象应有两个子对象katex、marked
   */
  setOptions:function(options){
    (options instanceof Object)||slef.err("options参数必须为对象！");
    let member = ['katex','marked'];
    let optionsKeys = Object.keys(options);
    for(let i=0;i<optionsKeys.length;i++){
      member.indexOf(optionsKeys[i])==-1 && slef.err("options内的成员只能拥有"+member);
    }
    slef.options = options;
  },
  /*抛出错误的函数
   *传入信息
   *抛出错误并停止运行
   */
  err:function(msg){
    throw new Error(msg);
  }
}};