// Created by liuliyuan on 2018/6/22
import { notification } from 'antd';
import { store } from '../store';
import { logout } from '../services/api'

const parseJsonToParams = data=>{
    let str = '';
    for(let key in data){
        if(typeof data[key] !== 'undefined' && data[key] !== ''){
            str += `${key}=${data[key]}&`
        }
    }
    return str;
}

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const errortext = codeMessage[response.status] || response.statusText;

    //TODO 401的时候不提示，这里后面需要优化
    if (parseInt(response.status, 0) !== 401){
        notification.error({
            message: `请求错误 ${response.status}: ${response.url}`,
            description: errortext,
        });
    }

    const error = new Error(errortext);
    error.name = response.status;
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
    const defaultOptions = {
        //credentials: 'include',
        method:'GET',
        cache: 'no-cache',
        headers:{
            Authorization:store.getState().user.get('token')
        }
    };
    const newOptions = { ...defaultOptions, ...options };

    if((newOptions.method === 'GET' || newOptions.method === 'DELETE') && newOptions.params){
        let dataUrl = '';
        for (let item in newOptions.params)  {
            if (newOptions.params.hasOwnProperty(item) && typeof newOptions.params[item] !== 'undefined')  {
                dataUrl += ('&' + item + '=' + newOptions.params[item]);
            }
        }
        url += `?${dataUrl.substring(1)}&t=${Date.now()}`;
    } else if(newOptions.method === 'GET' || newOptions.method === 'DELETE') {
        url += `?t=${Date.now()}`;
    }

    if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
        debugger
        if (!(newOptions.body instanceof FormData)) {
            newOptions.headers = {
                Accept: 'application/json',
                //mode: "no-cors",
                //'Content-Type': 'application/json; charset=utf-8',
                'Content-Type':'application/x-www-form-urlencoded',
                ...newOptions.headers,
            };

            console.log(parseJsonToParams(newOptions.body));
            debugger
            // newOptions.body = JSON.stringify(newOptions.body);
            newOptions.body = parseJsonToParams(newOptions.body);

        } else {
            // newOptions.body is FormData
            newOptions.headers = {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                ...newOptions.headers,
            };
        }
    }

    return fetch(`${window.baseURL}${url}`, newOptions)
        .then(checkStatus)
        .then(response => {
            /*if (newOptions.method === 'DELETE' || response.status === 204) {
             return response.text();
             }*/
            if (response.status === 204) {
                return response.text();
            }
            return response.json();
        })
        .catch(e => {
            const status = e.name;
            if (status === 401) {
                logout();
                return;
            }
            if (status === 403) {
                // dispatch(routerRedux.push('/exception/403'));
                return;
            }
            if (status <= 504 && status >= 500) {
                // dispatch(routerRedux.push('/exception/500'));
                return;
            }
            if (status >= 404 && status < 422) {
                // dispatch(routerRedux.push('/exception/404'));
            }
        });
    /*.then(response => {
     /!**
     * 这一步是因为后台接口在服务器炸了的时候返回的格式会没有code字段
     * 为了优化提示，在找不到code字段的时候自己构建一个response信息
     *!/
     if (typeof response.code === 'undefined') {
     return Promise.resolve({
     code: -99999,
     msg: '系统异常，请稍后再试'
     });
     } else {
     return response;
     }
     });*/
}