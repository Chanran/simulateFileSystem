'use strict';
const electron = require('electron');  //electron
const jQuery = require('jquery');   //引入JQuery
const $ = jQuery;                   //定义JQuery别名
const metroJS = require('metro-dist/js/metro.min');  //引入metroJS
const Vue = require('vue/dist/vue.min'); //引入Vuejs
const ipcRenderer = electron.ipcRenderer; //IPC进程通信

/*引入类*/
const File = require('./js/class/File');
const Folder = require('./js/class/Folder');

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
    let newFile = new File(Folder.currentPath,'新建文件');

}}));
menuCreate.append(new MenuItem({label: 'new folder',click(){
    let newFolder = new Folder(Folder.currentPath,'新建文件夹');
    console.log(newFolder.currentPath);
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
