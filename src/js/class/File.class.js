/**
 * @class 文件类
 * @constructor {string,string,string,string,string}
 * @param size  {3Bytes,2Bytes,1Bytes,1Bytes,1Bytes}
 * @time 2016.11.30
 * @return {class}
 */
class File{
    constructor(filePath,fileName,fileType = '00000100',startBlock = ,fileLength){
        this.folderPath = filePath;
        this.filName = fileName;
        this.fileType(fileType);
        this.startBlock(startBlock);
        this.fileLength(fileLength);
    }
    get filePath(){
        return this.filePath;
    }
    set filePath(value){
        this.filePath = value;
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
        this.fileType(value);
    }
    get startBlock(){
        return this.startBlock;
    }
    get fileLength(){
        return this.fileLength;
    }
}

module.exports = File;