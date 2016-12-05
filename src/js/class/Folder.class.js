const Disk = require('./js/class/Disk.class');
const DirStruClass = require('./js/class/DirStru.class');

/**
 * @class 文件夹类
 * @constructor {所在目录下的索引,文件夹名,文件夹属性,起始盘块,文件夹长度}
 * @time 2016.11.30
 * @return {class}
 */
class Folder{
    constructor(dirStruIndex,folderName = '新建文件夹',folderType = '00001000',startBlock = Disk.startBlock,folderLength = Disk.startBlockLength){
        this.dirStruIndex = dirStruIndex;
        this.folderName = folderName;
        this.folderType = folderType;
        this.startBlock = startBlock;
        this.folderLength = folderLength;
        this.dirStru = new DirStruClass();
    }
    get dirStruIndex(){
        return this.dirStruIndex;
    }
    set dirStruIndex(value){
        this.dirStruIndex = value;
    }
    get folderName(){
        return this.folderName;
    }
    set folderName(value){
        this.folderName = value;
    }
    get folderType(){
        return this.folderType;
    }
    set folderType(value){
        this.folderType = value;
    }
    get startBlock(){
        return this.startBlock;
    }
    get folderLength(){
        return this.folderName;
    }
}

module.exports = Folder;
