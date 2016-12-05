const Disk = require('./js/class/Disk.class');

/**
 * @class 文件类
 * @constructor {所在目录下的索引，文件名，文件属性，起始盘块，文件长度}
 * @time 2016.11.30
 * @return {class}
 */
class File{
    constructor(dirStruIndex,fileName,fileType = '00000100',startBlock = Disk.startBlock,fileLength = Disk.startBlockLength){
        this.dirStruIndex = dirStruIndex;
        this.filName = fileName;
        this.fileType(fileType);
        this.startBlock(startBlock);
        this.fileLength(fileLength);
    }
    get dirStruIndex(){
        return this.dirStruIndex;
    }
    set dirStruIndex(value){
        this.dirStruIndex = value;
    }
    get fileName(){
        return this.fileName;
    }
    set fileName(value){
        this.fileName = value;
    }
    get fileType(){
        return this.fileType;
    }
    set fileType(value){
        this.fileType = value;
    }
    get startBlock(){
        return this.startBlock;
    }
    get fileLength(){
        return this.fileLength;
    }
    set fileLength(value){
        this.fileLength = value;
    }
}

module.exports = File;
