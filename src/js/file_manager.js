'use strict';

const electron = require('electron'); //electron
const jQuery = require('jquery'); //引入JQuery
const $ = jQuery; //定义JQuery别名
const metroJS = require('metro-dist/js/metro.min'); //引入metroJS
const Vue = require('vue/dist/vue.min'); //引入Vuejs
const ipcRenderer = electron.ipcRenderer; //IPC进程通信

/*引入类*/
const DiskClass = require('./js/class/Disk.class'); //磁盘类
const DirStruClass = require('./js/class/DirStru.class'); //目录结构类
const FileClass = require('./js/class/File.class'); //文件类
const FolderClass = require('./js/class/Folder.class'); //文件夹类
const Fat = require('./js/class/Fat.class');
//目录结构
const dirStru = new DirStruClass();
const disk = new DiskClass();

//右键文件或者文件夹的时候保存当前点击的元素
let fileNow = null;
let folderNow = null;

/*界面右键菜单*/
const {
    remote
} = require('electron');
const {
    Menu,
    MenuItem
} = remote;

let header_path = new Vue({
    el: '#header_path',
    data: {
        path: DirStruClass.currDir
    },
    methods: {
        changePath: (value) => {
            header_path.path = value;
        }
    }
});

let disk_analysis = new Vue({
    el: '#disk_analysis',
    data: {
        fatArr: Fat.fatArr,
    },
    methods: {
        updateFat: (fatArr) => {
            //vue不能直接数组赋值，要使用vue的变异方法，不然视图不会更新。
            for (let i = 0; i < disk_analysis.fatArr.length; i++){
                Vue.set(disk_analysis.fatArr,i,fatArr[i]);
            }
        }
    }
});

let files_opened = new Vue({
    el: '#files_opened',
    data: {

    },
    methods: {

    }
});

let edit_file_content = new Vue({
    el:'#edit_file_content',
    data:{
        file:null
    },
    methods:{

    }
});


//创建新文件或者新文件夹菜单
let files_show = new Vue({
    el: '#files_show',
    data: {
        folders: [],
        files: []
    },
    methods: {
        //右键空白区域出现新建文件或文件夹菜单
        showMenu: (event) => {
            if (event.button === 2) {
                menuCreate.popup(remote.getCurrentWindow());
            }
        },
        //新建文件
        addFile: (file) => {
            files_show.files.push(file);
        },
        //编辑文件
        editFile: (file) => {
            fileNow = file;

            ipcRenderer.send('edit_file');
        },
        //右键某个文件，出现菜单
        showFileMenu: (event, file) => {
            if (event.button === 2) {
                event.stopPropagation();
                fileNow = file;
                menuFileEdit.popup(remote.getCurrentWindow());
            }
        },
        //添加文件夹
        addFolder: (folder) => {
            files_show.folders.push(folder);
        },
        //双击文件夹进入文件夹
        enterFolder: (folder) => {
            folderNow = folder;
            /*改变当前路径*/
            DirStruClass.currDir += folder.fileName + '/';
            header_path.changePath(DirStruClass.currDir);
        },
        //文件夹菜单
        showFolderMenu: (event, folder) => {
            if (event.button === 2) {
                event.stopPropagation();
                folderNow = folder;
                menuFolderEdit.popup(remote.getCurrentWindow());
            }
        }
    }
});

/*新建文件或文件夹的菜单*/
const menuCreate = new Menu();
menuCreate.append(new MenuItem({
    label: 'new file',
    click() {
        files_show.addFile(dirStru.addFile());
        disk_analysis.updateFat(Fat.fatArr);

    }
}));
menuCreate.append(new MenuItem({
    label: 'new folder',
    click() {

        files_show.addFolder(dirStru.addFolder());
        disk_analysis.updateFat(Fat.fatArr);

    }
}));

/*文件的菜单*/
const menuFileEdit = new Menu();
menuFileEdit.append(new MenuItem({
    label: '编辑文件',
    click() {
        files_show.editFile(fileNow);
    }
}));
menuFileEdit.append(new MenuItem({
    label: '重命名',
    click() {

    }
}));
menuFileEdit.append(new MenuItem({
    label: '删除',
    click() {

    }
}));
menuFileEdit.append(new MenuItem({
    label: '属性',
    click() {

    }
}));
/*文件夹的菜单*/
const menuFolderEdit = new Menu();
menuFolderEdit.append(new MenuItem({
    label: '打开文件夹',
    click() {
        files_show.enterFolder(folderNow);
    }
}));
menuFolderEdit.append(new MenuItem({
    label: '重命名',
    click() {

    }
}));
menuFolderEdit.append(new MenuItem({
    label: '删除',
    click() {

    }
}));
menuFolderEdit.append(new MenuItem({
    label: '属性',
    click() {

    }
}));
