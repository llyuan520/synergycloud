// Created by liuliyuan on 2018/7/2
import React from 'react'
import { Input } from 'antd';

export default class InputCell extends React.Component {

    render() {
        const {value,placeholder,componentProps} = this.props;

        return (

            <div className="editable-cell-input-wrapper">
                <Input
                    value={value}
                    placeholder={placeholder}
                    style={{width:'100%'}}
                    {...componentProps}
                />
            </div>
        );
    }
}