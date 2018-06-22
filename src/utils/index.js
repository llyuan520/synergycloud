// Created by liuliyuan on 2018/6/22
import request from './request'
import React from 'react'
import composeMenus from './composeMenus'
import regRules from './regRules'
//import piwik from './piwik'
import DocumentTitle from 'react-document-title'

const wrapPage = (title,Component) => props => <DocumentTitle title={`${title}`}>{<Component {...props}/>}</DocumentTitle>

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
export {request,composeMenus,fMoney, changeChartArr,getQueryString,regRules,wrapPage/*piwik*/}