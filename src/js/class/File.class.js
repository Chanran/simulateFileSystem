const Disk = require('./Disk.class');
const DirStru = require('././DirStru.class');

/**
 * @class 文件类
 * @constructor {所在目录下的索引，文件名，文件类型,文件属性，起始盘块，文件长度}
 * @time 2016.11.30
 * @return {class}
 */
class File{
    constructor(index,name = '新建文本文件',type = 'txt' ,property = '00000100',sBlock = Disk.startBlock,length = Disk.startBlockLength){
        this.index = index;
        this.name = name;
        this.type = type;
        this.property = property;
        this.sBlock = sBlock;
        this.length = length;
    }
    get dirStruIndex(){
        return this.index;
    }
    set dirStruIndex(value){
        this.index = value;
    }

    get fileName(){
        return this.name;
    }
    set fileName(value){
        this.name = value;
    }
    get fileType(){
        return this.type;
    }
    set fileType(value){
        this.type = value;
    }
    get fileProperty(){
        return this.property;
    }
    set fileProperty(value){
        this.property = value;
    }
    get startBlock(){
        return this.sBlock;
    }
    get fileLength(){
        return this.length;
    }
    set fileLength(value){
        this.length = value;
    }
}

module.exports = File;
