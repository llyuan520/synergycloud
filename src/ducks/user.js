// Created by liuliyuan on 2018/6/22
import {createActions,handleActions} from 'redux-actions';
import {fromJS} from 'immutable';
export const {personal,token,loggedIn,userInfoStatus} = createActions({
    PERSONAL:{
        /**增加*/
        INCREMENT:info => info,
    },
    TOKEN:{
        /**增加*/
        INCREMENT:token => token,
    },
    LOGIN_TYPE:{
        /**增加*/
        INCREMENT:type => type,
    },
    USER_INFO_STATUS:{
        /**增加*/
        INCREMENT:type => type,
    },
    LOGGED_IN:{
        /**增加*/
        LOGIN:() => true,
        /**删除*/
        LOGOUT:() => false
    }
})
const initialState = fromJS({
    /**用户个人信息*/
    personal:{
        realname:null,
        username:null,
        userId:null,
        phoneNumber:null,
        companyName: null,
        ukeyType: null,
    },
    /**登录凭证*/
    token:null,

    /**是否登录成功*/
    loggedIn:false,

    /*是否完成了个人资料*/
    userInfoStatus:false,
})

export default handleActions({
    [personal.increment]:(state,{payload})=>{
        return state.set('personal',payload)
    },
    [token.increment]:(state,{payload})=>{
        return state.set('token',payload)
    },
    [userInfoStatus.increment]:(state,{payload})=>{
        return state.set('userInfoStatus',payload)
    },
    [loggedIn.login]:(state,{payload})=>{
        return state.set('loggedIn',payload)
    },
    [loggedIn.logout]:state=>{
        return initialState
    },

},initialState)

export const changeUserInfoStatus = dispatch => async (res)=>{
    dispatch(userInfoStatus.increment(res))
}

export const logout = dispatch => async ()=>{
    //登出
    dispatch(loggedIn.logout())
}