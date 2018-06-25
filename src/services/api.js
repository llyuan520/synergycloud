// Created by liuliyuan on 2018/6/22
import { request } from '../utils';
import { store } from '../store';
import { loggedIn } from '../ducks/user'
const dispatch = store.dispatch;

export function accountLogin(options) {
    console.log(options);
    return request('/login', {
        method: 'POST',
        body:{
            identifier: options.identifier,
            password: options.password,
        }
    })
        .then(res=>{
            //dispatch(loggedIn.login())
            if (res.code === 200) {

            }  else {
                return Promise.reject(res.msg);
            }
        })
        .then(res=>{
            if(res.code === 200){

            } else {
                return Promise.reject(res.msg);
            }
        })
        .catch(err=>{
            options.fail && options.fail(err);
        })

    /*return request('/login', {
            method: 'POST',
            body:{
                identifier: options.identifier,
                password: options.password,
            }
            //body: `identifier=${options.identifier}&password=${options.password}`,
        })
        .then(res=>{
            console.log(res)
            debugger
            if (res.state === 'ok') {
                options.success && options.success();
                const result = res.result;
                dispatch(token.increment(result.token))
                //获取用户信息
                dispatch(personal.increment({...result,username: options.identifier}))
                dispatch(loggedIn.login())
            }  else {
                return Promise.reject(res.msg);
            }
        })
        .catch(err=>{
            console.log(err)
            debugger
            options.fail && options.fail(err);
        })*/
}
export function logout(){
    return  dispatch(loggedIn.logout())
}