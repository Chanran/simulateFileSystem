'use strict';

const jQuery = require('jquery');
const metroJS = require('metro-dist/js/metro.min'); //引入metroJS
const Vue = require('vue/dist/vue.min');
const url = require('./js/util/Url.class');

const getArr = {
    'openedFileIndex':url.getQueryString('openedFileIndex'),
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
        saveFile:(fileIndex)=>{

        }
    }
});
