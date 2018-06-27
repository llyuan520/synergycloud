// Created by liuliyuan on 2018/6/22
import { request } from '../utils';
import { store } from '../store';
import { loggedIn,personal,token,userInfoStatus } from '../ducks/user'
const dispatch = store.dispatch;

export function accountLogin(options) {

    return request('/login', {
        method: 'POST',
        body:{
            identifier: options.number,
            password: options.password,
        }
    })
        .then(res=>{
            if(res.state === 'ok'){
                options.success && options.success();
                dispatch(token.increment(res.token));
                dispatch(userInfoStatus.increment(false));
                //获取用户信息
                dispatch(personal.increment({ username: options.identifier }));
                dispatch(loggedIn.login())
            } else {
                return Promise.reject(res.message);
            }
        })
        .catch(err=>{
            options.fail && options.fail(err);
        })
}

export function accountRegister(options) {
    return request('/register', {
        method: 'POST',
        body:{
            number: options.number,
            password: options.password,
            confirm: options.confirm,
        }
    })
        .then(res=>{
            if(res.state === 'ok'){
                options.success && options.success();
                dispatch(token.increment(res.token));
                dispatch(userInfoStatus.increment(false));
                //获取用户信息
                dispatch(personal.increment({ username: options.number }));
            } else {
                return Promise.reject(res.message);
            }
        })
        .catch(err=>{
            options.fail && options.fail(err);
        })
}

export function logout(){
    return  dispatch(loggedIn.logout())
}