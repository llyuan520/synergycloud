// Created by liuliyuan on 2018/7/2
import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Icon,Upload} from 'antd'
export default class FileImgUpload extends Component{
    state = {
        fileList: [],
        uploading: false,
    }
    static propTypes = {
        setFieldsValue:PropTypes.func.isRequired
    }
    static defaultProps = {
        componentProps:{
            name:"avatar",
            action:'/',
            listType:"picture-card",
            className:"avatar-uploader",
            multiple:false,
        }
    }
    render(){
        const {setFieldsValue,fileList} = this.props;

        const uploadProps = {
            name: 'file',
            action: `${(window as any).baseURL}/invoice/uploadImages?id=${id}`,
            headers: {
                'Accept': 'application/json',
                authorization: authorization,
            },
            onChange: (info) => {
                if (info.file.status === 'done') {

                    if (info.file.response.code === 200) {
                        message.success(`${info.file.name} 上传成功`);
                        if ( successCallback ) {
                            successCallback();
                        }
                    } else {
                        message.error(info.file.response.msg);
                    }
                } else if (info.file.status === 'uploading') {
                    if ( uploadingCallback ) {
                        uploadingCallback();
                    }
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 上传失败:${info.file.response.msg}`);
                    if ( errorCallback ) {
                        errorCallback();
                    }
                }
            },
            showUploadList: false,
            beforeUpload: (file) => {
                let arr = ['image/jpg', 'image/png', 'image/bmp', 'image/jpeg', 'image/gif'];
                let isImage = false;
                for (let i = 0; i < arr.length; i++) {
                    if (file.type === arr[i]) {
                        isImage = true;
                        break;
                    }
                }
                if (!isImage) {
                    message.error('上传文件格式有误!');
                }
                return isImage;
            }
        };
        return(
            <Upload {...props} {...props.componentProps} >
                {
                    !(fileList && fileList.length>=1) && <Icon type="upload" style={{ fontSize: 16, color: '#08c' }} />
                }
            </Upload>
        )
    }
}