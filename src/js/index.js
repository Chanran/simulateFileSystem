'use strict';
const electron = require('electron');  //electron
const jQuery = require('jquery');   //引入JQuery
const $ = jQuery;                   //定义JQuery别名
const metroJS = require('metro-dist/js/metro.min.js');  //引入metroJS
const ipcRenderer = electron.ipcRenderer; //IPC进程通信
const open = require('open');

/*调用本地浏览器打开链接*/
let me = $('#me')[0];
me.addEventListener('click',()=>{
    open('http://www.jianshu.com/users/1402753fcc6f/latest_articles');
});
let github = $('#github')[0];
github.addEventListener('click',()=>{
    open('https://github.com/Chanran');
});
let blog = $('#blog')[0];
blog.addEventListener('click',()=>{
    open('https://chanran.github.io');
});
let jianshu = $('#jianshu')[0];
jianshu.addEventListener('click',()=>{
    open('http://www.jianshu.com/users/1402753fcc6f/latest_articles');
});

/*与主进程通信 */
let terminalDOM = $('#terminal')[0];
terminalDOM.addEventListener('dblclick',()=>{
    ipcRenderer.send('new_terminal');
});
let shutdownDOM = $('#shutdown')[0];
shutdownDOM.addEventListener('click',()=>{
    if (confirm('是否关机?')){
        ipcRenderer.send('shutdown');
    }
});
let file_managerDOM = $('#file_manager')[0];
file_managerDOM.addEventListener('dblclick',()=>{
    ipcRenderer.send('file_manager');
});
