const FileClass = require('./js/class/File.class');
const FolderClass = require('./js/class/Folder.class');

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
        this.dirStruArr = new Array();
        //当前目录结构数组索引
        this.dirStruArrIndex = 0;
    }
    get dirStruArr(){
        return this.dirStruArr;
    }
    get dirStruArrIndex(){
        return this.dirStruArrIndex;
    }
    set dirStrArrIndex(value){
        this.dirStruArrIndex += value;
    }

    addFile(){
        let file = new FileClass(this.dirStruArrIndex());
        this.dirStruArrIndex(1);
        this.dirStruArr().push(file);
    }
    delFile(dirStruArrIndex){
        this.dirStruArr[dirStruArrIndex] = null;
        this.dirStruArr().splice(dirStruArrIndex,1);
    }
    addFolder(){
        let folder = new FolderClass(this.dirStruArrIndex());
        this.dirStruArrIndex(1);
        this.dirstr().push(folder);
    }
    delFolder(dirStruArrIndex){
        this.dirStruArr[dirStruArrIndex] = null;
        this.dirStruArr().splice(dirStruArrIndex,1);
    }
}

DirStru.currDir = '/';

module.exports = DirStru;
