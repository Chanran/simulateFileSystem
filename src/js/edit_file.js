'use strict';

const electron = require('electron');
const jQuery = require('jquery');
const metroJS = require('metro-dist/js/metro.min'); //引入metroJS
const Vue = require('vue/dist/vue.min');
const url = require('./js/util/Url.class');
const storage = require('./js/util/localStorage.class');
const ipcRenderer = electron.ipcRenderer;

let getArr = {
    'fileIndex':JSON.parse(url.getQueryString('file')).index,
    'fileName':JSON.parse(url.getQueryString('file')).name,
    'fileContent':JSON.parse(url.getQueryString('file')).content
};

let edit_file_content = new Vue({
    el:'#edit_file_content',
    data:{
        getArr:getArr
    },
    methods:{
        saveFile:()=>{
            let openedFilesArr = storage.getOpenedFilesArr();
            let fileContent = document.getElementById('fileContent').value;
            for(let i = 0; i < openedFilesArr.length; i++){
                if (openedFilesArr[i].index == edit_file_content.getArr.fileIndex){
                    openedFilesArr[i].isSaved = 1;
                    openedFilesArr[i].content = fileContent;
                    break;
                }
            }
            storage.setOpenedFilesArr(openedFilesArr);
        },
        quit:()=>{
            let openedFilesArr = storage.getOpenedFilesArr();
            for(let i = 0; i < openedFilesArr.length; i++){
                if (openedFilesArr[i].index == edit_file_content.getArr.fileIndex){
                    if (openedFilesArr[i].isSaved === 0){
                        if(confirm('您还没保存文件，是否需要保存文件？')){
                            edit_file_content.saveFile();
                            ipcRenderer.send('closeFile',edit_file_content.getArr.fileIndex);
                            window.close();
                            break;
                        }else{
                            ipcRenderer.send('closeFile',edit_file_content.getArr.fileIndex);
                            window.close();
                            break;
                        }
                    }else{
                        ipcRenderer.send('closeFile',edit_file_content.getArr.fileIndex);
                        window.close();
                        break;
                    }
                }
            }



        }
    }
});
