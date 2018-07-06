// Created by liuliyuan on 2018/6/22
import React from 'react'
import {message, Badge} from 'antd';
import {BigNumber} from 'bignumber.js'
import request from './request'
import composeMenus from './composeMenus'
import regRules from './regRules'
import {getFields} from './getFields'

const fMoney = (s, n = 2) => {
    if (s === 0) {
        return '0.00';
    } else if (s === "" || typeof (s) === 'undefined') {
        return '';
    }
    n = n > 0 && n <= 20 ? n : 2;
    /**添加一下代码 大数字用parseFloat不精确 */
    s = s.toString().replace(/[^\d\\.-]/g, "");
    try {
        return (new BigNumber(s)).toFormat(n);
    } catch (e) {
        console.warn('fMoney error：', e)
        return '';
    }
}

const getQueryString = name => {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r !== null) return decodeURI(r[2]);
    return null;
}
const getDict = type => {
    return new Promise(function (resolve, reject) {
        request('/enums', {
            params: {
                enum: type
            }
        })
        .then((res) => {
            if (res.state === 'ok') {
                resolve(res.data)
            } else {
                reject(res.message)
            }
        })
        .catch(err => {
            message.error(err.message)
        })
    })
}
const requestDict = async (type, callback) => {
    let result = await getDict(type);
    callback(result)
}

//设置select值名不同
const setSelectFormat = data => {
    if (data === undefined) {
        return []
    } else {
        return data.map(item => {
            return {
                //...item,
                key: item.value,
                label: item.name
            }
        })
    }

}
const parseJsonToParams = data => {
    let str = '';
    for (let key in data) {
        if (typeof data[key] !== 'undefined' && data[key] !== '') {
            str += `${key}=${data[key]}&`
        }
    }
    return str;
}
//匹配select的值
const getSelectFormat = (data, t) => {

    const item = data.filter(d => d.key === t)[0];
    let status;
    if (item) {
        switch (item.key) {
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
    }

    return <Badge status={status} text={item && item.label}/>;
}
/**
 * 判断是否为空
 * @param val {string} 字符串
 */
const isEmpty = val=> {
    return val === null || val === undefined || val.trim() === ''
}
export {
    request,
    composeMenus,
    fMoney,
    getQueryString,
    regRules,
    getFields,
    requestDict,
    setSelectFormat,
    getSelectFormat,
    parseJsonToParams,
    isEmpty
}