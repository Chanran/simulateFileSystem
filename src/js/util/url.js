exports.getQueryString = (key)=>{
    let reg = new RegExp('(^|&)'+key+'=([^&]*)(&|$)');
    let result = window.location.search.substr(1).match(reg);
    return result?decodeURIComponent(result[2]):null;
};
