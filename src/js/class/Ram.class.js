
class Ram{
    constructor(){

    }
}
Ram.openedFiles = new Array();

window.localStorage.openedFiles = JSON.stringify(Ram.openedFiles);
module.exports = Ram;
