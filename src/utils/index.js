// Created by liuliyuan on 2018/6/22
import React from 'react'
import { message,Badge } from 'antd';
import request from './request'
import composeMenus from './composeMenus'
import regRules from './regRules'
import { getFields } from './getFields'

const fMoney = (s,n=2)=>{

    if(s === "" || s === 0 || typeof (s) === 'undefined'){
        return '0.00';
    }else{
        n = n > 0 && n <= 20 ? n : 2;
        s = Math.floor(parseFloat((s + "").replace(/[^\d\\.-]/g, "")) * 100 ) /100 + "";
        let l = s.split(".")[0].split("").reverse(),
            r = s.split(".")[1] || 0;
        if(r===0 || r.length ===1){
            r+='0';
        }
        let t = "";
        for(let i = 0; i < l.length; i ++ )
        {
            t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
    }
}

const getQueryString=name=>{
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if(r!==null)return  decodeURI(r[2]); return null;
}

const changeChartArr = (arr) => {
    let i = 0, sum = 0, allZreo = true;
    for (i = 0; i < arr.length; i++) {
        if (arr[i].percent !== 0 && arr[i].percent !== '')
            allZreo = false;
        if (typeof(arr[i].percent) === 'string')
            arr[i].percent !== '' ? arr[i].percent = parseFloat(arr[i].percent): arr[i].percent = 0;
        sum += arr[i].percent;
    }
    for (i = 0; i < arr.length; i++) {
        if(allZreo) {
            arr[i].percent = 1;
            continue;
        }
        arr[i].percent = arr[i].percent / sum;
    }
    return arr;
}

const getDict = type => {
    return new Promise(function (resolve, reject) {
        request('/enums',{
            params: {
                enum: type
            }
        })
            .then((res)=>{
                if(res.state === 'ok'){
                    resolve(res.data)
                }else{
                    reject(res.message)
                }
            })
            .catch(err => {
                message.error(err.message)
            })
    })
}
const requestDict = async (type,callback)=>{
    let result = await getDict(type);
    callback(result)
}

//设置select值名不同
const setSelectFormat = data =>{
    if(data === undefined){
        return []
    } else {
        return data.map(item=>{
            return{
                //...item,
                key:item.value,
                label:item.name
            }
        })
    }

}

//匹配select的值
const getSelectFormat=(data,t)=>{

    const item = data.filter(d=>d.key === t)[0];
    let status;
    switch (item.key){
        case '0':
            status = 'success';  //已创建
            break;
        case '1' :
            status = 'error'; //审批中
            break;
        case '2':
            status = 'default'; //已审批
            break;
        case '3':
            status = 'processing'; //审批拒绝
            break;
        case '4':
            status = 'warning'; //已测算
            break;
        case '5':
            status = 'success'; //部分下发
            break;
        case '6':
            status = 'error'; //已下发
            break;
        case '7':
            status = 'default'; //部分竣工
            break;
        case '8':
            status = 'processing'; //已竣工
            break;
        case '9':
            status = 'warning'; //部分结算
            break;
        case '10':
            status = 'warning'; //已结算
            break;
        default:
            //break
    }

    return <Badge status={status} text={item.label} /> ;
}

export {
    request,
    composeMenus,
    fMoney,
    changeChartArr,
    getQueryString,
    regRules,
    getFields,
    requestDict,
    setSelectFormat,
    getSelectFormat,
}