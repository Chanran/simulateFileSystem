'use strict';

const electron = require('electron');
const jQuery = require('jquery');
const metroJS = require('metro-dist/js/metro.min'); //引入metroJS
const Vue = require('vue/dist/vue.min');
const url = require('./js/util/Url.class');
const ipcRenderer = electron.ipcRenderer;

let getArr = {
    'ramOpenedFiles':JSON.parse(url.getQueryString('ramOpenedFiles')),
    'fileIndex':url.getQueryString('fileIndex'),
    'fileName':url.getQueryString('fileName'),
    'fileContent':url.getQueryString('fileContent')
};

let edit_file_content = new Vue({
    el:'#edit_file_content',
    data:{
        getArr:getArr
    },
    methods:{
        saveFile:()=>{
            //应该在main.js弄一个全局的数据共享，共享Ram.openedFiles
        },
        quit:(ramOpenedFiles,ramIsSaved,openedFileIndex,fileIndex,fileContent)=>{

            if (ramIsSaved[openedFileIndex] === 0){
                if(confirm('您还没保存文件，是否需要保存文件？')){
                    edit_file_content.saveFile(ramOpenedFiles,ramIsSaved,openedFileIndex);
                    ipcRenderer.send('closeFile',ramOpenedFiles,ramIsSaved,openedFileIndex,fileIndex,fileContent);
                    window.close();
                }else{
                    ipcRenderer.send('closeFile',ramOpenedFiles,ramIsSaved,openedFileIndex,fileIndex,fileContent);
                    window.close();
                }
            }else{
                ipcRenderer.send('closeFile',ramOpenedFiles,ramIsSaved,openedFileIndex,fileIndex,fileContent);
                window.close();
            }
        }
    }
});
