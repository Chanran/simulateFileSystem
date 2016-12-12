'use strict';

const electron = require('electron'); //electron
const {app,Tray} = require('electron');
const BrowserWindow = electron.BrowserWindow; //electron界面
const ipcMain = electron.ipcMain; //进程之间的通信
const child = require('child_process');

/*变量*/
let mainWindow; //主界面
let appIcon = null; //appIcon

app.on('ready', () => {
    // 创建主界面
    mainWindow = new BrowserWindow({
        fullscreen: true
    });

    // 加载主界面index.html
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);

    // 打开调试工具
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', function() {
        mainWindow = null;
    });

    //设置dock的图标(Linux会挂的，先不设置)
    //appIcon = new Tray('./src/icon/os.png');
});
// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

/*关机*/
ipcMain.on('shutdown', () => {
    app.quit();
});

/*新终端*/
ipcMain.on('new_terminal',()=>{
    if (process.platform == 'linux'){
        child.exec('gnome-terminal');
    }else{
        console.log('你的电脑不支持terminal!');
    }

});

/*打开文件管理页面*/
let file_manager = null;
ipcMain.on('file_manager',()=>{
    file_manager = new BrowserWindow({
        width:1600,
        height:1100,
        show:true
    });

    //打开调试工具
    file_manager.webContents.openDevTools();
    file_manager.loadURL(`file://${__dirname}/src/file_manager.html`);
});

/*打开编辑文件页面*/
let edit_file = null;
ipcMain.on('edit_file',(event,ramOpenedFiles,file)=>{
    edit_file = new BrowserWindow({
        width:800,
        height:800,
        show:true
    });
    ramOpenedFiles = JSON.stringify(ramOpenedFiles);
    //打开调试工具
    edit_file.webContents.openDevTools();
    edit_file.loadURL(`file://${__dirname}/src/edit_file.html?ramOpenedFiles=${ramOpenedFiles}&fileIndex=${file.index}&fileName=${file.name}&fileContent=${file.content}`);
});

ipcMain.on('closeFile',(event,ramOpenedFiles,ramIsSaved,openedFileIndex,fileIndex,fileContent)=>{

    file_manager.webContents.send('closeFile',ramOpenedFiles,ramIsSaved,openedFileIndex,fileIndex,fileContent);
});
