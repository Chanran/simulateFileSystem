const Disk = require('./Disk.class');
const Fat = require('./Fat.class');
const DirStru = require('./DirStru.class');
const Block = require('./Block.class');

/**
 * @class 文件类
 * @constructor {所在目录下的索引，文件名，文件类型,文件属性，起始盘块，文件长度}
 * @time 2016.11.30
 * @return {class}
 */
class File{
    constructor(index,name = '新建文件',type = 'txt' ,property = '00000100',sBlock = Fat.useFreeBlock(),length = Block.blockLength){
        this.index = index;
        this.name = name + index+'.'+type;
        this.type = type;
        this.property = property;
        if (sBlock != -2){
            this.sBlock = sBlock;
        }else{
            console.log('硬盘爆了！');
            alert('硬盘爆了！');
        }
        this.length = length;
        this.content = '';
        this.isSaved = 1;
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
    get fileContent(){
        return this.content;
    }
    set fileContent(value){
        this.content = value;
    }
    get isSaved(){
        return this.isSaved;
    }
    set isSaved(value){
        this.isSaved = value;
    }
}
module.exports = File;
