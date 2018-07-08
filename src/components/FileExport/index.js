// Created by liuliyuan on 2018/7/5
/**
 * 用法：
 *
 * const MyA = (props) => {
 *    return <a {...props}>{props.children}</a>
 * }
 * <FileExport url={url} size='small' title='下载' WrapComponent={MyA} />
 */

import React,{Component} from 'react';
import PropTypes from 'prop-types'
import {Button,Icon} from 'antd';
import {parseJsonToParams,request} from "utils";
export default class FileExport extends Component{

    static propTypes={
        setButtonStyle:PropTypes.object,
        url:PropTypes.string.isRequired,
        title:PropTypes.string.isRequired,
        params:PropTypes.object,
        WrapComponent:PropTypes.any,
        disabled:PropTypes.bool,
    }

    static defaultProps={
        setButtonStyle:{
        },
        //size:'small',
        WrapComponent:Button
    }

    handleDownload=()=>{
        const {params={},url} = this.props;
        let nextUrl =`${window.baseURL}${url}?${parseJsonToParams({...params,Authorization:request.getToken(),_t: Date.parse(new Date())/1000,})}`;
        let elemIF = document.createElement("iframe");
        elemIF.src = nextUrl;
        elemIF.style.display = "none";
        window.document.body.appendChild(elemIF);
        //window.open(url);
    }

    render(){
        const {setButtonStyle,size,title,disabled,WrapComponent} = this.props;
        return(
            <WrapComponent size={size} style={{...setButtonStyle}} disabled={disabled} onClick={this.handleDownload.bind(this)}>
                <Icon type="download" />{title}
            </WrapComponent>
        )
    }
}