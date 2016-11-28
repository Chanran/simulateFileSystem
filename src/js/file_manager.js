'use strict';
const electron = require('electron');  //electron
const jQuery = require('jquery');   //引入JQuery
const $ = jQuery;                   //定义JQuery别名
const metroJS = require('metro-dist/js/metro.min.js');  //引入metroJS
const Vue = require('vue/dist/vue.min'); //引入Vuejs
const ipcRenderer = electron.ipcRenderer; //IPC进程通信

/*引入类*/
const File = require('./class/File.class.js');
const Folder = require('./class/Folder.class.js');

/*界面右键菜单*/
const {remote} = require('electron');
const {Menu, MenuItem} = remote;

const menu = new Menu();
menu.append(new MenuItem({label: 'new file', click() {
    dispatchEvent('newFile');
}}));
menu.append(new MenuItem({label: 'new folder',click(){
    dispatchEvent('newFolder');
}}));

window.addEventListener('newFile', (e) => {
    let newFile = new File(Folder.currFolderPath,'新建文件');
    e.preventDefault();
    menu.popup(remote.getCurrentWindow());
}, false);
window.addEventListener('newFolder',(e) => {
    let newFolder = new Folder(Folder.currFolderPath,'新建文件夹');
    e.preventDefault();
    menu.po;
},false);

let header_path = new Vue({
    el:'#header_path',
    data:{
        path:'C:'
    }
});

let disk_analysis = new Vue({
    el:'#disk_analysis',
    data:{

    }
});

let files_analysis = new Vue({
    el:'#files_analysis',
    data:{

    }
});
