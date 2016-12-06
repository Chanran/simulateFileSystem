const Disk = require('./Disk.class');
const Fat = require('./Fat.class');

/**
 * @class 文件夹类
 * @constructor {目录结构类(依赖),所在目录下的索引,文件夹名,文件夹属性,起始盘块,文件夹长度}
 * @time 2016.11.30
 * @return {class}
 */
class Folder{
    constructor(dependency,index,name = '新建文件夹',type = '00001000',sBlock = Fat.useFreeBlock(),length = Disk.startBlockLength){
        this.index = index;
        this.name = name + index;
        this.type = type;
        if (sBlock != -2){
            this.sBlock = sBlock;
        }else{
            console.log('硬盘爆了！');
            alert('硬盘爆了！');
        }
        this.length = length;
        this.folderContent = new dependency();  //由于循环依赖，强行使用依赖注入来使用DirStruClass

    }
    get dirStruIndex(){
        return this.index;
    }
    set dirStruIndex(value){
        this.index = value;
    }
    get folderName(){
        return this.name;
    }
    set folderName(value){
        this.name = value;
    }
    get folderType(){
        return this.type;
    }
    set folderType(value){
        this.type = value;
    }
    get startBlock(){
        return this.sBlock;
    }
    get folderLength(){
        return this.length;
    }
    get folderStru(){
        return this.folderContent;
    }
    set folderStru(value){
        this.folderContent = value;
    }
}

module.exports = Folder;
