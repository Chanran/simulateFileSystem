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
const storage = require('./js/util/localStorage');
const stringBytes = require('./js/util/stringBytes');

//正在打开的文件
const Ram = require('./js/class/Ram.class');
//目录结构
const dirStru = new DirStruClass();
//硬盘
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
            for (let i = 0; i < disk_analysis.fatArr.length; i++) {
                Vue.set(disk_analysis.fatArr, i, fatArr[i]);
            }
        }
    }
});

let files_opened = new Vue({
    el: '#files_opened',
    data: {
        openedFilesArr: new Array(),
    },
    methods: {
        deleteData: (openedFilesArr,openedFileIndex) => {
            if (openedFilesArr == null) {
                files_opened.openedFilesArr = null;
            } else {
                files_opened.openedFilesArr.splice(openedFileIndex,1);
            }
        },
        addData:(file) => {
            if (files_opened.openedFilesArr == null){
                files_opened.openedFilesArr = new Array();
            }
            files_opened.openedFilesArr.push(file);
        }
    }
});



//创建新文件或者新文件夹菜单
let files_show = new Vue({
    el: '#files_show',
    data: {
        folders: [],
        files: [],
        fileNow:{},
        //folderNow:{},
        rename:0
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
            file.isSaved = 0;
            fileNow = file;

            let openedFilesArr = storage.getOpenedFilesArr();
            openedFilesArr.push(fileNow);
            storage.setOpenedFilesArr(openedFilesArr);

            files_opened.addData(fileNow);

            ipcRenderer.send('edit_file', fileNow);
        },
        renameFile: (file) => {
            files_show.rename = 1;
            files_show.fileNow = file;
        },
        renameSuccess: (arrIndex,event) =>{
            let value = event.target.value;
            files_show.files[arrIndex].name = value;
            files_show.rename = 0;
        },
        deleteFile: (file) =>{
            for (let i = 0; i < files_show.files.length; i++){
                if (file.index == files_show.files[i].index){
                    files_show.files.splice(i,1);
                    Fat.fatArr[file.startBlock] = 0;
                    disk_analysis.updateFat(Fat.fatArr);
                    dirStru.dirStruArr.splice(file.index,1);
                    file = null;
                    break;
                }
            }
        },
        showFileProperty: (file) => {

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
    label: 'edit',
    click() {
        files_show.editFile(fileNow);
    }
}));
menuFileEdit.append(new MenuItem({
    label: 'rename',
    click() {
        files_show.renameFile(fileNow);
    }
}));
menuFileEdit.append(new MenuItem({
    label: 'delete',
    click() {
        files_show.deleteFile(fileNow);
    }
}));
menuFileEdit.append(new MenuItem({
    label: 'property',
    click() {
        files_show.showFileProperty(fileNow);
    }
}));
/*文件夹的菜单*/
const menuFolderEdit = new Menu();
menuFolderEdit.append(new MenuItem({
    label: 'open',
    click() {
        files_show.enterFolder(folderNow);
    }
}));
menuFolderEdit.append(new MenuItem({
    label: 'rename',
    click() {
        //files_show.editFile(folderNow);
    }
}));
menuFolderEdit.append(new MenuItem({
    label: 'delete',
    click() {

    }
}));
menuFolderEdit.append(new MenuItem({
    label: 'property',
    click() {

    }
}));


ipcRenderer.on('closeFile', (event,fileIndex) => {

    let openedFilesArr = new Array();
    for (let i = 0; i < storage.getOpenedFilesArr().length; i++){
        openedFilesArr.push(storage.getOpenedFilesArr()[i]);
    }
    let openedFileIndex = null;
    for(let i = 0; i < openedFilesArr.length; i++){
        if (openedFilesArr[i].index == fileIndex){
            if (openedFilesArr[i].isSaved == 1){
                for (let j = 0; j < dirStru.dirStruArr.length;i++){
                    if (dirStru.dirStruArr[j].index == fileIndex){


                        if (stringBytes.getContentBytesLength(openedFilesArr[i].content) > 64){
                            let contentArr = stringBytes.splitContent(openedFilesArr[i].content);
                            //暂时这样做，以后content分割之后存在不同的dirStruArr里，然后再取出来整合成contentn
                            //dirStru.dirStruArr[j].content = contentArr[0];
                            let tmpFileFatIndex = openedFilesArr[i].sBlock;
                            console.log(openedFilesArr[i]);
                            for (let k = 1; k < contentArr.length; k++){
                                //暂时
                                //dirStru.dirStruArr[dirStru.dirStruArrIndex+1] = contentArr[k];
                                //dirStru.dirStruArrIndex += 1;
                                let freeBlockIndex = Fat.useFreeBlock();
                                Fat.setBlock(tmpFileFatIndex,freeBlockIndex);
                                tmpFileFatIndex = freeBlockIndex;
                                console.log(tmpFileFatIndex);
                                console.log(freeBlockIndex);
                            }
                        }

                        //暂时这样做
                        dirStru.dirStruArr[j].content = openedFilesArr[i].content;

                        console.log(Fat.fatArr);
                        disk_analysis.updateFat(Fat.fatArr);
                        break;
                    }
                }
            }
            openedFilesArr.splice(i,1);
            openedFileIndex = i;
            break;
        }
    }
    storage.setOpenedFilesArr(openedFilesArr);

    if (openedFilesArr.length === 0) {
        openedFilesArr = null;
    }

    files_opened.deleteData(openedFilesArr,openedFileIndex);
});
