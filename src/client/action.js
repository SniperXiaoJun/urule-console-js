/**
 * Created by Jacky.gao on 2016/8/11.
 */
export const ADD='add';
export const DEL='del';
export const LOADED_DATA='loaded_data';

export function loadData(project) {
    return function (dispatch) {
        $.ajax({
            url:window._server+'/clientconfig/loadData?project='+project,
            success:function (data) {
                dispatch({type:LOADED_DATA,data});
            },
            error:function () {
                alert('加载数据失败！');
            }
        });
    };
};
export function save(data,project) {
    let xml="<?xml version=\"1.0\" encoding=\"utf-8\"?><client-config>",error=null;
    for(let item of data){
        if(!item.name){
            error='客户端名不能为空';
            break;
        }
        if(!item.client){
            error='客户端地址不能为空';
            break;
        }
        xml+=`<item name="${item.name}" client="${item.client}"/>`;
    }
    if(error){
        bootbox.alert(error);
        return;
    }
    xml+="</client-config>";
    $.ajax({
        url:window._server+'/clientconfig/save',
        data:{project,content:xml},
        success:function () {
            bootbox.alert('保存成功!');
        },
        error:function (req) {
            if(req.status===401){
                alert("权限不足，不能进行此操作.");
            }else{
                alert('服务端错误，操作失败!');
            }
        }
    });
};
export function del(index) {
    return {type:DEL,index};
};
export function add() {
    return {type: ADD};
};

