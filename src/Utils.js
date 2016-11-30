/**
 * Created by Jacky.gao on 2016/7/27.
 */
export function getParameter(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return r[2];
    return null;
};

export function ajaxSave(url,parameters,callback) {
    $.ajax({
        type:'POST',
        url,
        data:parameters,
        success:function (result) {
            callback(result);
        },
        error:function (req) {
            if(req.status===401){
                bootbox.alert("权限不足，不能进行此操作.");
            }else{
                bootbox.alert('服务端错误，操作失败!');
            }
        }
    });
}

export function formatDate(date,format){
    if(typeof date === 'number'){
        date=new Date(date);
    }
    if(typeof date==='string'){
        return date;
    }
    var o = {
        "M+" : date.getMonth()+1,
        "d+" : date.getDate(),
        "H+" : date.getHours(),
        "m+" : date.getMinutes(),
        "s+" : date.getSeconds()
    };
    if(/(y+)/.test(format))
        format=format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(format))
            format = format.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return format;
};