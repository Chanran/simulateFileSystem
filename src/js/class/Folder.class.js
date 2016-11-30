/**
 * @class 文件夹类
 * @constructor {string,' ',int,int,0}
 * @param size  {3Bytes,2Bytes,1Bytes,1Bytes,1Bytes}
 * @time 2016.11.30
 * @return {class}
 */
class Folder{
    static getCurrentPath(){
        return this.currentPath;
    }
    static set CurrentPath(value){
        return this.currentPath;
    }

    constructor(folderPath,keep2Bytes = ' ',folderType,startBlock,keep1Bytes = 0){
        this.folderPath = folderPath;
        this.folderType = folderType;
        this.startBlock = startBlock;
    }
    get folderPath(){
        return this.folderPath;
    }
    set folderPath(value){
        this.folderPath = value;
    }
    get folderType(){
        return this.folderType;
    }
    get startBlock(){
        return this.startBlock;
    }
}
Folder.prototype.currentPath = '/';

module.exports = Folder;
