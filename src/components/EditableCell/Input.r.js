// Created by liuliyuan on 2018/7/2
import React from 'react'
import { Input } from 'antd';

export default class InputCell extends React.Component {
    render() {
        const {getFieldDecorator,fieldName,initialValue,componentProps} = this.props;
        return (
            <div className="editable-cell-input-wrapper">
                {
                    getFieldDecorator(`${fieldName}`,{
                        initialValue:initialValue
                    })(

                        <Input {...componentProps} style={{width:'100%'}} />
                    )
                }
            </div>
        );
    }
}