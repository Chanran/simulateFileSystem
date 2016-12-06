class Fat{
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
