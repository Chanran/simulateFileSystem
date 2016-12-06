/**
 * Fat表静态类，占用硬盘0,1块
 */
class Fat{
    /**
     * 遍历fat表，返回空闲块的序号
     * @return int
     */
    static useFreeBlock(){
        for (let i = 2; i < Fat.fatArr.length; i++){
            if (Fat.fatArr[i] === 0){
                Fat.fatArr[i] = 255;
                return i;
            }
        }
        return -2;
    }

    constructor(){

    }
}

Fat.fatArr = new Array(128);
Fat.fatArr[0] = 255;
Fat.fatArr[1] = 255;
for (let i = 2; i < Fat.fatArr.length; i++){
    Fat.fatArr[i] = 0;
}

module.exports = Fat;
