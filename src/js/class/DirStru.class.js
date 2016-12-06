let FileClass = require('./File.class');
let FolderClass = require('./Folder.class');

/**
 * @class 目录结构
 * @constructor 创建目录结构的数组
 * @return {class}
 */
class DirStru{

    static getCurrDir(){
        return DirStru.currDir;
    }

    constructor(){
        //创建当前目录结构数组
        this.dirStru = new Array();
        //当前目录结构数组索引
        this.dirStruIndex = 0;
    }
    get dirStruArr(){
        return this.dirStru;
    }
    set dirStruArr(value){
        this.dirStruArr = value;
    }

    get dirStruArrIndex(){
        return this.dirStruIndex;
    }
    set dirStruArrIndex(value){
        this.dirStruIndex = value;
    }

    addFile(){
        let file = new FileClass(this.dirStruArrIndex);
        this.dirStruArrIndex += 1;
        this.dirStruArr.push(file);
        return {'index':file.dirStruIndex,'name':file.fileName,'type':'文件'};
    }
    delFile(dirStruArrIndex){
        this.dirStruArr[dirStruArrIndex] = null;
        this.dirStruArr.splice(dirStruArrIndex,1);
    }
    addFolder(){
        let folder = new FolderClass(DirStru,this.dirStruArrIndex);
        this.dirStruArrIndex += 1;
        this.dirStru.push(folder);
        return {'index':folder.folderName,'name':folder.folderName,'type':'文件夹'};
    }
    delFolder(dirStruArrIndex){
        this.dirStruArr[dirStruArrIndex] = null;
        this.dirStruArr.splice(dirStruArrIndex,1);
    }
}

DirStru.currDir = '/';

module.exports = DirStru;
