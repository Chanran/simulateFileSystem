'use strict';

const electron = require('electron');  //electron
const jQuery = require('jquery');   //引入JQuery
const $ = jQuery;                   //定义JQuery别名
const metroJS = require('metro-dist/js/metro.min');  //引入metroJS
const Vue = require('vue/dist/vue.min'); //引入Vuejs
const ipcRenderer = electron.ipcRenderer; //IPC进程通信

/*引入类*/
const DiskClass = require('./js/class/Disk.class');         //磁盘类
const DirStruClass = require('./js/class/DirStru.class');   //目录结构类
const FileClass = require('./js/class/File.class');         //文件类
const FolderClass = require('./js/class/Folder.class');     //文件夹类

//目录结构
const dirStru = new DirStruClass();
const disk = new DiskClass();
dirStru.addFile();
dirStru.addFolder();


/*界面右键菜单*/
const {remote} = require('electron');
const {Menu, MenuItem} = remote;

let header_path = new Vue({
    el:'#header_path',
    data:{
        path:DirStruClass.currDir
    },
    methods:{
        changePath:(value)=>{
            header_path.path = value;
        }
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


//创建新文件或者新文件夹菜单
let files_show = new Vue({
    el:'#files_show',
    data:{
        folders:[],
        files:[]
    },
    methods:{
        showMenu:(event) => {
            if (event.button === 2){
                menuCreate.popup(remote.getCurrentWindow());
            }
        },
        addFile:(fileJson) => {
            files_show.files.push(fileJson);
        },
        editFile:(fileJson) => {

        },
        showFileMenu:(event,fileJson) => {
            if (event.button === 2){
                event.stopPropagation();
                menuEdit.popup(remote.getCurrentWindow());
            }
        },
        addFolder:(folderJson) => {
            files_show.folders.push(folderJson);
        },
        enterFolder:(folderJson) => {
            /*改变当前路径*/
            DirStruClass.currDir += folderJson.name+'/';
            header_path.changePath(DirStruClass.currDir);
        },
        showFolderMenu:(event,folderJson) => {
            if (event.button === 2){
                event.stopPropagation();
                menuEdit.popup(remote.getCurrentWindow());
            }
        }
    }
});

/*新建文件或文件夹的菜单*/
const menuCreate = new Menu();
menuCreate.append(new MenuItem({label: 'new file', click() {

    files_show.addFile(dirStru.addFile());

}}));
menuCreate.append(new MenuItem({label: 'new folder',click(){

    files_show.addFolder(dirStru.addFolder());

}}));

/*编辑文件或者文件夹的菜单*/
const menuEdit = new Menu();
menuEdit.append(new MenuItem({label: '打开',click(){

}}));
menuEdit.append(new MenuItem({label: '重命名',click(){

}}));
menuEdit.append(new MenuItem({label: '删除',click(){

}}));
menuEdit.append(new MenuItem({label: '属性',click(){

}}));
