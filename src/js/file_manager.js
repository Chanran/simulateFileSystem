'use strict';

const electron = require('electron');  //electron
const jQuery = require('jquery');   //引入JQuery
const $ = jQuery;                   //定义JQuery别名
const metroJS = require('metro-dist/js/metro.min');  //引入metroJS
const Vue = require('vue/dist/vue.min'); //引入Vuejs
const ipcRenderer = electron.ipcRenderer; //IPC进程通信

/*引入类*/
const DiskClass = require('./js/class/Disk.class');
const DirStruClass = require('./js/class/DirStru.class');
const FileClass = require('./js/class/File.class');
const FolderClass = require('./js/class/Folder.class');

//目录结构
const dirStru = new dirStru();


/*界面右键菜单*/
const {remote} = require('electron');
const {Menu, MenuItem} = remote;

//创建新文件或者新文件夹菜单
let files_show_dom = new Vue({
    el:'#files_show',
    data:{
        test: 'test'
    },
    methods:{
        showMenu:(event) => {
            event.stopPropagation();
            event.preventDefault();
            menuCreate.popup(remote.getCurrentWindow());
        }
    }
});
const menuCreate = new Menu();
menuCreate.append(new MenuItem({label: 'new file', click() {


}}));
menuCreate.append(new MenuItem({label: 'new folder',click(){

}}));

let header_path = new Vue({
    el:'#header_path',
    data:{
        path:'/'
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
