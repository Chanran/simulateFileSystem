'use strict';
const electron = require('electron');  //electron
const jQuery = require('jquery');   //引入JQuery
const $ = jQuery;                   //定义JQuery别名
const metroJS = require('metro-dist/js/metro.min.js');  //引入metroJS
const Vue = require('vue/dist/vue.min');
const ipcRenderer = electron.ipcRenderer; //IPC进程通信

const {remote} = require('electron');
const {Menu, MenuItem} = remote;

const menu = new Menu();
menu.append(new MenuItem({label: 'MenuItem1', click() { console.log('item 1 clicked'); }}));
menu.append(new MenuItem({type: 'separator'}));
menu.append(new MenuItem({label: 'MenuItem2', type: 'checkbox', checked: true}));

window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    menu.popup(remote.getCurrentWindow());
}, false);

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
