class Url{

    static getQueryString(key){
        var reg = new RegExp('(^|&)'+key+'=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result?decodeURIComponent(result[2]):null;
    }

}



module.exports = Url;
