// Created by liuliyuan on 2018/6/30
/** 使用单个按钮单个文件上传 */
import * as React from 'react';
import { Button, Upload, message, Icon } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { request } from 'utils';

class UploadSingleFileWithButton extends React.Component {
    static propTypes = {
        uploadUrl: PropTypes.string.isRequired,
        buttonProps: PropTypes.object,
        onUploading: PropTypes.func,
        onError: PropTypes.func,
        onSuccess: PropTypes.func,
        onDelect: PropTypes.func,
        style: PropTypes.object
    };
    static defaultProps = {
        onUploading: null,
        onError:null,
        onSuccess: null,
        onDelete:null,
        style: {}
    };
    state = {
        uploading: false,
    };
    handleDownload = (ossKey) => () => {
        let url = `${window.baseURL}/financeApply/downloadSignedFile/${ossKey}`;
        let elemIF = document.createElement('iframe');
        elemIF.src = url;
        elemIF.style.display = 'none';
        window.document.body.appendChild(elemIF);
    }
    handleDel = (ossKey) => () => {
        request(`/batchMarkRes/delete/` + ossKey, {
            method: 'DELETE'
        })
            .then( (res) => {
                if ( res.code === 200 ) {
                    message.success('删除成功');
                    if (this.props.onDelete) {
                        this.props.onDelete();
                    }
                    return Promise.resolve();
                } else {
                    return Promise.reject(res.message);
                }

            })
            .catch( (err) => {
                console.log(err);
            });
    }
    render() {
        const { uploading } = this.state;
        const { onSuccess, onError, onUploading, buttonProps, style, ossKey } = this.props;
        const uploadProps = {
            name: 'file',
            action: this.props.uploadUrl,
            headers: {
                'Accept': 'application/json',
                'Authorization': this.props.authorization,
            },
            data: {
                batchNo: this.props.param.batchNo,
                suppOrgId: this.props.param.suppOrgId,
                templateCode: this.props.param.templateCode,
            },
            showUploadList: false,
            beforeUpload: (file) => {
                const ispdf = file.type === 'application/pdf';
                if (!ispdf) {
                    message.error('请上传PDF格式文件');
                }
                // console.log(file.type);
                return ispdf;
            },
            onChange: (info) => {
                if (info.file.status === 'uploading') {
                    console.log('uploading');
                    this.setState({
                        uploading: true
                    });
                    if (onUploading) {
                        onUploading();
                    }
                } else if (info.file.status === 'done') {
                    console.log('done');
                    this.setState({
                        uploading: false
                    });
                    console.log(info.file.response);
                    if (info.file.response.code === 200) {
                        message.success(`${info.file.name} 上传成功`);
                        this.setState({
                            ossKey: info.file.response.data.ossKey
                        });
                        if (onSuccess) {
                            onSuccess(info.file.response);
                        }
                    } else {
                        message.error(info.file.response.msg);
                    }

                } else if (info.file.status === 'error') {
                    console.log('error');
                    this.setState({
                        uploading: false
                    });
                    message.error(`${info.file.name} 上传失败:${info.file.response.msg}`);
                    if (onError) {
                        onError();
                    }
                }
            }
        };
        return (
            <span style={style}>
            { this.props.signStatus === 1 ? (
                <React.Fragment>
                    <Icon
                        type="check-circle"
                        style={{
                            color: '#52C41A',
                            marginRight: 10}}
                    />
                    已上传
                    <a style={{marginLeft: 10}} onClick={this.handleDownload(ossKey)}>下载</a>
                    <a style={{marginLeft: 10}} onClick={this.handleDel(ossKey)}>删除</a>
                </React.Fragment>
            ) : (
                <Upload {...uploadProps} disabled={uploading}>
                    <Button {...buttonProps} loading={uploading} disabled={uploading}>
                        {uploading ? '正在上传……' : '上传'}
                    </Button>
                </Upload>
            )}
            </span>
        );
    }
}
export default connect( (state) => ({
    authorization: state.user.get('token')
}))(UploadSingleFileWithButton);