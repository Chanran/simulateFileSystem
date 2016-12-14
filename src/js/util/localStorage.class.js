exports.getOpenedFilesArr = ()=>{
    return JSON.parse(window.localStorage.openedFiles);
};

exports.setOpenedFilesArr = (openedFilesArr)=>{
    window.localStorage.openedFiles = JSON.stringify(openedFilesArr);
};
